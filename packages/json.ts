/**
 *  Time 2017/02/24
 *  Name Spicely
 *  Email Spicely@outlook.com
 */
import type from './type'

const json = {
    // 深度合并
    assign: function (minor : object = {}, main : object = {}): object {
        for (let key in main) {
            if (type.object(main[key])) {
                minor[key] = this.assign({}, main[key])
            } else if (type.array(main[key])) {
                minor[key] = main[key].concat()
            } else {
                minor[key] = main[key]
            }
        }
        return minor
    },
    // 深度复制
    clone: function (obj : object): object {
        return this.assign({}, obj)
    },
    // 移除指定数组对象 返回一个浅复制对象
    omit(obj : object, fields : string[]): object {
        const shallowCopy = {
            ...obj
        }
        for (let i = 0; i < fields.length; i++) {
            const key = fields[i]
            delete shallowCopy[key]
        }
        return shallowCopy
    }
}

export default json
