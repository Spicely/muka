<template>
    <div class="mu-image-alone-pack">
        <img :src="src" draggable="false" />
    </div>
</template>
<style lang="less">
.mu-image-alone-pack {
    img {
        display: block;
    }
}
</style>
<script>
/**
 *  time 2017/03/20
 *  name Spicely
 *  email Spicely@outlook.com
 *  docs
 *      用于提供单个图片加载
 */
export default {
    name: 'image-alone',
    props: {
        src: {
            type: String,
            default: ''
        }
    }
}
</script>
