<template>
    <li class="mu-list-item-pack">
        <div class="mu-list-item-icon">
            <slot name="icon"></slot>
        </div>
        <div class="mu-list-item-stance"></div>
    </li>
</template>

<style>
    .mu-list-item-pack {
        display: flex;
    }
    
    .mu-list-item-icon {
        display: inline-block;
        height: 40px;
        width: 40px;
    }
    /*.mu-list-item-icon img {
        width: 100%;
        height: 100%;
    }    */
    
    .mu-list-item-stance {
        filter: 1;
        height: 40px;
    }
</style>

<script>
    /**
     *  time    2017/03/09
     *  name    Spicely
     *  email   Spicely@outlook.com
     */
    export default {
        name: "list-item"
    }
</script>