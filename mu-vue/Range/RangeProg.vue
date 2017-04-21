<template>
  <div class="mu-range-pack">
    <div class="mu-range-region" ref="region" @click.self="toDesignat">
      <div class="mu-range-handle" :class="handleClass" :style="handleStyle" ref="handle"></div>
    </div>
  </div>
</template>

<style lang="less">
  .mu-range-pack {
    width: 90px;
    display: inline-block;
    vertical-align: middle;
    .mu-range-region {
      width: 100%;
      height: 5px;
      border-radius: 5px;
      background: white;
      .mu-animation {
        transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
      }
      .mu-range-handle {
        height: 12px;
        width: 12px;
        background-color: #53e3a6;
        border-radius: 50%;
        cursor: pointer;
        top: -3.5px;
        float: left;
        position: relative;
      }
      .mu-range-handle::after {
        content: "";
        height: 12px;
        width: 12px;
        position: absolute;
        top: 0;
        background-color: rgba(66, 214, 215, 0.5);
        border-radius: 50%;
        transition: all 0.3s ease-in-out;
        opacity: 1;
      }
      .mu-range-handle:hover::after {
        transform: scale(1.6);
      }
    }
  }

</style>
<script>
  /**
   *  time 2017/04/21
   *  name Spicely
   *  email Spicely@outlook.com
   *  docs
   *      提供可拖拽的进度条
   */
  import domStyle from '../../mu/dom/style'
  export default {
    name: 'range-prog',
    data: function () {
      return {
        x: 0,
        y: 0,
        apart: 0,
        modeStyle: {
          side: 'width',
          vertical: 'height'
        },
        // 保留上次拖拽的距离
        histAnnals: 0,
        // 这次移动的距离
        annals: 0,
        // 拖动节点的宽度
        handle: 0,
        handleStyle: {
          left: '0%',
          bottom: '0%'
        },
        handleClass: {
          'mu-animation': false
        }
      }
    },
    props: {
      mode: {
        type: String,
        default: 'side' // side  vertical
      },
      max: {
        type: Number,
        default: 1
      },
      min: {
        type: Number,
        default: 0
      },
      value: {
        type: Number,
        default: 0
      },
      rangeCallBack: {
        type: Function,
        default: () => {}
      }
    },
    created: function () {
      if (!this.max && this.max > 0) throw new Error('max must be greater than 0')
      if (!this.mode) throw new Error('not set mode')
    },
    mounted: function () {
      // 给节点绑定事件
      this.$refs.handle.addEventListener('mousedown', this.down, false)
    },
    methods: {
      up: function () {
        window.removeEventListener('mousemove', this.move, false)
        window.removeEventListener('mouseup', this.up, false)
        this.value = this.max / this.annals / 100
        this.histAnnals = this.annals
      },
      down: function (e) {
        this.handleClass['mu-animation'] = false
        // 绑定拖拽事件
        window.addEventListener('mousemove', this.move, false)
        window.addEventListener('mouseup', this.up, false)
        // 获得滚动区域宽度
        this.apart = domStyle.get(this.$refs.region, this.modeStyle[this.mode])[0]
        this.handle = domStyle.get(this.$refs.handle, this.modeStyle[this.mode])[0] / 2
        // 获得按下时鼠标所在位置
        this.x = e.pageX
        this.y = e.pageY
      },
      move: function (e) {
        // 获得移动中鼠标位置
        let x = e.pageX
        let y = e.pageY
        if (this.mode === 'side') {
          this.annals = (x - this.x) / this.apart * 100 + this.histAnnals
          if (this.annals < 0) this.annals = 0
          if (this.annals > 100) this.annals = 100
          this.handleStyle.left = 'calc(' + this.annals + '% - ' + this.handle + 'px)'
        } else if (this.mode === 'vertical') {
          this.annals = (y - this.y) / this.apart * 100 + this.histAnnals
          if (this.annals < 0) this.annals = 0
          if (this.annals > 100) this.annals = 100
          this.handleStyle.bottom = 'calc(' + this.annals + '% - ' + this.handle + 'px)'
        }
      },
      toDesignat: function (e) {
        this.handleClass['mu-animation'] = true
        let x = e.offsetX
        let y = e.offsetY
        // 获得滚动区域宽度
        this.apart = domStyle.get(this.$refs.region, this.modeStyle[this.mode])[0]
        this.handle = domStyle.get(this.$refs.handle, this.modeStyle[this.mode])[0] / 2
        if (this.mode === 'side') {
          this.annals = x / this.apart * 100
          if (this.annals < 0) this.annals = 0
          if (this.annals > 100) this.annals = 100
          this.histAnnals = this.annals
          this.handleStyle.left = 'calc(' + this.annals + '% - ' + this.handle + 'px)'
        } else if (this.mode === 'vertical') {
          this.annals = y / this.apart * 100
          if (this.annals < 0) this.annals = 0
          if (this.annals > 100) this.annals = 100
          this.histAnnals = this.annals
          this.handleStyle.bottom = 'calc(' + this.annals + '% - ' + this.handle + 'px)'
        }
        // this.value = this.max / this.annals / 100
        console.log(this.value)
      }
    }
  }

</script>
