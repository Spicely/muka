import getType from '../lang/getType'
// 判断是否为函数
const isFunction = (it: any): it is (...args: any[]) => any => {
    return getType(it) === 'function'
}

export default isFunction
