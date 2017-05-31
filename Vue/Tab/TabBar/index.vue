<style lang="less">
  .muTabBar {
    position: relative;
    top: 0;
    left: 0;
    padding: 5px;
    >div {
      text-align: center;
      width: 100%;
      height: 60%;
      display: block;
      line-height: 20px;
      img {
        display: block;
        margin: 0 auto;
        height: 100%;
      }
    }
    .barLable {
      height: 40%;
    }
    .none {
      display: none;
    }
  }

  .selected {
    color: red;
  }

</style>

<script>
  import lang from 'muka/Base/lang'
  export default {
    name: 'Tab-Bar',
    created: function(){},
    // 初始化页面 
    // h 为createElement
    render: function (h) {
      let arr = []
      // 如果传递了图片
      if (this.$slots.icon) {
        arr.push(h('div', {
          class: this.iconStyle
        }, this.$slots.icon))
      }
      if (this.$slots.replaceIcon) {
        arr.push(h('div', {
          class: this.replaceIconStyle
        }, this.$slots.replaceIcon))
      }
      console.log(arr)
      // 如果传递了文字
      if (this.$slots.label) {
        arr.push(h('div', {
          class: 'barLable'
        }, this.$slots.label))
      }
      return h('div', {
        class: this.barStyle,
        on: {
          click: this.handle
        }
      }, arr)
    },
    watch: {
      selected: function (curVal) {
        if (curVal) {
          this.barStyle['selected'] = true
          if (this.$slots.replaceIcon) {
            this.iconStyle['none'] = true
            this.replaceIconStyle['none'] = false
          }
        } else {
          this.barStyle['selected'] = false
          this.iconStyle['none'] = false
          this.replaceIconStyle['none'] = true
        }
      }
    },
    data: function () {
      return {
        selected: false,
        barStyle: {
          'muTabBar': true,
          'selected': this.selected
        },
        iconStyle: {
          'barIcon': true,
          'none': this.$slots.replaceIcon ? this.selected : false
        },
        replaceIconStyle: {
          'barIcon': true,
          'none': !this.selected
        }
      }
    },
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    methods: {
      handle: function () {
        this.$parent.setSelected(this._uid)
      }
    }
  }

</script>
