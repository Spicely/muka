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
  }

</style>

<script>
  export default {
    name: 'Tab-Bar',
    // 初始化页面 
    // h 为createElement
    render: function (h) {
      let arr = []
      // 如果传递了图片
      if (this.$slots.icon) {
        arr.push(h('div', {
          class: 'barIcon'
        }, this.$slots.icon))
      }
      // 如果传递了文字
      if (this.$slots.label) {
        arr.push(h('div', {
          class: 'barLable'
        }, this.$slots.label))
      }
      return h('div', {
        class: 'muTabBar',
        on:{
            click: ()=>{
                console.log(this)
            }
        }
      }, arr)
    }
  }

</script>
