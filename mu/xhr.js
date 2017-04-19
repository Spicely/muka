/**
 *  Time 2017/02/24
 *  Name Spicely
 *  email Spicely@outlook.com
 *  exp
 *      提供自动判断是为否跨域请求处理
 */
import config from './config'
import lang from './base/lang'
export default (function () {
  // 设置请求方式
  let deploy = {
    method: ['GET', 'POST'],
    responseType: ['text', 'arraybuffer', 'blob', 'document'],
    mark: '&'
  }

  // 重新排列数据
  function getParams (data) {
    if (lang.isObject(data)) {
      let params = ''
      for (let i in data) {
        params += i + '=' + data[i] + deploy.mark
      }
      return params.substr(0, params.length - 1)
    } else {
      return data
    }
  }
  // 获得重新排列过的uri
  function setUri (uri, data, type) {
    if (type === deploy.method[0]) {
      let str = getParams(data)
      return str ? uri + '?' + str : uri
    } else {
      return uri
    }
  }
  let xhr = function (uri, options = {}) {
    if (!lang.isString(uri)) {
      throw new Error('uri not is String')
    }
    if (options.mark) {
      deploy.mark = options.mark
    }
    let params = {
      // 异步请求 同步、异步
      async: true
    }
    Object.assign(params, options)
    var xhr = new XMLHttpRequest()
    // 如果域不相同
    let def = new Promise(function (resolve, reject) {
      if (deploy.responseType.indexOf(options.responseType) !== -1) {
        xhr.responseType = options.responseType
      }
      let type = lang.hash(deploy.method, options.type && options.type.toLocaleUpperCase()) ? options.type.toLocaleUpperCase() : deploy.method[0]
      xhr.open(type, setUri(uri, options.data, type), params.async)
      xhr.onload = function (data) {
        if (this.status === 200) {
          resolve({
            data: JSON.parse(data.target.response),
            response: xhr
          })
        }
        if (this.status === 500 || this.status === 404) {
          reject('Server not responding')
        }
      }
      xhr.send(getParams(options.data))
    })
    return def
  }
  lang.setObject(config.getObjectName('xhr'), 1, xhr)
  return xhr
})()
