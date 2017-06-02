import ScrollablePane from './ScrollablePane'

/* istanbul ignore next */
ScrollablePane.install = function (Vue) {
    Vue.component(ScrollablePane.name, LoadingComponent)
}
export default ScrollablePane