/**
 * Create Time 2017/04/12
 * Write Name Spicely
 * Email Spicely@outlook.com
 */
import config from '../config'
import lang from '../base/lang'

export default (function () {
    // let type = ['sine', 'square', 'sawtooth', 'triangle', 'custom']
    let playMode = ['list', 'single', 'random']
    class Ongaku {
        constructor (params = {}) {
            if (!lang.isObject(params)) throw new Error('params type not Object')

            // 初始化对象
            try {
                this.ongaku = new (window.AudioContext || window.webkitAudioContext)()

                // 控制音调
                this.oscillatorNode = this.ongaku.createOscillator()

                // 控制音频音量
                this.gainNode = this.ongaku.createGain()

                // 建立一个分析器
                this.analyserNode = this.ongaku.createAnalyser()

                // 创建音频播放器
                this.audio = new Audio()
                this.sources = []
                this.playNumer = 0
                this.playKey = ''
                this.playConf = Object.create(Object.prototype, {
                    playNumer: {
                        get: () => {
                            return this.playNumer
                        },
                        set: (val) => {
                            this.pause()
                            val = val < 0 ? 0 : val >= this.sources.length ? this.sources.length - 1 : val
                            this.playNumer = val
                            this.setPlayTime(0)
                            this.audio.src = this.playKey ? this.sources[this.playConf.playNumer][this.playKey] : this.sources[this.playConf.playNumer]
                            this.audio.onerror = function () {
                                throw new Error('File not found')
                            }
                            this.play()
                        }
                    }
                })

                // 提供播放时回调函数
                this.playCallBack = () => {}

                // 暂停播放的回调
                this.pauseCallBack = () => {}

                // 监听播放完成事件
                this.audio.addEventListener('ended', () => {
                    this.ended()
                }, false)

                // 监听错误事件
                this.audio.addEventListener('error', () => {
                    throw new Error('File not found')
                }, false)

                // 初始化一些限制
                this.autoNext = params.autoNext || true
                this.playMode = 'list'
            } catch (err) {
                throw new Error('!Your browser does not support Web Audio API!')
            }
        }

        // 设置资源路径 Array || String
        setSources (arr, key) {
            if (!lang.isArray(arr)) return
            this.sources = arr
            this.playKey = key
            this.audio.src = key ? this.sources[this.playConf.playNumer][key] : this.sources[this.playConf.playNumer]
            this.getElementSources(this.audio)
        }

        // 获得来自audio节点的文件
        getElementSources (element) {
            if (!lang.isElement(element)) {
                throw new Error('type not is Elememt')
            }
            this.sourceNode = new Promise((resolve, reject) => {
                if (this.elementSource) return
                this.elementSource = this.ongaku.createMediaElementSource(element)
                // 连接音频控制
                this.elementSource.connect(this.gainNode)
                // 连接到设备上
                this.gainNode.connect(this.ongaku.destination)
                resolve()
            })
        }

        // 获得来自本地文件
        // getLocalSources (file) {
        //   if (!lang.isFile(file)) {
        //     throw new Error('file not is fileObject')
        //   }
        //   this.bufferNode = this.ongaku.createBufferSource()
        //   let fr = new FileReader()
        //   this.sourceNode = new Promise((resolve, reject) => {
        //     fr.onload = (e) => {
        //       // 文件读入完成，进行解码
        //       var fileResult = e.target.result
        //       this.ongaku.decodeAudioData(fileResult)
        //         .then((buffer) => {
        //           // 将解码出来的数据放入source中
        //           this.bufferNode.buffer = buffer
        //           resolve()
        //         })
        //         .catch(() => {
        //           reject('!Fail to decode the file!')
        //         })
        //     }
        //     fr.onerror = () => {
        //       // 文件读入出错
        //       reject('!Fail to read the file')
        //     }
        //   })
        //   fr.readAsArrayBuffer(file)
        // }
        // // 获得来自服务器文件
        // getXhrSource (url, options = {}) {
        //   if (!lang.isString(url)) {
        //     throw new Error('url type not is String')
        //   }
        //   if (!lang.isObject(options)) {
        //     throw new Error('options type not is Object')
        //   }
        //   this.bufferNode = this.ongaku.createBufferSource()
        //   options.responseType = !options.responseType ? 'arraybuffer' : options.responseType
        //   this.sourceNode = new Promise((resolve, reject) => {
        //     xhr(url, options).then((request) => {
        //         // 数据缓冲完成之后，进行解码
        //       this.ongaku.decodeAudioData(request)
        //           .then((buffer) => {
        //             // 将解码出来的数据放入buffer中
        //             this.bufferNode.buffer = buffer

        //             this.bufferNode.connect(this.ongaku.destination)
        //             resolve()
        //           })
        //           .catch(() => {
        //             reject('!Fail to decode the file!')
        //           })
        //     })
        //       .catch((err) => {
        //         reject(err)
        //       })
        //   })
        // }
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
            this.sourceNode.then(() => {
                this.audio.play()
                lang.isFunction(this.playCallBack) && this.playCallBack()
            })
        }

        // 暂停
        pause () {
            this.sourceNode.then(() => {
                this.audio.pause()
                lang.isFunction(this.pauseCallBack) && this.pauseCallBack()
            })
        }

        // 下一曲
        next () {
            if (this.playMode === 'random') {
                this.playConf.playNumer = Math.round(Math.random() * this.sources.length)
                return
            }
            this.playConf.playNumer++
        }

        // 上一曲
        prev () {
            if (this.playMode === 'random') {
                this.playConf.playNumer = Math.round(Math.random() * this.sources.length)
                return
            }
            this.playConf.playNumer--
        }

        // 设置音调
        setOscillator (params) {}

        // 获得播放时间
        getPlayTime () {
            return this.audio.currentTime
        }

        // 获得当前音乐总时长
        getOngakuTime () {
            return this.audio.duration
        }

        // 设置播放事件
        setPlayTime (value) {
            this.audio.currentTime = value
        }

        // 设置播放器音量
        setVolume (value) {
            this.gainNode.gain.value = value
        }

        // 设置播放模式
        setPlayMode (mode) {
            if (playMode.indexOf(mode) === -1) {
                throw new Error('mode not is default')
            }
            this.playMode = mode
        }

        // 播放完成后的事件
        ended () {
            if (this.autoNext) {
                if (this.playNumer < this.sources.length - 1) {
                    if (this.mode === 'single') {
                        this.playConf.playNumer = this.playConf.playNumer
                        return
                    }
                    this.next()
                }
            }
        }
    }
    lang.setObject(config.getObjectName('Media.Ongaku'), 1, Ongaku)
    return Ongaku
})()
