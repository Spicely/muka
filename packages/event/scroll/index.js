import lang from '../../base/lang'
import query from '../../dom/query'
import config from '../../config'

const _eventCompat = function (event) {
    let type = event.type;
    if (type == 'DOMMouseScroll' || type == 'mousewheel') {
        event.delta = (event.wheelDelta) ? event.wheelDelta / 120 : -(event.detail || 0) / 3;
    }
    if (event.srcElement && !event.target) {
        event.target = event.srcElement
    }
    if (!event.preventDefault && event.returnValue !== undefined) {
        event.preventDefault = function () {
            event.returnValue = false
        }
    }
    return event
};
const addEvent = (function (window, undefined) {
    if (window.addEventListener) {
        return function (el, type, fn, capture) {
            if (type === 'mousewheel' && document.mozFullScreen !== undefined) {
                type = 'DOMMouseScroll'
            }
            el.addEventListener(type, function (event) {
                fn.call(this, _eventCompat(event))
            }, capture || false)
        }
    } else if (window.attachEvent) {
        return function (el, type, fn, capture) {
            el.attachEvent('on' + type, function (event) {
                event = event || window.event
                fn.call(el, _eventCompat(event))
            })
        }
    }
    return function () {}
})(window)
let mScroll = function (el, callback, capture) {
    el = query(el)[0]
    addEvent(el, 'mousewheel', callback, capture)
}

lang.setObject(config.getObjectName('event.mScroll'), 1, mScroll)
export default mScroll
