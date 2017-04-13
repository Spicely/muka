'use strict'
/**
 * Create Time 2017/04/12
 * Write Name Spicely
 * Email Spicely@outlook.com
 */
import config from '../config'
import lang from '../base/lang'
import xhr from '../xhr'
class Ongaku {
  constructor () {
    // 初始化对象
    this.ongaku = new AudioContext()
  }
  loadDogSound (url) {
    this.request = xhr(url, {
      responseType: 'arraybuffer'
    })
    this.request.then((request) => {
      console.log(request)
    })
  }
}
lang.setObject(config.getObjectName('Media.Ongaku'), 1, Ongaku)
export default Ongaku
