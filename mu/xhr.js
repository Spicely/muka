/**
 *  Time 2017/02/24
 *  Name Spicely
 *  email Spicely@outlook.com
 *  exp
 *      提供自动判断是为否跨域请求处理
 */

let xhr = function(uri, options = {}) {
    // 获得当前的端口号
    let orgin = location.origin;
    // 设置请求方式
    let config = {
        mode: ["cors", "no-cors"],
        method: ["GET", "POST"]
    }
}