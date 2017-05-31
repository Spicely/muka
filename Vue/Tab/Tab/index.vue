<template>
  <div class="muTab" :class="style" @click="listenHandle">
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
      }
    },
    methods:{
        listenHandle:function(){
            console.log(this.$children)
        }
    }
  }

</script>
