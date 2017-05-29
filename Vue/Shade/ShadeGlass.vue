<template>
    <div class="mu-shade-pack">
        <slot></slot>
    </div>
</template>
<style lang="less">
.mu-shade-pack {
    position: fixed;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
}

.mu-shade-pack::before {
    content: '';
    position: absolute;
top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    filter: blur(5px);
    filter: progid: DXImageTransform.Microsoft.Blur(PixelRadius=4, MakeShadow=false);
    margin: -30px;
}
</style>
<script>
/**
 *  time 2017/04/25
 *  name Spicely
 *  email Spicely@outlook.com
 *  docs
 *      用于提供遮罩层 毛玻璃效果
 */
export default {
    name: 'shade-glass'
}
</script>
