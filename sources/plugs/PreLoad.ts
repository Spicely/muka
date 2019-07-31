import axios from 'axios'
import hash from '../lang/hash'
import isString from '../type/isString'
import isFunction from '../type/isFunction'
import isNumber from '../type/isNumber'
import verify from './verify'

// const CancelToken: axios.CancelTokenStatic = axios.CancelToken

export default class PreLoad {
    /**
     *  加载文件数据
     */
    // tslint:disable-next-line: array-type
    private loads: (string | ArrayBuffer | WindowBase64 | undefined | null)[] = []

    /**
     * 图片类型
     */
    private imgTypes: string[] = ['jpeg', 'svg', 'jpg', 'gif', 'png']

    /**
     * 加载进度
     */
    private loadNum: number = 0

    /**
     * 加载对象
     */
    private pomiseLoads: Array<Promise<{} | void>> = []

    // tslint:disable-next-line: array-type
    private timer: (number | Promise<{}>)[] = []

    /**
     * 加载文件总数
     */
    private count: number = 0

    // tslint:disable-next-line: array-type
    constructor(imgs: (string | WindowBase64 | ArrayBuffer | undefined | null)[] = []) {
        this.loads = imgs
        this.count = imgs.length
        this.loads.forEach((item: string | WindowBase64 | ArrayBuffer | undefined | null) => {
            // 获得文件后缀名
            if ((item && isString(item))) {
                this.pomiseLoads.push(this.getExtLoad(item))
            }
        })
    }

    /**
     * 已经缓存过的文件会触发回调
     */

    public completeLoad: (load: (string | WindowBase64 | ArrayBuffer | undefined | null)) => void = () => { return }

    /**
     * 加载中的回调
     */

    public loading: (num: number, count: number, pomiseLoads: Promise<{} | void>) => void = () => { return }

    /**
     * 完成所有加载的回调
     */

    // tslint:disable-next-line: array-type
    public success: (loads: (string | WindowBase64 | ArrayBuffer | undefined)[], pomiseLoads: Array<Promise<{} | void>>) => void = () => { this.clearAsync() }

    /**
     * 清除没有完成的异步事件
     */

    public clearAsync = () => {
        this.timer.map((item: number | Promise<{}>) => {
            if (isNumber(item)) {
                clearTimeout(item)
            }
        })
    }

    /**
     * 依据后缀名 选择加载方式
     */

    private getExtLoad(uri: string): Promise<{} | void> {
        if (!uri) {
            return Promise.resolve({})
        }
        const index = uri.lastIndexOf('.')
        const ext = uri.substr(index + 1)
        if (hash(this.imgTypes, ext) || verify.isBase64(uri)) {
            const img: HTMLImageElement = new Image()
            img.src = uri
            return new Promise((resolve, reject) => {
                if (img.complete || img.width) {
                    const delay = () => {
                        this.loadNum++
                        this.completeLoad(uri)
                        this.loadFunc()
                        resolve(uri)
                    }
                    this.timer.push(window.setTimeout(delay, 10))
                    return
                }
                img.addEventListener('load', () => {
                    this.loadNum++
                    this.loadFunc()
                    resolve(uri)
                })
                img.addEventListener('error', () => {
                    this.loadNum++
                    this.loadFunc()
                    reject('load img error ' + uri)
                })
            })
        }
        return axios.get(uri).then((data: any) => {
            this.loadNum++
            this.loadFunc()
            return data
        }).catch(() => {
            this.loadNum++
            this.loadFunc()
        })
    }

    /**
     * 加载完成的回调
     */

    private loadFunc() {
        if (isFunction(this.loading)) {
            this.loading(this.loadNum, this.count, this.pomiseLoads[this.loadNum])
        }
        if (isFunction(this.success) && this.loadNum === this.count) {
            this.success(this.loads, this.pomiseLoads)
        }
    }
}
