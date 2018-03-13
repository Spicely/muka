interface BAudioConfig {
    canvasCtx?: HTMLCanvasElement,
    autoNext?: boolean
}
export default class WebAudio {
    protected audio: HTMLAudioElement = new Audio()
    protected webAudio = new AudioContext()
    protected urls: string[]
    protected playIndex: number = 0
    protected status: 'loading' | 'success' | 'play' | 'pause' = 'loading'
    protected source: MediaElementAudioSourceNode
    protected volume: number = 0.5
    // protected config: BAudioConfig
    // 事件监听存放
    protected handles = {}
    readonly analyser: AnalyserNode = this.webAudio.createAnalyser()
    public ended: Promise<boolean> = new Promise((resolve, reject) => { return resolve(true) })
    private autoNext: boolean = true
    constructor(url: string[]) {
        // 初始化
        this.urls = url
        this.audio.volume = this.volume
        this.setPlayIndex(this.playIndex)
        this.creatConnet()
        // 监听播放完成
        this.audio.addEventListener('ended', () => {
            this.emit('playStatus', 'success')
            if (this.autoNext) {
                this.ended.then(() => {
                    this.next()
                })
            }
        })
    }
    public draw = (): void => {
        // console.log(1)
    }
    readonly setCurrentTime = (time: number, mode: 'second' | 'percent' = 'second'): void => {
        if (mode === 'percent') {
            let duration = this.audio.duration
            let currentTime = duration * time / 100
            this.audio.currentTime = currentTime
            return
        }
        this.audio.currentTime = time
    }
    readonly getPlayIndex = (cb: (index: number) => void): void => {
        this.on('playIndex', (index: number) => {
            cb(index)
        })
    }
    readonly prev = (): void => {
        this.pause()
        this.setPlayIndex(--this.playIndex)
        this.play()
    }
    readonly play = (): void => {
        this.emit('playStatus', 'play')
        this.emit('playIndex', this.playIndex)
        this.audio.play()
    }
    readonly getStatus = (cb: (val: string) => void) => {
        this.on('playStatus', (value: string) => {
            cb(value)
        })
    }
    readonly getProgress = (cb: (val: number) => void) => {
        this.getPlayDuration((params: { value: number }, value) => {
            let time = params.value
            this.getPlayCurrentTime((params: { value: number }, value) => {
                cb(params.value / time * 100)
            })
        })
    }
    readonly pause = (): void => {
        this.emit('playStatus', 'pause')
        this.audio.pause()
    }
    readonly next = (): void => {
        if (this.playIndex === this.urls.length - 1) return
        this.pause()
        this.setPlayIndex(++this.playIndex)
        this.play()
    }
    protected creatConnet(): void {
        this.audio.crossOrigin = 'anonymous'
        this.source = this.webAudio.createMediaElementSource(this.audio)
        this.source.connect(this.analyser)
        this.analyser.connect(this.webAudio.destination)
    }
    readonly setVolume = (value: number = this.volume): void => {
        if (value < 0) {
            throw new Error('The value must be greater than 0')
        } else if (value > 1) {
            throw new Error('The value must be less than 1')
        }
        this.volume = value
        this.audio.volume = this.volume
    }
    // 获得当前播放时间
    readonly getPlayCurrentTime = (cb: (params: object, time: string) => void): void => {
        this.audio.addEventListener('timeupdate', () => {
            let objTime = this.getObjTime('currentTime')
            cb({
                hour: objTime.hour,
                minute: objTime.minute,
                second: objTime.second,
                value: objTime.value
            }, objTime.time)
        })
    }
    // 获得播放总时长
    readonly getPlayDuration = (cb: (params: object, time: string) => void): void => {
        // 监听播放状态
        this.audio.addEventListener('canplay', () => {
            let objTime = this.getObjTime('duration')
            cb({
                hour: objTime.hour,
                minute: objTime.minute,
                second: objTime.second,
                value: objTime.value
            }, objTime.time)
        })
    }
    // 获得缓冲进度
    readonly getBuffer = (cb: (val: number) => void): void => {
        const THIS = this
        this.audio.addEventListener('progress', () => {
            try {
                let buffer = THIS.audio.buffered
                let timeRanges: TimeRanges = buffer
                let timeBuffered = timeRanges.end(buffer.length - 1)
                let bufferPercent = timeBuffered / this.audio.duration
                cb(bufferPercent * 100)
            } catch (e) {
                cb(100)
            }
        })
    }
    // 设置播放文件
    readonly setPlayIndex = (num: number): void => {
        if (num >= this.urls.length) {
            this.playIndex = this.urls.length - 1
        } else if (num <= 0) {
            this.playIndex = 0
        } else {
            this.playIndex = num
        }
        this.emit('playIndex', this.playIndex)
        this.audio.src = this.urls[this.playIndex]
    }
    // 获得对象时间
    readonly getObjTime = (obj: string) => {
        let time: number = this.audio[obj]
        let second: number = Math.floor(time % 60)
        let minute: number = Math.floor(time / 60)
        let hour: number = Math.floor(second / 60)
        if (hour > 0) {
            second = Math.floor(second % 60)
        }
        let hourStr = hour > 0 ? hour < 10 ? '0' + hour : hour.toString() : ''
        let timeStr: string = hourStr ? hourStr + ':' : hourStr +
            (minute > 0 ? minute < 10 ? '0' + minute : minute.toString() : '00') + ':' +
            (second > 0 ? second < 10 ? '0' + second : second.toString() : '00')
        return {
            hour: hour,
            minute: minute,
            second: second,
            time: timeStr,
            value: time
        }
    }
    // 状态事件监听
    protected on = (em: string, cb: (value: string | boolean | number | object) => void) => {
        if (!this.handles[em]) {
            this.handles[em] = []
        }
        this.handles[em].push(cb)
    }
    // 事件触发
    protected emit = (em: string, value?: string | boolean | number | object): void => {
        if (this.handles[em]) {
            this.handles[em].map((cb: (value?: string | boolean | number | object) => {}) => {
                cb(value)
            })
        }
    }
}
