/**
 * Create Time 2016-10-20
 * Write Name Shackles Butterfly
 * Email ShackButter@outlook.com
 */
import lang from './lang'
import type from './type'
const browser = Object.create(null, {
    // 浏览器可见高度
    height: {
        get: () => {
            return document.documentElement.clientHeight
        }
    },
    // 浏览器可见宽度
    width: {
        get: () => {
            return document.documentElement.clientWidth
        }
    },
    // 显示器宽度
    GL_SC_HEIGHT: {
        value: (function () {
            try {
                return window.screen.height
            } catch (e) {
                return 0
            }
        })()
    },
    // 显示器高度
    GL_SC_WIDTH: {
        value: (function () {
            try {
                return window.screen.width
            } catch (e) {
                return 0
            }
        })()
    },
    // 用于获得浏览器平台
    redirect: {
        get: () => {
            try {
                let sUserAgent = navigator.userAgent.toLowerCase()
                return /\(([^()]*)\)/.test(sUserAgent) && RegExp.$1
            } catch (e) {
                return 'error'
            }
        }
    },
    // 判断PC平台
    isPC: {
        get () {
            let mobile = this.redirect.match(/ipad/i) || 
                this.redirect.match(/iphone os/i) || 
                this.redirect.match(/midp/i) || 
                this.redirect.match(/rv:1.2.3.4/i) || 
                this.redirect.match(/ucweb/i) || 
                this.redirect.match(/android/i) || 
                this.redirect.match(/windows ce/i) || 
                this.redirect.match(/windows mobile/i) || 
                this.redirect.match(/windows phone/i)
            return !mobile
        }
    },
    // 判断手机平台
    isMobile: {
        get () {
            return !this.isPC
        }
    },

    // 获得浏览器发出请求的参数
    search: {
        get () {
            let search = location.search
            if (search) {
                search = location.search.substr(1)
            } else {
                // 没有得到可能是单页面应用从#后截取
                let query = location.hash.split('?')
                try {
                    if (query[1]) {
                        search = query[1]
                    } else {
                        return {}
                    }
                } catch (e) {
                    // 直接返回空对象
                    return {}
                }
            }
            let arr = search.split('&')
            let obj: object = {}
            arr.map(function (item: string) {
                let tmpArr = item.split('=')
                obj[decodeURIComponent(tmpArr[0])] = decodeURIComponent(tmpArr[1])
            })
            return obj
        }
    }
})
export default browser
