/**
 *  Time 2017/02/24
 *  Name Spicely
 *  Email Spicely@outlook.com
 *  Exp
 *      提供config方法用于配置在发送请求前的处理
 */
import config from './config'
import lang from './base/lang'
import json from './json'


/** globalInit
 *  @param baseUrl [String] 前缀地址 用于和传递过的路径合并
 *  @param headers [Object] fetch中的参数
 *  @param msg     [Boolean]   用于显示操作类请求成功状态
 *  @param data    [Function] 用于在请求前重新获取参数并合并到请求参数中
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
    data: () => {
        return {}
    },
    body: {},
    charset: 'charset=utf-8',
    dataType: '' // JSON FORM
    // mode : 'cors'
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
            options = json.clone(arg[1])
        } else {
            mixin = arg[1]
        }
    } else if (arg.length === 3) {
        url = arg[0]
        options = json.clone(arg[1])
        mixin = arg[2]
    }
    if (!url) throw new Error('No request path is set')
    if (!lang.isObject(options)) throw new Error('Arguments can only be Object')

    let reqAddress = mixin ? globalInit.baseUrl + url : url
    let init = mixin ? json.assign(json.clone(globalInit), options) : options
    // 获得data中的数据并合并
    if (lang.isObject(init.body)) {
        json.assign(init.body, lang.isFunction(init.data) ? init.data() : {})
    }

    if (init.timeOut && !lang.isNumber(init.timeOut)) throw new Error('timeOut type Error is Number')
    lang.isFunction(init.before) && init.before(init.loading)
    init.body = init.dataType ? xhr.toType(init.body, init.dataType) : init.body
    // 增加发送头
    if (init.dataType && (init.dataType.toLocaleUpperCase() === 'FORMDATA' || init.dataType.toLocaleUpperCase() === 'FORM')) {
        init.headers ?
            !init.headers['Content-Type'] ? init.headers['Content-Type'] = 'application/x-www-form-urlencoded;' + init.charset || '' :
            init.headers['Content-Type'] :
            init.headers = {
                'Content-Type': 'application/x-www-form-urlencoded;' + init.charset || ''
            }
    }
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
    }).catch((error) => {
        lang.isFunction(init.error) && init.error(error)
    })

    return fetchPromise
}
xhr.config = function (options) {
    if (options) {
        json.assign(globalInit, options)
        return globalInit
    } else {
        return globalInit
    }
}

// 深度设置键值
const setForm = function (str = '', value, k) {
    for (let key in value) {
        if (lang.isObject(value[key]) || lang.isArray(value[key])) {
            str += setForm(str, value[key], key + '[' + encodeURIComponent(value[key]) + ']')
        } else {
            str += k + '[' + key + ']' + '=' + encodeURIComponent(value[key]) + '&'
        }
    }
    return str
}

xhr.toType = function (data, type = '', encode = true) {
    if (!lang.isObject(data)) return data
    if (!type) return data
    try {
        if (type.toLocaleUpperCase() === 'JSON') {
            return JSON.stringify(data)
        } else if (type.toLocaleUpperCase() === 'FORM') {
            let str = ''
            for (let i in data) {
                if (lang.isObject(data[i])) {
                    for (let e in data[i]) {
                        str += i + '[' + e + ']' + '=' + (encode ? encodeURIComponent(data[i][e]) : data[i][e]) + '&'
                    }
                } else {
                    str += i + '=' + (encode ? encodeURIComponent(data[i]) : data[i]) + '&'
                }
            }
            return str.substring(0, str.length - 1)
        } else if (type.toLocaleUpperCase() === 'FORMDATA') {
            let formData = new FormData()
            for (let i in data) {
                formData.append(i, data[i])
            }
            return formData
        }
    } catch (e) {
        return data
    }
}
lang.setObject(config.getObjectName('xhr'), 1, xhr)
export default xhr
