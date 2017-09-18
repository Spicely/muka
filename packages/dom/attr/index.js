/**
 * Create Time 2017/03/29
 * Write Name Spicely
 * Email Spicely@outlook.com
 */
import config from '../../config';
import lang from '../../base/lang';
import query from '../query';
let alias = lang.create({
    classname: 'class'
});
let exception = ['width', 'height', 'max-width', 'min-width', 'max-height', 'min-height', 'line-height'];
let domAttr = lang.create({
    set(node, name, value = '') {
        let getVal = (key, value) => {
            return exception.indexOf(key) !== -1 ? lang.isNumber(value) ? value + 'px' : value : value;
        };
        query(node).map((item) => {
            if (lang.isObject(name)) {
                for (let e in name) {
                    if (e === 'style') {
                        for (let i in name[e]) item.style[i] = getVal(i, name[e][i]);
                    } else if (e === 'innerHTML') {
                        item[e] = name[e];
                    } else {
                        item.setAttribute(alias[e.toLowerCase()] || e, getVal(e, name[e]));
                    }
                }
            } else {
                item.setAttribute(alias[name.toLowerCase()] || name, getVal(name, value));
            }
            return item;
        });
    },
    get(node, name) {
        return query(node).map((item) => {
            return item.getAttribute(alias[name.toLowerCase()] || name) || '';
        })
    },
    remove(node, name) {
        query(node).removeAttribute(alias[name.toLowerCase()] || name);
    },
    has(node, name) {
        return query(node).hasAtteribute(alias[name.toLowerCase()] || name);
    }
});
lang.setObject(config.getObjectName('dom.attr'), 1, domAttr);
export default domAttr;
