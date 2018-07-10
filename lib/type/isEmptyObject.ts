// 判断是否为空对象
const isEmptyObject = (it: object): boolean => {
    if (JSON.stringify(it) === '{}') {
        return true
    }
    return false
}

export default isEmptyObject