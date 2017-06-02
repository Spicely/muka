<style type="text/css">
    ul.table_title {
        background: rgb(49, 49, 49);
    }
    
    ul.table_content {
        background: rgb(171, 163, 163)
    }
    
    ul.mu_edit_table_list {
        display: flex;
        color: white;
    }
    
    li.mu_edit_table_label {
        flex: 1;
        text-align: center;
        line-height: 30px;
    }
</style>

<script type="text/javascript">
    /**  Time 2017/02/22 
     * Name Spicely 
     * email Spicely@outlook.com 
     * Deploy 
     * 提供编辑和查询的功能组件 
     */
    export default {
        name: "edit-table",
        render: function(createElement) {
            let tabList = [];
            // 创建表格头部
            tabList.push(createElement("ul", {
                class: {
                    "mu_edit_table_list": true,
                    "table_title": true
                }
            }, this.header.map((item) => {
                return createElement("li", {
                    class: {
                        "mu_edit_table_label": true
                    },
                    domProps: {
                        innerHTML: item.label || ""
                    }
                });
            })));
            // 创建表格列表
            this.params.map((item) => {
                tabList.push(createElement("ul", {
                    class: {
                        "mu_edit_table_list": true,
                        "table_content": true
                    }
                }, this.header.map((head) => {
                    return createElement("li", {
                        class: {
                            "mu_edit_table_label": true
                        },
                        domProps: {
                            innerHTML: item[head.keyName] || ''
                        }
                    });
                })));
            });
            // 创建表格容器
            return createElement("div", {
                class: {
                    "mu_edit_table_pack": true
                }
            }, tabList);
        },
        props: {
            header: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            params: {
                type: Array,
                default: function() {
                    return [];
                }
            }
        },
        methods: {

        }
    };
</script>