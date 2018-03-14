import lang from './lang'

const type = {
    // 判断是否为表单数据
    form: function(it: any): boolean {
        return lang.type(it) === 'formData'
    },
    // 是否为文件类型
    file: function(it: any): boolean {
        return lang.type(it) === 'file'
    },
    // 判断是否为数组
    array: function(it: any): boolean {
        return lang.type(it) === 'array'
    },
    // 判断是否为JSON
    object: function (it: any): boolean {
        return lang.type(it) === 'object'
    },
    // 判断是否为函数
    func: function (it: any): boolean {
        return lang.type(it) === 'function'
    },
    // 判断是否为字符串
    string: function (it: any): boolean {
        return lang.type(it) === 'string'
    },
    // 判断是否为Blob
    blob: function (it: any): boolean {
        return lang.type(it) === 'blob'
    },
    // 判断是否为数字
    number: function (it: any): boolean {
        return lang.type(it) === 'number'
    },
    // 判断是否为节点
    element: function (it: any): boolean {
        return lang.type(it) === 'element'
    },
    // 判断是否没有被赋值
    notVol: function (it: any): boolean {
        return lang.type(it) === 'undefined' || it === '' || lang.type(it) === 'null' || isNaN(it)
    },
    // 判断是否为布尔
    bool: function (it: any): boolean  {
        return lang.type(it) === 'boolean'
    },
    // 判断是否为空对象
    emptyObject: function (it: object): boolean  {
        if (JSON.stringify(it) === '{}') {
            return true
        }
        return false
    }
}

export default type