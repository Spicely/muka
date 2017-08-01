/**
 * 鼠标拖拽事件
 */

import lang from '../../base/lang'
import config from '../../config'
import browser from '../../browser'

let init = {
    X: 0,
    Y: 0, // 开始位置
    _x: 0,
    _y: 0, // 鼠标初始位置
    toX: 0,
    toY: 0, // 到达位置
    moveX: 0,
    moveY: 0, // 移动距离
    moveStatus: false,
    status: true,
    dir_x: 0, // -1 左 0 未移动 1 右
    dir_y: 0, // -1 上 0 未移动 1 下
    handleMove: () => {},
    handleEnd: () => {}
}

let event
if (browser.isMobile) {
    event = ['touchmove', 'touchend']
} else {
    event = ['mousemove', 'mouseup']
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
    e.target.addEventListener(event[0], move, {
        passive: false
    })
    e.target.addEventListener(event[1], end, {
        passive: false
    })
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
    init.moveX = Math.abs(x - init._x)
    init.moveY = Math.abs(y - init._y)
    if (init._x > x) {
        init.dir_x = -1
    } else if (init._x < x) {
        init.dir_x = 1
    } else {
        init.dir_x = 0
    }
    if (init._y > y) {
        init.dir_y = -1
    } else if (init._y < y) {
        init.dir_y = 1
    } else {
        init.dir_y = 0
    }
    lang.isFunction(init.handleMove) && init.handleMove(_x, _y, {
        x: init.dir_x,
        y: init.dir_y,
        target: e
    })
    e.preventDefault()
}

function end(e) {
    init.status = false
    lang.isFunction(init.handleMove) && init.handleEnd(init.moveStatus ? init.toX : init.X, init.moveStatus ? init.toY : init.Y, {
        x: init.dir_x,
        y: init.dir_y,
        moveX: init.moveX,
        moveY: init.moveY,
        time: init.time,
        target: e
    })
    window.removeEventListener(event[0], move, {
        passive: false
    })
    window.removeEventListener(event[1], end, {
        passive: false
    })
}
lang.setObject(config.getObjectName('event.drag'), 1, drag)
export default drag
