/**
 * Create Time 2017/09/18
 * Write Name Spicely
 * Email Spicely@outlook.com
 */
import config from '../../config'
import lang from '../../base/lang'
import domAttr from '../attr'

const removeNull = function (arr) {
    return arr.filter((item) => {
        return item !== ''
    })
}

const domClass = lang.create({
    has (node, name) {
        return domAttr.get(node, 'class').map((item) => {
            return removeNull(item.split(' ')).includes(name)
        })
    },
    add (node, name) {
        let _class = domAttr.get(node, 'class').map((item) => {
            _class = removeNull(item.split(' '))
            _class.push(name)
            this.has(node, name).map((i) => {
                if (!i) domAttr.set(node, 'class', _class.join(' '))
            })
        })
    },
    remove (node, name) {
        let _class = domAttr.get(node, 'class').map((item) => {
            _class = removeNull(item.split(' '))
            removeNull(name.split(' ')).map((ite) => {
                if (_class.includes(ite)) {
                    _class.splice(_class.indexOf(ite), 1)
                    domAttr.set(node, 'class', _class.join(' '))
                }
            })
        })
    }
})
lang.setObject(config.getObjectName('dom.class'), 1, domClass)
export default domClass
