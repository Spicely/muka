import getType from '../lang/getType'

// 判断是否为字符串
const isUndefined = (it: any): it is undefined => {
    return getType(it) === 'undefined'
}

export default isUndefined
