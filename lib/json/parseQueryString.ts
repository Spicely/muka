const parseQueryJSON = (query: string) => {
    const arr = query.split('&')
    const obj: any = {}
    arr.map((item: string) => {
        const tmpArr = item.split('=')
        obj[decodeURIComponent(tmpArr[0])] = decodeURIComponent(tmpArr[1])
    })
    return obj
}

export default parseQueryJSON