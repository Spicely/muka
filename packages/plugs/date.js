import config from '../config'
import lang from '../base/lang'
const date = {
    getNowFormatDate: function (limiter = '-') {
        let date = new Date()
        let seperator1 = limiter
        let seperator2 = ':'
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        if (month >= 1 && month <= 9) month = '0' + month
        if (strDate >= 0 && strDate <= 9) strDate = '0' + strDate
        if (minutes >= 0 && minutes <= 9) minutes = '0' + minutes
        if (seconds >= 0 && seconds <= 9) seconds = '0' + seconds
        let currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate +
            ' ' + date.getHours() + seperator2 + minutes +
            seperator2 + seconds
        return currentdate
    }
}
lang.setObject(config.getObjectName('plugs.date'), 1, date)
export default date
