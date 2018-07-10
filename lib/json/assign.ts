import object from '../json/object'
import isArray from '../type/isArray'
// 深度合并
const assign = (minor: object = {}, main: object = {}): object  =>{
    let key
    for (key in main) {
        if (object(main[key])) {
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