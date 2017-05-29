<template>
    <div class="mu-tab-custom-pack">
        <tab-bar>
            <div class="mu-tab-custom-user">
                <slot name="img"></slot>
            </div>
            <div class="mu-tab-custom-search">
                <slot name="search"></slot>
            </div>
            <slot></slot>
        </tab-bar>
    </div>
</template>
<style>
    .mu-tab-custom-pack {
        background-color: rgb(38, 185, 154);
        padding: 5px 0;
    }
    
    .mu-tab-custom-user {
        height: 40px;
        width: 40px;
        margin-left: 10px;
        display: inline-block;
    }
    
    .mu-tab-custom-user img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
    
    .mu-tab-custom-search {
        height: 40px;
        width: 40px;
        margin-right: 10px;
        float: right;
        display: inline-block;
    }
</style>


<script>
    import TabBar from "../TabBar";
    export default {
        name: 'tab-custom',
        components: {
            'tab-bar': TabBar
        }
    }
</script>