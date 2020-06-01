import getType from '../lang/getType'

// 判断是否没有被赋值
const isNil = (it: any): it is (undefined | null) => {
    return getType(it) === 'undefined' || getType(it) === 'null'
}

export default isNil
