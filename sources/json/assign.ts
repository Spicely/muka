import isObject from './isObject'
import isArray from '../type/isArray'
// 深度合并
const assign = (minor: any = {}, main: any = {}): object => {
    minor = { ...minor }
    for (const key in main) {
        if (isObject(main[key])) {
            minor[key] = assign({}, main[key])
        } else if (isArray(main[key])) {
            minor[key] = main[key].concat()
        } else {
            minor[key] = main[key]
        }
    }
    return minor
}
export default assign
