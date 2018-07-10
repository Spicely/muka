import getType from '../lang/getType'

// 判断是否为字符串
const isString = (it: any): boolean => {
    return getType(it) === 'string'
}

export default isString