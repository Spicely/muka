import xhr from '../packages/xhr'
xhr.install = function(Vue){
    Vue.prototype.$xhr = xhr
}
export default xhr