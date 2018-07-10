import object from '../json/object'

// 判断值中是否存在
const hash = (source: string | any[] | object, value: string): boolean  => {
    if (Array.isArray(source)) {
        return source.indexOf(value) !== -1
    } else if (object(source)) {
        return source.hasOwnProperty(value)
    } else if (typeof source === 'string') {
        return source.includes(value)
    }
    throw new Error('source type not supported')
}

export default hash