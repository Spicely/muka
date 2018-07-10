import getType from '../lang/getType'

// 是否为文件类型
const isFile = (it: any): boolean => {
    return getType(it) === 'file'
}

export default isFile