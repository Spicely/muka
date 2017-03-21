<template>
    <div class="mu-scroll-page-pack">
        <div class="mu-scroll-page-hold" v-scroll="onScroll">
            <slot></slt>
        </div>
    </div>
</template>

<style lang="less">
    .mu-scroll-page-pack {
        overflow: hidden;
        .mu-scroll-page-hold {}
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
    import "./scroll";
    export default {
        name: "scroll-page",
        methods: {
            onScroll: function() {
                console.log(2)
            }
        },

    }
</script>