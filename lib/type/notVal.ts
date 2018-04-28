// 判断是否没有被赋值
import getType from '../lang/getType'

const notVal = function (it: any): boolean {
    return getType(it) === 'undefined' || it === '' || getType(it) === 'null'
}
export default notVal