<template>
  <div class="mu-range-pack">
    <div class="mu-range-region" :class="progStyle" ref="region" @click.self="toDesignat">
      <div class="mu-range-handle" :class="handleClass" :style="handleStyle" ref="handle"></div>
    </div>
  </div>
</template>
<style lang="less">
  @keyframes sports {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(1.6);
    }
  }

  .mu-range-pack {
    width: 90px;
    display: inline-block;
    vertical-align: middle;
    .mu-range-region {
      width: 100%;
      height: 5px;
      border-radius: 5px;
      background: white;
      position: relative;
      .mu-animation {
        transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
      }
      .mu-motioned::after {
        animation: sports 1s infinite ease-in-out alternate;
      }
      .mu-range-handle {
        height: 12px;
        width: 12px;
        background-color: #53e3a6;
        border-radius: 50%;
        cursor: pointer;
        position: absolute;
      }
      .muVerticalProg {}
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
    .muVertical {
      height: 100%;
      width: 5px;
      display: inline-block;
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
  import lang from '../../mu/base/lang'
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
        // 进度条显示方式
        progStyle: {
          'muVertical': false
        },
        // 保留上次拖拽的距离
        histAnnals: 0,
        // 这次移动的距离
        annals: 0,
        // 拖动节点的宽度
        handle: 0,
        // 拖动状态
        drapStatus: false,
        // 控制器拖拽位置
        handleStyle: {
          left: '0%',
          bottom: '0%'
        },
        // 初始化控制拖拽剧中位置
        handleInit: {
          side: 'top',
          vertical: 'left'
        },
        directions: {
          side: 'left',
          vertical: 'bottom'
        },
        handleClass: {
          'mu-animation': false,
          'mu-motioned': false
        }
      }
    },
    props: {
      mode: {
        type: String,
        default: 'side' // side vertical
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
      },
      // 拖动时是否允许回调
      moveStatus: {
        type: Boolean,
        default: false
      }
    },
    created: function () {
      let mode = ['side', 'vertical']
      if (!this.max && this.max > 0) throw new Error('max must be greater than 0')
      if (!this.mode) throw new Error('not set mode')
      if (mode.indexOf(this.mode) === -1) throw new Error('mode not is default')
      if (this.mode === 'vertical') lang.invert(this.progStyle)
    },
    mounted: function () {
      // 给节点绑定事件
      this.$refs.handle.addEventListener('mousedown', this.down, false)
      // 获得滚动区域宽度
      this.apart = domStyle.get(this.$refs.region, this.modeStyle[this.mode])[0]
      this.handle = domStyle.get(this.$refs.handle, this.modeStyle[this.mode])[0] / 3
      // 初始化控制器位置
      let direct = this.directions[this.mode]
      let roller = this.handleInit[this.mode]
      this.histAnnals = this.value / this.max * 100
      this.handleStyle[roller] = 'calc(0% - ' + this.handle + 'px)'
      this.handleStyle[direct] = 'calc(' + this.histAnnals + '% - ' + this.handle + 'px)'
    },
    watch: {
      value: function () {
        this.handleClass['mu-motioned'] = true
        if (this.value >= this.max) this.handleClass['mu-motioned'] = false
        if (this.drapStatus) return
        // 保留移动距离
        this.histAnnals = this.value / this.max * 100
        let direct = this.directions[this.mode]
        this.handleStyle[direct] = 'calc(' + this.histAnnals + '% - ' + this.handle + 'px)'
      },
      deep: true
    },
    methods: {
      up: function () {
        this.drapStatus = false
        window.removeEventListener('mousemove', this.move, false)
        window.removeEventListener('mouseup', this.up, false)
        this.histAnnals = this.annals
        if (this.mode === 'vertical') this.histAnnals = 100 - this.annals
        // 执行回调
        !this.moveStatus && lang.isFunction(this.rangeCallBack) && this.rangeCallBack(this.max * this.annals / 100)
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
        this.drapStatus = true
        // 获得移动中鼠标位置
        let x = e.pageX
        let y = e.pageY
        if (this.mode === 'side') {
          this.annals = (x - this.x) / this.apart * 100 + this.histAnnals
        } else if (this.mode === 'vertical') {
          this.annals = 100 - ((y - this.y) / this.apart * 100 + this.histAnnals)
        }
        if (this.annals < 0) this.annals = 0
        if (this.annals > 100) this.annals = 100
        let direct = this.directions[this.mode]
        this.handleStyle[direct] = 'calc(' + this.annals + '% - ' + this.handle + 'px)'
        // 执行回调
        this.moveStatus && lang.isFunction(this.rangeCallBack) && this.rangeCallBack(this.max * this.annals / 100)
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
        } else if (this.mode === 'vertical') {
          this.annals = (1 - y / this.apart) * 100
        }
        if (this.annals < 0) this.annals = 0
        if (this.annals > 100) this.annals = 100
        this.histAnnals = this.annals
        if (this.mode === 'vertical') this.histAnnals = 100 - this.annals
        let direct = this.directions[this.mode]
        this.handleStyle[direct] = 'calc(' + this.annals + '% - ' + this.handle + 'px)'
        // 执行回调
        lang.isFunction(this.rangeCallBack) && this.rangeCallBack(this.max * this.annals / 100)
      }
    }
  }

</script>
