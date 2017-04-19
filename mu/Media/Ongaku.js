'use strict'
/**
 * Create Time 2017/04/12
 * Write Name Spicely
 * Email Spicely@outlook.com
 */
import config from '../config'
import lang from '../base/lang'
import xhr from '../xhr'

export default (function () {
  let type = ['sine', 'square', 'sawtooth', 'triangle', 'custom']
  class Ongaku {
    constructor () {
      // 初始化对象
      try {
        this.ongaku = new (window.AudioContext || window.webkitAudioContext)()
        // 控制音调
        this.oscillatorNode = this.ongaku.createOscillator()
        // 控制音频音量
        this.gainNode = this.ongaku.createGain()
        // 建立一个分析器
        this.analyserNode = this.ongaku.createAnalyser()
        window.aaa = this
        // 初始化一些限制
      } catch (err) {
        throw new Error('!Your browser does not support Web Audio API!')
      }
    }
    // 获得来自audio节点的文件
    getElementSources (element) {
      if (!lang.isElement(element)) {
        throw new Error('type not is Elememt')
      }
      this.sourceNode = new Promise((resolve, reject) => {
        this.ongaku.createMediaElementSource(element)
        resolve()
      })
    }
    // 获得来自本地文件
    getLocalSources (file) {
      if (!lang.isFile(file)) {
        throw new Error('file not is fileObject')
      }
      this.bufferNode = this.ongaku.createBufferSource()
      let fr = new FileReader()
      this.sourceNode = new Promise((resolve, reject) => {
        fr.onload = (e) => {
          // 文件读入完成，进行解码
          var fileResult = e.target.result
          this.ongaku.decodeAudioData(fileResult)
            .then((buffer) => {
              // 将解码出来的数据放入source中
              this.bufferNode.buffer = buffer
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
    // 获得来自服务器文件
    getXhrSource (url, options = {}) {
      if (!lang.isString(url)) {
        throw new Error('url type not is String')
      }
      if (!lang.isObject(options)) {
        throw new Error('options type not is Object')
      }
      this.bufferNode = this.ongaku.createBufferSource()
      options.responseType = !options.responseType ? 'arraybuffer' : options.responseType
      this.sourceNode = new Promise((resolve, reject) => {
        xhr(url, options).then((request) => {
          // 数据缓冲完成之后，进行解码
          this.ongaku.decodeAudioData(request.response)
              .then((buffer) => {
                // 将解码出来的数据放入buffer中
                this.bufferNode.buffer = buffer
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
    // 获得来自硬件内容 如: 麦克风、视频
    // getMediaSouce () {
    //   if (navigator.mediaDevices) {
    //     navigator.mediaDevices.getUserMedia({
    //       audio: true,
    //       video: true
    //     })
    //     .then(function (stream) {
    //       video.srcObject = stream
    //       video.onloadedmetadata = function (e) {
    //         video.play()
    //         video.muted = true
    //       }

    //         // 创建MediaStreamAudioSourceNode
    //         // Feed the HTMLMediaElement into it
    //       var audioCtx = new AudioContext()
    //       var source = audioCtx.createMediaStreamSource(stream)

    //         // 创建二阶滤波器
    //       var biquadFilter = audioCtx.createBiquadFilter()
    //       biquadFilter.type = 'lowshelf'
    //       biquadFilter.frequency.value = 1000
    //       biquadFilter.gain.value = range.value

    //         // 把AudioBufferSourceNode连接到gainNode
    //         // gainNode连接到目的地, 所以我们可以播放
    //         // 音乐并用鼠标调节音量
    //       source.connect(biquadFilter)
    //       biquadFilter.connect(audioCtx.destination)

    //         // Get new mouse pointer coordinates when mouse is moved
    //         // then set new gain value

    //       range.oninput = function () {
    //           biquadFilter.gain.value = range.value
    //         }
    //     })
    //       .catch(function (err) {
    //         console.log('The following gUM error occured: ' + err)
    //       })
    //   } else {
    //     console.log('getUserMedia not supported on your browser!')
    //   }
    // }
    // 播放
    play () {
      this.bufferNode.connect(this.ongaku.destination)
      this.sourceNode.then(() => {
        this.bufferNode.start()
        return this
      })
    }
    stop () {
      this.sourceNode.then(() => {
        this.bufferNode.stop()
        return this
      })
    }
    // 设置音调
    setOscillator (params) {

    }
  }
  lang.setObject(config.getObjectName('Media.Ongaku'), 1, Ongaku)
  return Ongaku
})()
