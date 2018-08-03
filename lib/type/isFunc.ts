import getType from '../lang/getType'
// 判断是否为函数
const isFunc = (it: any): it is (...args: any[]) => any => {
    return getType(it) === 'function'
}

export default isFunc