import getType from '../lang/getType'
import notVal from '../type/notVal'

function getValue(type: string, key: string | number, value: any): string {
    let result: string = ''
    switch (type) {
        case 'object': {
            result += urlEncode(value, key)
            break
        }
        case 'array': {
            value.map((item: any, index: number) => {
                result += getValue(getType(value[index]), `${key}[${index}]`, item)
            })
            break
        }
        default: result += `&${key}=${value}`
    }
    return result
}

function urlEncode(parmas: object, key?: string | number): string {
    let result: string = ''
    let keys: string[] = Object.keys(parmas)
    keys.map((item: string, index: number) => {
        console.log(key)
        if (notVal(key)) {
            result += getValue(getType(parmas[item]), item, parmas[item])
        } else {
            console.log(item, key, `${key}[${item}]`)
            result += getValue(getType(parmas[item]), `${key}[${item}]`, parmas[item])
        }
    })
    return result.substr(1)
}

export default urlEncode