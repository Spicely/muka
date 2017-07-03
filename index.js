import xhr from './lib/xhr'
import json from './lib/json'
import config from './lib/config'
import lang from './lib/base/lang'
import browser from './lib/base/browser'
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