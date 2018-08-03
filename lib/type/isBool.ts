import getType from '../lang/getType'

// 判断是否为布尔
const isBool =  (it: any): it is Boolean => {
    return getType(it) === 'boolean'
}

export default isBool