/**
 *  Time 2017/02/24
 *  Name Spicely
 *  email Spicely@outlook.com
 *  exp
 *      提供自动判断是为否跨域请求处理
 */
import config from './config'
import lang from './base/lang'
let xhr = function (uri, options = {}) {
  if (!lang.isString(uri)) {
    throw new Error('uri not is String')
  }
  // 获得当前的端口号
  // let orgin = location.origin
  // 设置请求方式
  let config = {
    mode: ['cors', 'no-cors'],
    method: ['GET', 'POST'],
    responseType: ['text', 'arraybuffer', 'blob', 'document']
  }
  var xhr = new XMLHttpRequest()
  let def = new Promise(function (resolve, reject) {
    if (config.responseType.indexOf(options.responseType) !== -1) {
      xhr.responseType = options.responseType
    }
    xhr.open(lang.hash(config.method, options.type && options.type.toLocaleUpperCase()) ? options.type.toLocaleUpperCase() : config.method[0], uri, true)
    xhr.onload = function (data) {
      if (this.status === 200) {
        resolve(data)
      }
      if (this.status === 500 || this.status === 404) {
        reject(data)
      }
    }
    xhr.send()
  })
  return def
}
lang.setObject(config.getObjectName('dom.query'), 1, xhr)
export default xhr
