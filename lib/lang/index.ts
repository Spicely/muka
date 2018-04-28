import type from '../type'

const lang = {
    // 将伪数组,字符串等转换成数组
    toArray: function (it: any): Array<any> {
        // 将伪数组转成数组
        if (it.length && !type.array(it) && !type.string(it)) {
            return Array.from(it)
        } else if (type.array(it)) {
            // 是数组直接返回
            return it
        } else {
            // 直接存储到数组中
            return [it]
        }
    },
    // 判断值中是否存在
    hash: function (source: string | [any] | object, value: string) {
        if (Array.isArray(source)) {
            return source.indexOf(value) !== -1
        } else if (type.object(source)) {
            return source.hasOwnProperty(value)
        } else if (typeof source === 'string') {
            return source.includes(value)
        }
        throw new Error('source type not supported')
    }
}

export default lang