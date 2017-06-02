<template>
  <div class="muTab" :class="style">
    <slot></slot>
  </div>
</template>
<style lang="less">
  .muTab {
    width: 100%;
    height: 50px;
    display: flex;
    background: red;
    overflow: hidden;
  }

</style>

<script>
  import 'muka/Less/index.less'
  export default {
    name: 'Tab',
    created: function () {
      this.init()
    },
    data: function () {
      return {
        style: {
          'fixed': this.fixed
        }
      }
    },
    props: {
      fixed: {
        type: Boolean,
        default: false
      },
      selectId: {
        type: String,
        default: ''
      }
    },
    methods: {
      init: function () {
        if (this.selectId) {
          this.$children.forEach(function (VueComponent) {
            if (VueComponent.id !== this.selectId) {
              VueComponent.selected = false
            } else {
              VueComponent.selected = true
            }
          }, this);
        }
      },
      setSelected: function (id) {
        this.$children.forEach(function (VueComponent) {
          if (VueComponent._uid !== id) {
            VueComponent.selected = false
          } else {
            VueComponent.selected = true
          }
        }, this);
      }
    }
  }

</script>
