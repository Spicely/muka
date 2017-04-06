<template>
    <div class="mu-scrollable-pane-pack" ref='pack'>
        <div class="mu-scrollable-pane-hold" ref='hold' v-scroll="onScroll" :style="holdStyle">
            <slot></slot>
        </div>
        <div class="mu-scrollable-pane-bar" ref='bar' :style="barStyle"></div>
    </div>
</template>

<style lang="less">
  .mu-scrollable-pane-pack {
        overflow: hidden;
        position: relative;
        height: 100%;
        .mu-scrollable-pane-hold {
            position: relative;
        }  
        .mu-scrollable-pane-bar{
            position: absolute;
            right: 0px;
            width: 5px;
            border-radius: 2.5px;
            background-color: rgba(0,0,0,0.6);
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
    import './mousewheel';
    import domStyle from '../../mu/dom/style';
    export default {
        mounted: function() {
            setTimeout(this.initScrollBar,10)
        },
        name: "scrollable-pane",
        data:() => {
            return {
                holdStyle: {
                    top: 0
                },
                barStyle: {
                    height: 0,
                    top: 0,
                },
                // 自动判断/向下/向上/向右/向左
                modes: ['auto', 'alow', 'upward', 'dextrad', 'aleft'],
                // 初始化容器高度
                hideRange: 0
            }
        },
        props: {
             mode: {
                 type: String,
                 default: 'alow'
             }
        },
        methods: {
            onScroll: function (top, left) {
                if (this.hideRange <= 0) return;
                this.holdStyle.top = parseFloat(this.holdStyle.top) + (top.wheelDelta / 120 * 20) + 'px'
                this.barStyle.top = -(parseFloat(this.holdStyle.top) + (top.wheelDelta / 120 * 20)) + 'px'
                if (parseFloat(this.holdStyle.top) > 0) {
                    this.holdStyle.top = 0 + 'px';
                    this.barStyle.top = 0 + 'px';
                }
                if (Math.abs(parseFloat(this.holdStyle.top)) > this.hideRange) {
                    this.holdStyle.top = -this.hideRange + 'px';
                    this.barStyle.top = this.hideRange + 'px';
                }
            },
            initScrollBar: function() {
                if(this.modes.indexOf(this.mode) === -1) {
                    throw new Error('Scroll mode not defined');
                }
                switch(this.mode){
                    case 'alow': this.alowScroll();
                
                }
            },
            // 设置向下的滚动
            alowScroll: function() {
                let packH = domStyle.get(this.$refs.pack, 'height')[0];
                let holdH = 0;
                holdH = domStyle.get(this.$refs.hold, 'height')[0];
                this.hideRange = holdH - packH;
                if(holdH > packH) {
                    this.barStyle.height = packH / holdH  * 100 + '%';
                }
            }
        },
    }
</script>

