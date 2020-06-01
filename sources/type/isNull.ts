import getType from '../lang/getType'

const isNull = (it: any): it is null => {
    return getType(it) === 'null'
}

export default isNull
