import getType from '../lang/getType'

// 判断是否为Blob
const isBlob = (it: any): it is Blob => {
    return getType(it) === 'blob'
}

export default isBlob