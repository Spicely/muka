/**
 * 
 */
import Vue from 'vue';
import lang from "../../mu/base/lang";
(function() {
    if (!Vue) {
        throw new Error("No load Vue.js file");
    }
    let handleListeners = function(el, current, old) {
        if (el == document.body) {
            document.onscroll = function(e) {
                current && current(e, {
                    scrollTop: document.body.scrollTop,
                    scrollLeft: document.body.scrollLeft
                });
            }
        } else if (el.addEventListener) {
            // 先清除滚动事件
            old && el.removeEventListener('mousewheel', old);
            el.addEventListener('mousewheel', function (e) {
                current && current(e, {
                    scrollTop: el.scrollTop,
                    scrollLeft: el.scrollLeft
                });
            });
        } else {
            old && el.detachEvent('onmousewheel', old);
            el.attach('onmousewheel', function(e) {
                e = e || window.event;
                current && current(e, {
                    scrollTop: el.scrollTop,
                    scrollLeft: el.scrollLeft
                });
            });
        }
    }
    // 注册一个全局自定义指令 v-scorll
    Vue.directive('scroll', {
        // 当绑定元素插入到 DOM 中。
        bind: function(el, binding, vnode) {
            handleListeners(el, binding.value, binding.oldValue);
        },
        inserted: function(el, binding) {
            //To do, check whether el is scrollable and give warn message if it's not'
        },
        update: function(el, binding) {
            if (binding.value === binding.oldValue) {
                return;
            }
            if (!binding.value || !lang.isFunction(binding.value)) {
                throw new Error('The mousewheel listener is not a function');
            }
            handleListeners(el, binding.value, binding.oldValue);
        },
        unbind: function(el, binding) {
            if (binding.value && lang.isFunction(binding.value)) {
                if (el.removeEventListener) {
                    el.removeEventListener('mousewheel', binding.value);
                } else {
                    el.detachEvent('onmousewheel', binding.value);
                }
            }
        }
    });
})()