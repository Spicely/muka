// interface IRetrunVal {
//     year: string
//     month: string
//     day: string
//     hours: string
//     minutes: string
//     seconds: string
//     milliSeconds: string
//     date: Date
// }
// const date = {
//     getDate: (dateVal?: string): IRetrunVal => {
//         const time = dateVal ? new Date(dateVal) : new Date
//         const month: number = time.getMonth() + 1
//         const day: number = time.getDate()
//         const hours: number = time.getHours()
//         const minutes: number = time.getMinutes()
//         const seconds: number = time.getSeconds()
//         return {
//             year: time.getFullYear().toString(),
//             month: month >= 1 && month <= 9 ? '0' + month : month.toString(),
//             day: day >= 1 && day <= 9 ? '0' + day : day.toString(),
//             hours: hours >= 1 && hours <= 9 ? '0' + hours : hours.toString(),
//             minutes: minutes >= 1 && minutes <= 9 ? '0' + minutes : minutes.toString(),
//             seconds: seconds >= 1 && seconds <= 9 ? '0' + seconds : seconds.toString(),
//             milliSeconds: time.getMilliseconds().toString(),
//             date: time
//         }
//     },
//     getFormatDate: (dateVal?: string, limiter: string = 'YYYY-MM-DD') => {
//         const time = this.getDate(dateVal)
//         const o = {
//             'MM': time.month, // 月份
//             'DD': time.day, // 日
//             'hh': time.hours, // 小时
//             'mm': time.minutes, // 分
//             'ss': time.seconds, // 秒
//             'qq': Math.floor((time.date.getMonth() + 3) / 3), // 季度
//             'S': time.milliSeconds // 毫秒
//         }
//         const week = {
//             '0': '日',
//             '1': '一',
//             '2': '二',
//             '3': '三',
//             '4': '四',
//             '5': '五',
//             '6': '六'
//         }
//         if (/(Y+)/.test(limiter)) {
//             limiter = limiter.replace(RegExp.$1, time.year.substr(4 - RegExp.$1.length))
//         }
//         if (/(E+)/.test(limiter)) {
//             limiter = limiter.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '星期' : '周') : '')
//                 + week[time.date.getDay() + ''])
//         }
//         for (let i in o) {
//             if (new RegExp(`${i}`).test(limiter)) {
//                 console.log(11111)
//                 limiter = limiter.replace(i, o[i])
//             }
//         }
//         return limiter

//     },
//     getNowNumber: function (dateVal?: string): number {
//         let time = this.getDate(dateVal)
//         return Number(time.year + time.month + time.day + time.hours + time.minutes + time.seconds + time.milliSeconds)
//     }
// }
// export default date
