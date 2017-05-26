<template>
  <div class="muMaskLayer" :class="maskStyle">
    <slot></slot>
  </div>
</template>
<style lang="less">
  .muMaskLayer {
    position: fixed;
    z-index: 9999;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    transition: all 0.3s ease-out;
  }

  .muMaskLayerHide {
    width: 0;
    height: 0;
    border-radius: 50%;
  }

</style>
<script>
  /**
   *  time 2017/04/11
   *  name Spicely
   *  email Spicely@outlook.com
   *  docs
   *      提供遮罩层位于整个屏幕最上方
   */
  export default {
    name: 'MaskLayer',
    data: () => {
      return {
        maskStyle: {
          // 隐藏动画样式
          'muMaskLayerHide': false
        }
      }
    },
    methos: {
      hide: function () {}
    }
  }

</script>
