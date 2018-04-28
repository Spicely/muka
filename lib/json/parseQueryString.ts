const parseQueryJSON = function (query: string) {
    let arr = query.split('&')
    let obj: object = {}
    arr.map(function (item: string) {
        let tmpArr = item.split('=')
        obj[decodeURIComponent(tmpArr[0])] = decodeURIComponent(tmpArr[1])
    })
    return obj
}

export default parseQueryJSON