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
    // 深度合并
    assign: function (obj = {}, cpObj) {
        for (var key in cpObj) {
            obj[key] = typeof cpObj[key] === 'object' ? this.assign(cpObj[key]) : cpObj[key]
        }
        return obj
    },
    // 深度复制
    clone: function (obj) {
        return this.assign({}, obj)
    }
})
lang.setObject(config.getObjectName('json'), 1, json)
export default json
