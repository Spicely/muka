/**
 * 鼠标拖拽事件
 */

import lang from '../Base/lang'
import config from '../config'
import browser from '../browser'

let init = {
    X: 0,
    Y: 0,
    _x: 0,
    _y: 0,
    toX: 0,
    toY: 0,
    time: 0,
    moveStatus: false,
    status: true,
    handleMove: () => {},
    handleEnd: () => {}
}

let event
if (browser.isMobile) {
    event = ['touchmove', 'touchend']
} else {
    event = ['mousemove', 'mouseup']
}

function animate() {
    if (init.status) {
        init.time++
            requestAnimationFrame(animate)
    }
}

function drag(e, optins = {}) {
    e = e.originalEvent || e
    if (!lang.isElement(e.target)) {
        throw new Error('type not is Element')
    }
    Object.assign(init, optins)
    init.time = 0
    init.status = true
    init.moveStatus = false
    // 保留初始值
    init._x = e.screenX || (e.targetTouches ? e.targetTouches[0].screenX : 0)
    init._y = e.screenY || (e.targetTouches ? e.targetTouches[0].screenY : 0)
    // 监听移动、释放事件11
    window.addEventListener(event[0], move, {
        passive: false
    })
    window.addEventListener(event[1], end, {
        passive: false
    })
    // 开始计时
    animate()
}

function move(e) {
    init.moveStatus = true
    e = e.originalEvent || e
    let x = e.screenX || (e.targetTouches ? e.targetTouches[0].screenX : 0)
    let y = e.screenY || (e.targetTouches ? e.targetTouches[0].screenY : 0)
    let _x = init.X + (x - init._x)
    let _y = init.Y + (y - init._y)
    init.toX = _x
    init.toY = _y
    lang.isFunction(init.handleMove) && init.handleMove(_x, _y)
    e.preventDefault()
}

function end() {
    init.status = false
    cancelAnimationFrame(animate)
    lang.isFunction(init.handleMove) && init.handleEnd(init.moveStatus ? init.toX : init.X, init.moveStatus ? init.toY : init.Y, init.time)
    window.removeEventListener(event[0], move, {
        passive: false
    })
    window.removeEventListener(event[1], end, {
        passive: false
    })
}
lang.setObject(config.getObjectName('event.drag'), 1, drag)
export default drag
