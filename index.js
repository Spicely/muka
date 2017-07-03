import xhr from './lib/xhr'
import json from './lib/json'
import config from './lib/config'
import lang from './lib/Base/lang'
import browser from './lib/Base/browser'
const muka = config.getObject()
export {
    muka as
    default,
    xhr,
    json,
    config,
    lang,
    browser
}