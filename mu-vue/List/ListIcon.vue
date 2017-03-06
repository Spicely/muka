<style>
    .list-icon-pack {
        padding: 5px 0;
    }
    
    ul.list-icon-line {
        display: flex;
        padding: 10px 0;
    }
    
    li.list-icon-list {
        flex: 1;
    }
    li img.list-icon-img{
        display: block;
        margin: auto;
    }
    li div.list-icon-lable{
        text-align: center;
    }
</style>
<script>
    import music from "../../../assets/icon/Cloud_Music.png";
    /**
     *  time 2017/03/03
     *  name Spicely
     *  email Spicely@outlook.com
     */
    export default {
        name: "List-Icon",
        render: function(createElement) {
            let iconList = [];
            if (this.num) {
                let line = Math.ceil(this.params.length / this.num);
                for (var i = 0; i < line; i++) {
                    iconList.push(createElement("ul", {
                        class: {
                            "list-icon-line": true
                        }
                    }, this.params.map((item, key) => {
                        if (key >= i * this.num && key < (i * this.num + this.num)) {
                            return createElement("li", {
                                class: {
                                    "list-icon-list": true
                                }
                            }, [createElement("img", {
                                class: {
                                    "list-icon-img": true
                                },
                                attrs: {
                                    src: item.src
                                }
                            }), createElement("div", {
                                class: {
                                    "list-icon-lable": true
                                }
                            })]);
                        }
                    })));
                }
            } else {
                iconList.push(createElement("ul", {
                    class: {
                        "list-icon-line": true
                    }
                }, this.params.map((item, key) => {
                    return createElement("li", {
                        class: {
                            "list-icon-list": true
                        }
                    });
                })));
            }
            return createElement("div", {
                class: {
                    "list-icon-pack": true
                }
            }, iconList);
        },
        props: {
            num: {
                type: Number,
                default: 0
            },
            params: {
                type: Array,
                default: () => []
            }
        },
        methods: {

        }
    }
</script>