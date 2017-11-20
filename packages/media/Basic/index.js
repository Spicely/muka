import lang from 'muka/Base/lang'
// 初始化参数
let init = {
    nodeType: 'video'
}
export default class MediaBasic {
    constructor (params = {}) {
        Object.assign(init, params)
        this.media = document.createElement(init.nodeType)
    }
    setUrl (url) {
        this.media.src = url
    }

    // 播放
    play () {
        this.media.play()
    }

    // 暂停
    pause () {
        this.media.pause()
    }

    // 追加到指定位置
    place (element, pos) {
        if (!lang.isElement(element)) throw new Error('element not is Element')
        element.appendChild(this.media)
    }

    // 设置音量
    setValue (value) {
        this.media.value = value
    }
}
