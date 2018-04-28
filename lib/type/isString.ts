import getType from '../lang/getType'
const isString = function(it: any): boolean {
    return getType(it) === 'string'
}
export default isString