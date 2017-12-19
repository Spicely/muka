import config from '../config'
import lang from '../base/lang'
const date = {
    getDate: function () {
        let date = new Date()
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        return {
            year: date.getFullYear(),
            month: month >= 1 && month <= 9 ? '0' + month : month,
            day: day >= 1 && day <= 9 ? '0' + day : day,
            hours: hours >= 1 && hours <= 9 ? '0' + hours : hours,
            minutes: minutes >= 1 && minutes <= 9 ? '0' + minutes : minutes,
            seconds: seconds >= 1 && seconds <= 9 ? '0' + seconds : seconds
        }
    },
    getNowFormatDate: function (dateVal, limiter = '-') {
        let date = dateVal ? new Date(dateVal) : new Date()
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
    },
    getNowNumber: function () {
        let date = this.getDate()
        return Number(date.year + date.month + date.day + date.hours + date.minutes + date.seconds)
    }
}
lang.setObject(config.getObjectName('plugs.date'), 1, date)
export default date
