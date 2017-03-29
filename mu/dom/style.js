'use strict';
/**
 * Create Time 2017/03/29
 * Write Name Spicely
 * Email Spicely@outlook.com
 */
import config from '../config';
import lang from '../base/lang';
import query from './query';
import domAttr from './attr';

let exception = ['width', 'height', 'max-width', 'min-width', 'max-height', 'min-height', 'line-height', 'top', 'left', 'right', 'bottom'];
let domStyle = lang.create({
    set(node, name, vale) {
        query(node).map((item) => {
            if (lang.isObject(name)) {
                domAttr.set(item, {
                    style: name
                });
            } else {
                item.style[name] = lang.isNumber(value) && exception.indexOf(name) !== -1 ? value + 'px' : value;
            }
            return item;
        });
    },
    get(node, name) {
        let values = query(node).map((item) => {
            let value = config.global.getComputedStyle(item)[name] || node[name];
            return lang.isNumber(value) ? value : value.indexOf('px') === -1 ? value : parseInt(value);
        });
        return lang.isElement(node) ? values[0] : values;
    },
});
lang.setObject(config.getObjectName('dom.style'), 1, domStyle);
export default domStyle;