/**
 * Create Time 2016-10-20
 * Write Name Shackles Butterfly
 * Email Spicely@outlook.com
 */
interface IBrowser {
    height: number
    width: number
    GL_SC_HEIGHT: number
    GL_SC_WIDTH: number
    redirect: string
    isPC: boolean
    isMobile: boolean
    search: object
}

const browser: IBrowser = Object.create(null, {
    // 显示器宽度
    GL_SC_HEIGHT: {
        value: (_ => {
            try {
                return window.screen.height
            } catch (e) {
                return 0
            }
        })()
    },

    // 显示器高度
    GL_SC_WIDTH: {
        value: (_ => {
            try {
                return window.screen.width
            } catch (e) {
                return 0
            }
        })()
    },

    // 浏览器可见高度
    height: {
        get: () => {
            try {
                return window.innerHeight
            } catch (e) {
                return 0
            }
        }
    },

    // 判断手机平台
    isMobile: {
        get(): boolean {
            return !this.isPC
        }
    },

    // 判断PC平台
    isPC: {
        get(): boolean {
            const mobile = this.redirect.match(/ipad/i) ||
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

    // 用于获得浏览器平台
    redirect: {
        get: () => {
            try {
                const sUserAgent = navigator.userAgent.toLowerCase()
                return /\(([^()]*)\)/.test(sUserAgent) && RegExp.$1
            } catch (e) {
                return 'error'
            }
        }
    },

    // 获得浏览器传递的参数
    search: {
        get() {
            let search = location.search
            if (search) {
                search = location.search.substr(1)
            } else {
                // 没有得到可能是单页面应用从#后截取
                const query = location.hash.split('?')
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
            const arr = search.split('&')
            const obj: object = {}
            arr.map((item: string) => {
                const tmpArr = item.split('=')
                obj[decodeURIComponent(tmpArr[0])] = decodeURIComponent(tmpArr[1])
            })
            return obj
        }
    },

    // 浏览器可见宽度
    width: {
        get: () => {
            try {
                return window.innerWidth
            } catch (e) {
                return 0
            }
        }
    }
})

export default browser
