import getType from '../lang/getType'
const isObject = (it: any): boolean => {
    return getType(it) === 'object'
}
export default isObject