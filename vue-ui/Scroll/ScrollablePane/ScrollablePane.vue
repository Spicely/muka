<template>
  <div class="mu-scrollablePane" style="position:absolute;overflow:hidden;height:500px">
    <div class="mu-scrollableViewContainer" :style="containerStyle" ref="container">
      <div class="mu-scrollableViewProgressRight" v-if="showRight" style="position:absolute"></div>
      <div class="mu-scrollableViewProgressBottom" v-if="showBottom" style="position:absolute"></div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import lang from 'muka/Base/lang'
  const right = ['auto', 'right']
  const bottom = ['auto', 'bottom']
  export default {
    name: 'ScrollablePane',
    created: function () {
      this.showRight = this.progress && lang.hash(right, this.overflow)
      this.showBottom = this.progress && lang.hash(bottom, this.overflow)
    },
    mounted: function () {
      // 监听拖拽
      this.$refs.container.addEventListener('touchstart', this.start)
      this.$refs.container.addEventListener('touchmove', this.move)
      this.$refs.container.addEventListener('touchend', this.end)
    },
    data: function () {
      return {
        containerStyle: {
          position: 'relative',
          top: '0px',
          left: '0px'
        },
        showRight: false,
        showBottom: false
      }
    },
    props: {
      progress: {
        type: Boolean,
        default: false
      },
      overflow: {
        type: String,
        default: 'auto'
      }
    },
    methods: {
      start: function (e) {
        // 记录当前位置
        let touch = e.touches[0]
        this.$x = touch.clientX
        this.$y = touch.clientY
      },
      move: function (e) {
        // 计算移动距离
        let touch = e.touches[0]
        this.$toX = touch.clientX
        this.$toY = touch.clientY
        let x = -(this.$x - this.$toX)
        let y = -(this.$y - this.$toY)
        this.containerStyle.top = y + (this.$historyY || 0) + 'px'
        this.containerStyle.left = x + (this.$historyX || 0) + 'px'
      },
      end: function (e) {
        if (parseInt(this.containerStyle.top) > 0) {
          this.containerStyle.top = 0
        }
        if (parseInt(this.containerStyle.left) > 0) {
          this.containerStyle.left = 0
        }
        // 保留历史距离
        this.$historyX = parseInt(this.containerStyle.left)
        this.$historyY = parseInt(this.containerStyle.top)
      }
    }
  }

</script>
