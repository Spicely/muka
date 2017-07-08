/**
 * Create Time 2016-10-18
 * Write Name Shackles Butterfly
 * Email ShackButter@outlook.com
 */
export default Object.create(null, {
    baseName: {
        value: 'muka'
    },
    getObject: {
        value: function () {
            return this.global[this.baseName]
        }
    },
    getObjectName: {
        value: function (name) {
            return name ? this.baseName + '.' + name : this.baseName
        }
    },
    // 全局对象
    global: {
        value: window
    },
    // 文本对象
    basic: {
        value: document
    }
})