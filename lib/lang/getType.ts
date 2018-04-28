const getType = function (it: any): string {
    const o: string = {}.toString.call(it)
    const ele: string = o.split(' ')[1].substr(0, 4)
    switch (o) {
        case '[object Object]':
            return 'object'
        case '[object Array]':
            return 'array'
        case '[object RegExt]':
            return 'regext'
        case '[object Number]':
            return 'number'
        case '[object String]':
            return 'string'
        case '[object Null]':
            return 'null'
        case '[object Function]':
            return 'function'
        case '[object Boolean]':
            return 'boolean'
        case '[object Blob]':
            return 'blob'
        case '[object File]':
            return 'file'
        case '[object FormData]':
            return 'formData'
        default:
            if (!it) {
                return '' + it + ''
            } else {
                if (ele === 'HTML' || ele === 'Node') {
                    return 'element'
                } else {
                    return 'unkonw'
                }
            }
    }
}
export default getType
