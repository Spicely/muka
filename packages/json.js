/**
 *  Time 2017/02/24
 *  Name Spicely
 *  Email Spicely@outlook.com
 *  Exp
 *      提供config方法用于配置在发送请求前的处理
 */
import config from './config'
import lang from './base/lang'
const json = lang.create({
    // 提供简单的复制方法
    clone: function (obj) {
        if (!lang.isObject(obj)) throw new Error('Only Object')
        return Object.assign({}, obj)
    },
    // 深度合并
    assign: function (obj, cpObj) {
        let key
        for (key in cpObj) {
            obj[key] = obj[key] && obj[key].toString() === "[object Object]" ?
                this.assign(obj[key], cpObj[key]) : obj[key] = cpObj[key]
        }
        return obj
    }
})
lang.setObject(config.getObjectName('json'), 1, json)
export default json
