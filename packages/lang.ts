import type from './type'
const lang = {
    // 判断数据类型
    type: function (it: any): string {
        let o: string = {}.toString.call(it)
        let ele: string = o.split(' ')[1].substr(0, 4)
        switch (o) {
            case '[object Object]':
                return 'object'
            case '[object Array]':
                return 'array'
            case '[object RegExt]':
                return 'regext'
            case '[object Number]':
                return 'number'
            case '[object String]':
                return 'string'
            case '[object Null]':
                return 'null'
            case '[object Function]':
                return 'function'
            case '[object Boolean]':
                return 'boolean'
            case '[object Blob]':
                return 'blob'
            case '[object File]':
                return 'file'
            case '[object FormData]':
                return 'formData'
            default:
                if (!it) {
                    return '' + it + ''
                } else {
                    if (ele === 'HTML' || ele === 'Node') {
                        return 'element'
                    } else {
                        return 'unkonw'
                    }
                }
        }
    },
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
            return source.includes(value)
        } else if (type.object(source)) {
            return source.hasOwnProperty(value)
        } else if (typeof source === 'string') {
            return source.includes(value)
        }
        throw new Error('source type not supported')
    }
}
export default lang