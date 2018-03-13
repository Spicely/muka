/**
 *  Time 2017/02/24
 *  Name Spicely
 *  Email Spicely@outlook.com
 */
import lang from './lang'
import type from './type'
const json = {
    // 深度合并
    assign: function (minor: object = {}, main: object = {}) {
        for (let key in main) {
            minor[key] = minor[key] && type.object(minor[key])
                ? this.assign(minor[key], main[key])
                : minor[key] = main[key]
        }
        return minor

    },
    // 深度复制
    clone: function (obj: object) {
        return this.assign({}, obj)
    }
}
export default json
