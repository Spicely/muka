/**
 * Create Time 2016-10-14
 * Write Name Spicely
 * Email Spicely@outlook.com
 */
import config from '../config'
/**
 * 用于创建设置获取对对象
 * @param  {[type]} parts   [description]
 * @param  {[type]} create  [description]
 * @param  {[type]} content [description]
 * @param  {[type]} object  [description]
 * @return {[type]}         [description]
 */
let getProp = function (parts, create, content) {
    let part = create ? content || config.global : content || {}
    try {
        for (let i = 0; i < parts.length; i++) {
            let p = parts[i]
            if (!(p in part)) {
                if (create) {
                    part[p] = Object.create(null, {})
                } else {
                    return // return undefined
                }
            }
            part = part[p]
        }
        return part
    } catch (e) {
        throw new Error(e)
    }
}

let lang = Object.create(null, {
    // 检查对象类型
    type: {
        value: function (it) {
            let o = {}.toString.call(it)
            let ele = o.split(' ')[1].substr(0, 4)
            switch (o) {
                case '[object Object]':
                    return 'object'
                case '[object Array]':
                    return 'array'
                case '[object RegExt]':
                    return 'regext'
                case '[object Number]':
                    return 'number'
                case '[object String]':
                    return 'string'
                case '[object Null]':
                    return 'null'
                case '[object Function]':
                    return 'function'
                case '[object Boolean]':
                    return 'boolean'
                case '[object Blob]':
                    return 'blob'
                case '[object File]':
                    return 'file'
                case '[object FormData]':
                    return 'formData'
                default:
                    if (!it) {
                        return '' + it + ''
                    } else {
                        if (ele === 'HTML' || ele === 'Node') {
                            return 'element'
                        } else {
                            return 'unkonw'
                        }
                    }
            }
        },
        enumerable: true
    },
    // 判断是否为表单数据
    isFormData: {
        value: function (it) {
            return this.type(it) === 'formData'
        },
        enumerable: true
    },
    // 是否为文件类型
    isFile: {
        value: function (it) {
            return this.type(it) === 'file'
        },
        enumerable: true
    },
    // 判断是否为数组
    isArray: {
        value: function (it) {
            return Array.isArray(it)
        },
        enumerable: true
    },
    // 判断是否为JSON
    isObject: {
        value: function (it) {
            return this.type(it) === 'object'
        },
        enumerable: true
    },
    // 判断是否为函数
    isFunction: {
        value: function (it) {
            return this.type(it) === 'function'
        },
        enumerable: true
    },
    // 判断是否为字符串
    isString: {
        value: function (it) {
            return this.type(it) === 'string'
        },
        enumerable: true
    },
    // 判断是否为Blob
    isBlob: {
        value: function (it) {
            return this.type(it) === 'blob'
        },
        enumerable: true
    },
    // 判断是否为节点
    isElement: {
        value: function (it) {
            return this.type(it) === 'element'
        },
        enumerable: true
    },
    // 判断是否没有被定义
    isNotDef: {
        value: function (it) {
            return this.type(it) === 'undefined' || this.type(it) === 'null' || isNaN(it)
        },
        enumerable: true
    },
    // 判断是否为数字
    isNumber: {
        value: function (it) {
            return this.type(it) === 'number'
        },
        enumerable: true
    },
    // 判断是否为布尔
    isBoolean: {
        value: function (it) {
            return this.type(it) === 'boolean'
        },
        enumerable: true
    },

    // 判断是否为空对象
    isEmptyObject: {
        value: function (it) {
            let t
            for (t in it) return !1
            return !0
        },
        enumerable: true
    },

    // 将伪数组,字符串等转换成数组
    toArray: {
        value: function (it) {
            // 将伪数组转成数组
            if (it.length && !this.isArray(it) && !this.isString(it)) {
                // return Array.apply([], it)
                return Array.from(it)
            } else if (this.isArray(it)) {
                // 是数组直接返回
                return it
            } else {
                // 直接存储到数组中
                return [it]
            }
        },
        enumerable: true
    },

    // 设置对象值
    setObject: {
        value: function (name, create = false, value = undefined, context = undefined) {
            let parts = name.split('.')
            let p = parts.pop()
            let obj = getProp(parts, create, context)
            return obj && p ? (obj[p] = value) : undefined
        },
        enumerable: true
    },
    // 判断值中是否存在
    hash: {
        value: function (source, value) {
            if (this.isArray(source)) {
                return source.indexOf(value) !== -1
            } else if (this.isObject(source)) {
                return source.hasOwnProperty(value)
            } else if (this.isString(source)) {
                return source.indexOf(value) !== -1
            }
            throw new Error('source type not supported')
        },
        enumerable: true
    },
    // 获得对象值 如果第二个参数为true 则会为你在window或者传递的参数里创建一个对象
    getObject: {
        value: function (name, create = false, context = undefined) {
            return !name ? context : getProp(name.split('.'), create, context)
        },
        enumerable: true
    },

    // 向对象添加可配置的对象 descriptor
    defineProperty: {
        value: function (obj, desc) {
            for (let i in desc) {
                let init = {
                    enumerable: true,
                    configurable: false,
                    writable: false,
                    value: null
                }
                if (this.isObject(desc[i]) && desc[i].value) {
                    Object.assign(init, desc[i])
                } else {
                    init.value = desc[i]
                }
                Object.defineProperty(obj, i, init)
            }
            return obj
        },
        enumerable: true
    },
    // 创建对象
    create: {
        value: function (obj, proto) {
            let value = {}
            for (let i in obj) {
                let init = {
                    enumerable: true,
                    configurable: false,
                    writable: false,
                    value: null
                }
                if (this.isObject(obj[i])) {
                    if (obj[i].get || obj[i].set) {
                        init = obj[i]
                    } else {
                        Object.assign(init, obj[i])
                    }
                } else {
                    init.value = obj[i]
                }
                value[i] = init
            }
            return Object.create(proto || null, value)
        },
        enumerable: true
    },
    /**
     *    @param obj 数据对象
     *    @param key 指定修改对像的某一个值
     *    docs
     *        将对像里的所有值转变成Boolean 并返回相反的值
     */
    invert: {
        value: function (obj, key) {
            if (!this.isObject(obj)) throw new Error('obj not is Object')
            if (key) {
                obj[key] = !obj[key]
            } else {
                for (let i in obj) obj[i] = !obj[i]
            }
            return obj
        }
    }
})
lang.setObject(config.getObjectName('base.lang'), 1, lang)
export default lang