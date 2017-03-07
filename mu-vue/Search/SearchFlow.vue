<template>
    <div>
        <img :src="url">
    </div>
</template>

<script>
    import search from "../../icon/search.png";
    /**
     *  time    2017/03/07
     *  name    Spicely
     *  email   Spicely@outlook.com
     */
    export default {
        name: "seach-flow",
        data: () => {
            url: search
        }
    }
</script>