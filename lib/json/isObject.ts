import getType from '../lang/getType'
const isObject = function (it: any): boolean {
    return getType(it) === 'object'
}
export default isObject