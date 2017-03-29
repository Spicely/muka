<template>
    <div class="mu-scrollable-pane-pack" ref='pack'>
        <div class="mu-scrollable-pane-hold" v-scroll="onScroll" ref='hold' :style="style">
            <slot></slot>
        </div>
        <div class="mu-scrollable-pane-bar" ref='bar'></div>
    </div>
</template>

<style lang="less">
  .mu-scrollable-pane-pack {
        overflow: hidden;
        position: relative;
        height: 100%;
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
    import domStyle from '../../mu/dom/style'
    export default {
        created: function(){},
        name: "scrollable-pane",
        data:() => {
            return {
                style: {
                    top: 0
                }
            }
        },
        methods: {
        onScroll: function (top, left) {
            console.log(domStyle.get(this.$refs.hold,'height'),domStyle.get(this.$refs.pack,'height'));
        },
    },
  }
</script>

