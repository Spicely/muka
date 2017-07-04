/**
 *  Time 2017/02/24
 *  Name Spicely
 *  Email Spicely@outlook.com
 *  Exp
 *      提供config方法用于配置在发送请求前的处理
 */
import config from './config'
import lang from './Base/lang'
import json from './json'

let globalInit = {
    baseUrl: '',
    headers: {},
    credentials: 'include',
    error: () => {}
}
let xhr = function (url, options = {}) {
    if (!url) throw new Error('No request path is set')
    if (!lang.isObject(options)) throw new Error('Arguments can only be object')
    let reqAddress = globalInit.baseUrl + url
    let init = Object.assign(json.clone(globalInit), options)
    // // 如果使用POST传递数据这里把数据转成FormData
    // if (options.body && !lang.isFormData(options.body) && lang.isObject(options.body)) {
    //   let formData = new FormData()
    //   for (let i in options.body) {
    //     formData.append(i, options.body[i])
    //   }
    //   options.body = formData
    //   options.method = 'POST'
    //   // 设置请求头 默认不上传文件内容
    //   if (options.type === 'file') {
    //     options.headers = {
    //       'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundaryZpsWTsOiRHI0TBW7'
    //     }
    //   } else {
    //     options.headers = {
    //       'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    //   }
    // }
    return fetch(reqAddress, init).catch(_ => {
        lang.isFunction(init.error) && init.error()
    })
}
xhr.config = function (options) {
    if (options) {
        Object.assign(globalInit, options)
        return globalInit
    } else {
        return globalInit
    }
}
lang.setObject(config.getObjectName('xhr'), 1, xhr)
export default xhr