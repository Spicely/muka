import getType from '../lang/getType'

// 判断是否为表单数据
const isFormData = (it: any): boolean => {
    return getType(it) === 'formData'
}

export default isFormData
