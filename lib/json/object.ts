import getType from '../lang/getType'

const object = (it: any): boolean => {
    return getType(it) === 'object'
}

export default object