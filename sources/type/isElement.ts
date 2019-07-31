import getType from '../lang/getType'

// 判断是否为节点
const isElement = (it: any): boolean => {
    return getType(it) === 'element'
}

export default isElement
