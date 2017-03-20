<template>
    <div class="mu-screen-page-pack">
        <div class="mu-screen-page-hold" v-scroll="onScroll">
            <slot></slt>
        </div>
    </div>
</template>

<style lang="less">
    .mu-screen-page-pack {
        overflow: hidden;
        .mu-screen-page-hold {}
    }
</style>
<script>
    /**
     *  time 2017/03/20
     *  name Spicely
     *  email Spicely@outlook.com
     *  docs
     *      提供用于滚动的组件
     *      用于PC和Mobile中都能使用的组件
     */
    export default {
        name: "screen-page",
        methods: {
            onScroll: function() {
                console.log(1)
            }
        },
        directive: {
            scroll: {
                bind: function(el, binding, vnode) {
                    if (!binding.value || typeof binding.value !== 'function') {
                        throw new Error('The scroll listener is not a function');
                    }
                },
                inserted: function(el, binding) {
                    //To do, check whether el is scrollable and give warn message if it's not'
                },
                update: function(el, binding) {
                    if (binding.value === binding.oldValue) {
                        return;
                    }
                    if (!binding.value || typeof binding.value !== 'function') {
                        throw new Error('The scroll listener is not a function');
                    }
                },
                unbind: function(el, binding) {
                    if (binding.value && typeof binding.value === 'function') {
                        if (el.removeEventListener) {
                            el.removeEventListener('scroll', binding.value);
                        } else {
                            el.detachEvent('onscroll', binding.value);
                        }
                    }
                }
            }
        }
    }
</script>