/**
 * 鼠标拖拽事件
 */

import lang from '../Base/lang'

let init = {
    X: 0,
    Y: 0,
    _x: 0,
    _y: 0,
    handleMove: () => {},
    handleEnd: () => {}
}

function mouseDrag(e, optins = {}) {
    e = e.originalEvent || e
    if (!lang.isElement(e.target)) {
        throw new Error('type not is Element')
    }
    Object.assign(init, optins)
    // 保留初始值
    init._x = e.screenX
    init._y = e.screenY
    console.log(init)
    // 监听移动、释放事件
    window.addEventListener('mousemove', move, false)
    window.addEventListener('mouseup', end, false)
}

function move(e) {
    e = e.originalEvent || e
    let x = e.screenX
    let y = e.screenY
    let _x = init.X + (x - init._x)
    let _y = init.Y + (y - init._y)
    console.log(_x, _y)
    lang.isFunction(init.handleMove) && init.handleMove(_x, _y)
}

function end(e) {
    e = e.originalEvent || e
    let x = e.screenX
    let y = e.screenY
    let _x = init.X + (x - init._x)
    let _y = init.Y + (y - init._y)
    lang.isFunction(init.handleMove) && init.handleEnd(_x, _y)
    window.removeEventListener('mousemove', move, false)
    window.removeEventListener('mouseup', end, false)
}

export default mouseDrag