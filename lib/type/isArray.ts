import getType from '../lang/getType'

// 判断是否为数组
const isArray = (it: any): boolean => {
    return getType(it) === 'array'
}

export default isArray