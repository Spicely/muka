/**
 * create time 2017/02/04
 * email Spicely@outlook.com
 */

import lang from '../base/lang.js'
let loadSame = function (path = [], waiting = () => {}) {
    if (!lang.isArray(path)) {
        throw new Error('Path can only be array')
    }
    // 执行等待方法
    if (lang.isFunction(waiting)) {
        waiting.call(this)
    }
    return new Promise(function (resolve, reject) {
        resolve(path.map(function (item) {
            return fetch(item).then(function (response) {
                return response.blob()
            }).then(function (response) {
                return URL.createObjectURL(response)
            }).catch(function () {
                reject('load error')
            })
        }))
    })
}
export default loadSame