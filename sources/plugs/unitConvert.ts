
interface IConvert {
    num: number
    unit: string
}

type IConvertUnit = [string, string, string, string]

function strNumSize(tempNum: number): number {
    const stringNum = tempNum.toString()
    const index = stringNum.indexOf('.')
    let newNum = stringNum
    if (index !== -1) {
        newNum = stringNum.substring(0, index)
    }
    return newNum.length
}

function unitConvert(num: number, units?: IConvertUnit): string {
    const moneyUnits: IConvertUnit = units || ['', '万', '亿', '万亿']
    const dividend: number = 10000
    let curentNum = num
    // 转换数字
    let curentUnit = moneyUnits[0]
    // 转换单位
    for (let i = 0; i < 4; i++) {
        curentUnit = moneyUnits[i]
        if (strNumSize(curentNum) < 5) {
            break
        }
        curentNum = curentNum / dividend
    }
    const m: IConvert = { num: 0, unit: '' }
    m.num = Number(curentNum.toFixed(2))
    m.unit = curentUnit
    return m.num + m.unit
}

export default unitConvert
