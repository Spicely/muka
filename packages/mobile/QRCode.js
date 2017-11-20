/**
 *  time 2017/03/13
 *  name Spicely
 *  email Spicely@outlook.com
 *  notes
 *      提供二维码扫描接口
 */
let QRCode = function () {
    if (navigator.mediaDevices) {
        return navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: {
                    exact: 'environment'
                }
            }
        })
    } else if (navigator.getUserMedia) {
        return navigator.getUserMedia({
            video: {
                facingMode: {
                    exact: 'environment'
                }
            }
        })
    } else {
        throw new Error('Browser does not support')
    }
}

export default QRCode
