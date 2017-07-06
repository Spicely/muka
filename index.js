import xhr from './lib/xhr'
import json from './lib/json'
import config from './lib/config'
import browser from './lib/browser'
import lang from './lib/base/lang'
import domStyle from './lib/dom/style'
import mouseDrag from './lib/event/mouseDrag'
const muka = config.getObject()
export {
    muka as
    default,
    xhr,
    json,
    browser,
    config,
    lang,
    domStyle,
    mouseDrag
}