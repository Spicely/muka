import config from '../config'
import lang from '../base/lang'
const date = {
    getDate: function (time) {
        let date = this.Date(time)
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        let seconds = date.getSeconds()
        return {
            year: date.getFullYear(),
            month: month >= 1 && month <= 9 ? '0' + month : month,
            day: day >= 1 && day <= 9 ? '0' + day : day,
            hours: hours >= 0 && hours <= 9 ? '0' + hours : hours,
            minutes: minutes >= 0 && minutes <= 9 ? '0' + minutes : minutes,
            seconds: seconds >= 0 && seconds <= 9 ? '0' + seconds : seconds
        }
    },
    Date: function (time) {
        return time ? isNaN(new Date(time)) ? new Date(time.replace(/-/g, "/")) : new Date(time) : new Date()
    },
    getNowFormatDate: function (limiter = '-,:', time) {
        let limit = limiter.split(',')
        const date = this.getDate(time)
        const _h = limit[0]
        const _m = limit[1] ? limit[1] : limit[0]
        let currentdate = date.year + _h + date.month + _h + date.day +
            ' ' + date.hours + _m + date.minutes + _m + date.seconds
        return currentdate
    },
    getTime: function (time) {
        return this.Date(time).getTime()
    },
    getNowNumber: function (time) {
        let date = this.getDate(time)
        return Number(date.year + date.month + date.day + date.hours + date.minutes + date.seconds)
    }
}
lang.setObject(config.getObjectName('plugs.date'), 1, date)
export default date
