import getType from '../lang/getType'

// 判断是否为函数
const isFunc = (it: any): boolean => {
    return getType(it) === 'function'
}

export default isFunc