'use strict'
/**
 *  Time 2017/02/24
 *  Name Spicely
 *  email Spicely@outlook.com
 *  exp
 *      提供自动判断是为否跨域请求处理
 */
import config from './config'
import lang from './base/lang'
export default (function() {
    // 设置请求方式
    let deploy = {
            method: ['GET', 'POST'],
            responseType: ['text', 'arraybuffer', 'blob', 'document'],
            mark: '&'
        }
        // 重新排列数据
    function encodeFormData(data) {
        if (!data) return ''
        let pairs = []
        for (let name in data) {
            if (!data.hasOwnProperty(name)) continue
            if (typeof data[name] === 'function') continue
            let value = data[name].toString()
            name = encodeURIComponent(name.replace('%20', '+'))
            value = encodeURIComponent(value.replace('%20', '+'))
            pairs.push(name + '=' + value)
        }
        return pairs.join(deploy.mark)
    }
    // 获得重新排列过的uri
    function setUri(uri, data, type) {
        if (type === deploy.method[0]) {
            let str = encodeFormData(data)
            return str ? uri + '?' + str : uri
        } else {
            return uri
        }
    }

    // 获得转译过后的数据
    function getData(data, type) {
        if (type) {
            type = type.toLocaleUpperCase()
        } else {
            type = 'JSON'
        }
        try {
            switch (type) {
                case 'JSON':
                    return JSON.parse(data.response)
                case 'STRING':
                    return data.responseText
            }
        } catch (e) {
            return data.response
        }
    }
    let xhr = function(uri, options = {}) {
        if (!lang.isString(uri)) {
            throw new Error('uri not is String')
        }
        if (options.mark) {
            deploy.mark = options.mark
        }
        let params = {
            // 异步请求 同步、异步
            async: true,
            // 请求头文件
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        Object.assign(params, options)
        let xhr = new XMLHttpRequest()
            // 检测缓存中是否已经存在

        // 如果域不相同
        let def = new Promise(function(resolve, reject) {
            if (deploy.responseType.indexOf(options.responseType) !== -1) {
                xhr.responseType = options.responseType
            }
            let type = lang.hash(deploy.method, options.type && options.type.toLocaleUpperCase()) ? options.type.toLocaleUpperCase() : deploy.method[0]
            xhr.open(type, setUri(uri, options.data, type), params.async)
            if (type === 'POST') {
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
            }
            for (let i in params.headers) {
                xhr.setRequestHeader(i, params.headers[i])
            }
            xhr.onload = function(data) {
                if (this.status === 200 || this.status === 304) {
                    return resolve(getData(data.target, params.dataType))
                }
                if (this.status === 500 || this.status === 404) {
                    return reject('Server not responding')
                }
                return reject('Unknown cause')
            }
            xhr.send(encodeFormData(options.data, type))
        })
        return def
    }
    lang.setObject(config.getObjectName('xhr'), 1, xhr)
    return xhr
})()
