'use strict'
/**
 * Create Time 2017/04/12
 * Write Name Spicely
 * Email Spicely@outlook.com
 */
import config from '../config'
import lang from '../base/lang'
import xhr from '../xhr'
class Ongaku {
  constructor () {
    // 初始化对象
    try {
      this.ongaku = new (window.AudioContext || window.webkitAudioContext)()
    } catch (err) {
      throw new Error('!Your browser does not support Web Audio API!')
    }
  }
  initAnalyser (MediaElement) {
    let media = MediaElement || new Audio()
    this.audio = this.ongaku.createMediaElementSource(media)
  }
  // 加载本地文件
  getLocalSouces (file) {
    if (!lang.isFile(file)) {
      throw new Error('file not is fileObject')
    }
    if (!this.audio) {
      this.audio = this.ongaku.createBufferSource()
    }
    let fr = new FileReader()
    this.souces = new Promise((resolve, reject) => {
      fr.onload = (e) => {
        // 文件读入完成，进行解码
        var fileResult = e.target.result
        this.ongaku.decodeAudioData(fileResult)
          .then((buffer) => {
            // 将解码出来的数据放入source中
            this.audio.buffer = buffer
            resolve()
          })
          .catch(() => {
            reject('!Fail to decode the file!')
          })
      }
      fr.onerror = () => {
        // 文件读入出错
        reject('!Fail to read the file')
      }
    })
    fr.readAsArrayBuffer(file)
  }
  // 请求文件
  getXhrSouces (url, options = {}) {
    if (!lang.isString(url)) {
      throw new Error('url type not is String')
    }
    if (!lang.isObject(options)) {
      throw new Error('options type not is Object')
    }
    if (!this.audio) {
      this.audio = this.ongaku.createBufferSource()
    }
    options.responseType = !options.responseType ? 'arraybuffer' : options.responseType
    this.souces = new Promise((resolve, reject) => {
      xhr(url, options).then((request) => {
        var audioData = request.xhr.response
          // 数据缓冲完成之后，进行解码
        this.ongaku.decodeAudioData(audioData)
            .then((buffer) => {
              // 将解码出来的数据放入source中
              this.audio.buffer = buffer
              resolve()
            })
            .catch(() => {
              reject('!Fail to decode the file!')
            })
      })
        .catch((err) => {
          reject(err)
        })
    })
  }
  // 播放
  play () {
    // 检查是否创建了音源
    if (!this.audio) {
      this.audio = this.ongaku.createBufferSource()
    }
    // 检查是否已经建立连接
    if (this.analyser) {
      // 创建分析节点
      this.analyser = this.ongaku.createAnalyser()
      // 将音源和分析节点连接在一起
      this.audio.connect(this.analyser)
      // 将分析节点和输出连接在一起
      this.analyser.connect(this.ongaku.destination)
    }
    this.souces.then(() => {
      this.audio.start()
    })
  }
}
lang.setObject(config.getObjectName('Media.Ongaku'), 1, Ongaku)
export default Ongaku
