<template>
    <div class="mu-scrollable-pane-pack">
        <div class="mu-scrollable-pane-hold" v-scroll="onScroll">
            <div class="mu-scrollable-pane-bar"></div>
            <slot></slot>
        </div>
    </div>
</template>

<style lang="less">
  .mu-scrollable-pane-pack {
        overflow: hidden;
        position: relative;
        .mu-scrollable-pane-hold {
            .mu-scrollable-pane-bar{
                position: absolute;
                right: 0px;
                width: 5px;
                border-radius: 2.5px;
                background-color: rgba(0,0,0,0.6);
            }
        }
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
    import "./mousewheel";
    export default {
        created: function(){},
        name: "scrollable-pane",
        methods: {
        onScroll: function (top) {
            console.log(top)
        }
    },
  }
</script>

