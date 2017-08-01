/**
 * Create Time 2017/03/29
 * Write Name Spicely
 * Email Spicely@outlook.com
 */
import config from '../../config'
import lang from '../../base/lang'
let query = (selector, context) => {
    if (context) {
        // 必须是节点 而且长度为undefined
        if (lang.isElement(context) && lang.isNotDef(context.length)) {
            return context.querySelectorAll(selector)
        } else {
            throw new Error('query', 'context not is Element')
        }
    } else {
        if (lang.isElement(selector)) {
            if (selector.length) {
                return selector
            } else {
                return [selector]
            }
        } else {
            if (lang.isString(selector)) {
                return lang.toArray(config.basic.querySelectorAll(selector))
            } else {
                return []
            }
        }
    }
}
// query.only = (selector, context) => {
//     if (context) {
//         // 必须是节点 而且长度为undefined
//         if (lang.isElement(context) && lang.isNotDef(context.length)) {
//             return context.querySelector(selector);
//         } else {
//             throw new Error('query', 'context not is Element');
//         }
//     } else {
//         return lang.isElement(selector) ? selector : config.basic.querySelector(selector);
//     }
// };
lang.setObject(config.getObjectName('dom.query'), 1, query)
export default query