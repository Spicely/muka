import getType from '../lang/getType'

interface IVlaue {
    [name: string]: any
}
const isObject = (it: any): it is IVlaue => {
    return getType(it) === 'object'
}
export default isObject
