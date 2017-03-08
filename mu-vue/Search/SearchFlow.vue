<template>
    <div class="mu-search-flow-pack">
        <div class="mu-search-flow-pict" @click="show">
            <img :src="searchUrl" />
        </div>
        <div class="mu-search-flow-style" :class="classObject" @click.self="hide">
            <div class="mu-search-flow-tool">
                <div class="mu-search-flow-case mu-search-flow-back" @click="hide">
                    <img :src="backUrl" />
                </div>
                <div class="mu-search-flow-case mu-search-flow-scan">
                    <img :src="scanUrl" />
                </div>
                <div class="mu-float mu-search-flow-input">
                    <div class="mu-search-flow-close" :class="closeClass" @click="clean">
                        <img :src="searchCloseUrl" />
                    </div>
                    <input type="text" :placeholder="placeholder"  v-model="value" />
                </div>
                <div class="mu-search-flow-case mu-search-flow-scan" @click="search">
                    <img :src="searchProUrl" />
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .mu-search-flow-pack {
        width: 100%;
    }
    
    .mu-search-flow-pict {
        width: 100%;
    }
    
    .mu-search-flow-pict img {
        display: block;
        width: 28px;
        height: 28px;
        margin: 0 auto;
        margin-top: 6px;
    }
    
    .mu-search-flow-style {
        height: 100%;
        width: 98%;
        position: fixed;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.3);
        padding: 1%;
    }
    
    .mu-search-flow-hide {
        display: none;
    }
    
    .mu-search-flow-show {
        display: block;
    }
    
    .mu-search-flow-style .mu-search-flow-tool {
        width: 100%;
        height: 40px;
        background-color: white;
    }
    
    .mu-search-flow-case {
        float: left;
        width: 40px;
        height: 40px;
    }
    
    .mu-search-flow-case img {
        display: block;
        width: 28px;
        height: 28px;
        margin: 0 auto;
        margin-top: 6px;
    }
    
    .mu-search-flow-input {
        width: 65.8%;
        height: 40px;
        position: relative;
    }
    
    .mu-search-flow-input input {
        width: 100%;
        border: none;
        padding: 5px 0;
        line-height: 30px;
        outline: none
    }
    
    .mu-search-flow-close {
        width: 20px;
        height: 20px;
        position: absolute;
        top: 10px;
        right: 2px;
    }
    
    .mu-search-flow-close img {
        width: 100%;
        height: 100%;
    }
</style>

<script>
    import search from "../../icon/search.png";
    import back from "../../icon/back.png";
    import scan from "../../icon/scan.png";
    import searchPro from "../../icon/searchPro.png";
    import searchClose from "../../icon/search-close.png"

    import lang from "../../mu/base/lang";
    /**
     *  time    2017/03/07
     *  name    Spicely
     *  email   Spicely@outlook.com
     */
    export default {
        name: "search-flow",
        props: {
            placeholder: {
                type: String,
                default: "输入要查找的内容"
            }
        },
        data: () => {
            return {
                searchUrl: search,
                backUrl: back,
                scanUrl: scan,
                searchProUrl: searchPro,
                searchCloseUrl: searchClose,
                value: "",
                classObject: {
                    "mu-search-flow-show": false,
                    "mu-search-flow-hide": true
                },
                closeClass: {
                    "mu-none": true
                }
            }
        },
        watch: {
            value: function(value) {
                if (value.length) {
                    this.closeClass["mu-none"] = false;
                } else {
                    this.closeClass["mu-none"] = true;
                }
            }
        },
        methods: {
            show: function() {
                this.classObject = lang.taskBack(this.classObject);
            },
            hide: function() {
                this.classObject = lang.taskBack(this.classObject);
            },
            clean: function() {
                this.value = "";
            },
            search: function() {
                console.log(1);
            }
        }
    }
</script>