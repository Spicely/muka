function hidden(str: string, frontLen: number, endLen: number, mark: string) {
    const num = endLen - frontLen
    let sign = ''
    for (let i = 0; i < num; i++) {
        sign += mark
    }
    return str.substring(0, frontLen) + sign + str.substring(endLen)
}

/**
 * 字符串符号替换
 * 用于不显示完整信息
 */
export default class Hide {

    public static fullName(name: string, mark?: string): string {
        mark = mark ?? '*'
        const length = name.length > 2 ? 2 : name.length
        return hidden(name, 0, name.length === 2 ? 1 : length, mark)
    }

    public static card(name: string, mark?: string): string {
        mark = mark ?? '*'
        return hidden(name, 4, 14, mark)
    }

}