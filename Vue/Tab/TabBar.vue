<style>
  .mu-tab-bar-pack {
    width: 100%;
    height: 40px;
  }

  .mu-tab-bar-fixed {
    position: fixed;
    bottom: 0;
  }

</style>


<script>
  /**
   *  time    2017/03/07
   *  name    Spicely
   *  email   Spicely@outlook.com
   *  @param fixed    [Boolean]    把位置定位在底部
   *          用于提供基础使用的盒子
   */
  export default {
    name: 'tab-bar',
    render: function (createElement) {
      return createElement('div', {
        class: {
          'mu-tab-bar-pack': true,
          'mu-tab-bar-fixed': this.fixed
        }
      }, [
        this.$slots.default
      ])
    },
    props: {
      fixed: {
        type: Boolean,
        default: false
      }
    }
  }

</script>
