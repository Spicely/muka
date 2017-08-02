import lang from '../../base/lang'
import config from '../../config'
let scroll = function () {
    console.log(1)
}
lang.setObject(config.getObjectName('event.scroll'), 1, scroll)
export default scroll
