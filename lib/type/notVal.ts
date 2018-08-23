import getType from '../lang/getType'

// 判断是否没有被赋值
const notVal = (it: any): boolean => {
    return getType(it) === 'undefined' || it === '' || getType(it) === 'null'
}

export default notVal