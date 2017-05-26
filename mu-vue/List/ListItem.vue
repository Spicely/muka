<style lang="less">
  .muListItem {
    height: 30px;
    display: flex;
    border-bottom: 1px solid #e5e5e5;
    .muListDrop {
      height: 22px;
      width: 30px;
      margin: 4px;
      float: right;
      cursor: pointer;
    }
    .muListLabel {
      flex: 1;
    }
  }

  .muVariableHeight {
    height: auto;
  }

</style>
<script>
  /**
   *   time 2017/04/26
   *   name Spicely
   *   email Spicely@outlook.com
   */
  import lang from '../../mu/base/lang'
  export default {
    render: function (createElement) {
      let option = []
      // 内容节点
      option.push(createElement('div', {
        class: {
          'muListLabel': true
        },
        domProps: {
          innerHTML: this.label
        },
        on: {
          click: () => {
            lang.isFunction(this.event) && this.event()
          }
        }
      }, [this.$slots.default]))
      // 拖动节点
      if (this.drop) {
        option.push(createElement('div', {
          class: {
            'muListDrop': true
          }
        }))
      }
      return createElement('li', {
        class: {
          'muListItem': true
        }
      }, option)
    },
    name: 'ListItem',
    props: {
      drop: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ''
      },
      event: {
        default: function () {}
      }
    }
  }

</script>
