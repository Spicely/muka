import axios from 'axios'
import hash from '../lang/hash'
import isFunc from '../type/isFunc'

export default class PreLoad {
    /**
     *  加载文件数据
     */
    private loads: (string | WindowBase64 | undefined)[] = []

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

    /**
     * 加载文件总数
     */
    private count: number = 0

    constructor(imgs: (string | WindowBase64 | undefined)[] = []) {
        this.loads = imgs
        this.count = imgs.length
        this.pomiseLoads = this.loads.map((item: string): Promise<{} | void> => {
            // 获得文件后缀名
            return this.getExtLoad(item)
        })
    }
    /**
     * 加载中的回调
     */
    public loading: (num: number, count: number, pomiseLoads: Promise<{} | void>) => void = () => { return }

    /**
     * 完成所有加载的回调
     */
    public success: (loads: (string | WindowBase64 | undefined)[], pomiseLoads: Array<Promise<{} | void>>) => void = () => { return }

    /**
     * 依据后缀名 选择加载方式
     */
    private getExtLoad(uri: string): Promise<{} | void> {
        const index = uri.lastIndexOf('.')
        const ext = uri.substr(index + 1)
        const THIS = this
        if (hash(this.imgTypes, ext)) {
            const img: HTMLImageElement = new Image()
            return new Promise((resolve, reject) => {
                img.addEventListener('load', () => {
                    THIS.loadNum++
                    THIS.loadFunc()
                    resolve(uri)
                })
                img.addEventListener('error',  () => {
                    THIS.loadNum++
                    THIS.loadFunc()
                    reject('load img error ' + uri)
                })
                img.src = uri
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
        if (isFunc(this.loading)) {
            this.loading(this.loadNum, this.count, this.pomiseLoads[this.loadNum])
        }
        if (isFunc(this.success) && this.loadNum === this.count) {
            this.success(this.loads, this.pomiseLoads)
        }
    }
}