/**
 *  Time 2017/02/24
 *  Name Spicely
 *  Email Spicely@outlook.com
 *  Exp
 *      提供config方法用于配置在发送请求前的处理
 */
import config from './config'
import lang from './Base/lang'
const json = lang.create({
  clone: function (obj) {
    if (!lang.isObject(obj)) throw new Error('Only Object')
    return Object.assign({}, obj)
  }
})
lang.setObject(config.getObjectName('json'), 1, json)
export default json
