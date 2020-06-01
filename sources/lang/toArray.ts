import isArray from '../type/isArray'
import isString from '../type/isString'

// 将伪数组,字符串等转换成数组
const toArray = (it: any): any[] => {
    // 将伪数组转成数组
    if (it.length && !isArray(it) && !isString(it)) {
        try {
            return Array.from(it)
        } catch (e) {
            return Array.prototype.slice.call(it)
        }
    } else if (isArray(it)) {
        // 是数组直接返回
        return it
    } else {
        // 直接存储到数组中
        return [it]
    }
}

export default toArray
