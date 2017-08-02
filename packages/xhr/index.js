/**
 *  Time 2017/02/24
 *  Name Spicely
 *  Email Spicely@outlook.com
 *  Exp
 *      提供config方法用于配置在发送请求前的处理
 */
import config from '../config'
import lang from '../Base/lang'
import json from '../json'


/** globalInit
 *  @param baseUrl  前缀地址 用于和传递过的路径合并
 *  @param headers  fetch中的参数
 *  @param msg      用于显示操作类请求成功状态
 */

let globalInit = {
    baseUrl: '',
    headers: {},
    credentials: 'include', // omit same-origin include
    before: null,
    error: null,
    success: null,
    timeOut: 0,
    msg: false,
    loading: true,
    toType: '' // JSON FORM
}
let xhr = (...arg) => {
    let url = ''
    let options = {}
    let mixin = true
    if (arg.length === 1) {
        url = arg[0]
    } else if (arg.length === 2) {
        url = arg[0]
        if (lang.isObject(arg[1])) {
            options = arg[1]
        } else {
            mixin = arg[1]
        }
    } else if (arg.length === 3) {
        url = arg[0]
        options = arg[1]
        mixin = arg[2]
    }
    if (!url) throw new Error('No request path is set')
    if (!lang.isObject(options)) throw new Error('Arguments can only be Object')

    let reqAddress = mixin ? globalInit.baseUrl + url : url

    let init = mixin ? Object.assign(json.clone(globalInit), options) : options
    if (init.timeOut && !lang.isNumber(init.timeOut)) throw new Error('timeOut type Error is Number')
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
    lang.isFunction(init.before) && init.before(init.loading)
    init.body = xhr.toType(init.body, init.toType)
    let fetchPromise = new Promise((resolve, reject) => {
        let _fetch = fetch(reqAddress, init)
        let promises = [_fetch]
        // 超时设置
        if (init.timeOut) {
            promises.push(new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(new Error('timeout'))
                }, init.timeOut)
            }))
        }
        Promise.race(promises).then(data => lang.isFunction(init.success) ? init.success.call(this, data, reject, init.msg) : data)
            .then(data => resolve(data))
            .catch(error => {
                lang.isFunction(init.error) && init.error(error)
            })
    })

    return fetchPromise
}
xhr.config = function (options) {
    if (options) {
        Object.assign(globalInit, options)
        return globalInit
    } else {
        return globalInit
    }
}
xhr.toType = function (data, type = '') {
    if (!lang.isObject(data)) return data
    if (!type) return data
    try {
        if (type.toLocaleUpperCase() === 'JSON') {
            return JSON.stringify(data)
        } else if (type.toLocaleUpperCase() === 'FORM') {
            let str = ''
            for (let i in data) {
                str += i + '=' + data[i] + '&'
            }
            return str.substring(0, str.length - 1)
        }
    } catch (e) {
        return data
    }
}
lang.setObject(config.getObjectName('xhr'), 1, xhr)
export default xhr
