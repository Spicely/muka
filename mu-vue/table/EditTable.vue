/** * Time 2017/02/22 * Name Spicely * email Spicely@outlook.com * Deploy * 提供编辑和查询的功能组件 */
<style type="text/css">
    ul.mu_edit_table_header {
        display: flex;
        background: rgb(49, 49, 49);
        color: white;
    }
    
    li.mu_edit_table_label {
        flex: 1;
        text-align: center;
        line-height: 30px;
    }
</style>

<script type="text/javascript">
    export default {
        name: "edit-table",
        render: function(createElement) {
            let tabList = [];
            // 创建表格头部
            tabList.push(createElement("ul", {
                class: {
                    "mu_edit_table_header": true
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
                        "mu_edit_table_list": true
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