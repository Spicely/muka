import getType from '../lang/getType'

// 判断是否为数字
const isNumber = (it: any): boolean => {
    return getType(it) === 'number'
}

export default isNumber