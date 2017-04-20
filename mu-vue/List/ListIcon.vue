<style>
  .mu-list-icon-pack {
    padding: 5px 0;
  }

  ul.mu-list-icon-line {
    display: flex;
  }

  li.mu-list-icon-list {
    flex: 1;
  }

  li img.mu-list-icon-img {
    display: block;
    margin: auto;
  }

  li div.mu-list-icon-lable {
    text-align: center;
  }

</style>
<script>
  /**
   *  time 2017/03/03
   *  name Spicely
   *  email Spicely@outlook.com
   *  docs
   *      @params [{icon: 'xxx', label: 'xxx', number: 0}]
   *      @num Number
   */
  import lang from '../../mu/base/lang'
  export default {
    name: 'list-icon',
    render: function (createElement) {
      let iconList = []
      if (this.num) {
        let line = Math.ceil(this.params.length / this.num)
        Array.apply(null, {
          length: line
        }).map((item, i) => {
          iconList.push(createElement('ul', {
            class: {
              'mu-list-icon-line': true
            }
          }, this.params.map((item, key) => {
            if (key >= i * this.num && key < (i * this.num + this.num)) {
              let classes = {
                'mu-list-icon-list': true
              }
              if (lang.isObject(classes)) {
                Object.assign(classes, item.class)
              }
              return createElement('li', {
                class: classes,
                on: {
                  click: item.click || function () {}
                }
              }, [createElement('img', {
                class: {
                  'mu-list-icon-img': true
                },
                attrs: {
                  src: item.icon
                }
              }), createElement('div', {
                class: {
                  'mu-list-icon-lable': true
                },
                innerHTML: item.label
              }), createElement('div', {
                class: {
                  'mu-list-icon-number': true
                },
                innerHTML: item.number
              })])
            }
          })))
        })
      } else {
        iconList.push(createElement('ul', {
          class: {
            'mu-list-icon-line': true
          }
        }, this.params.map((item, key) => {
          let classes = {
            'mu-list-icon-list': true
          }
          if (lang.isObject(classes)) {
            Object.assign(classes, item.class)
          }
          return createElement('li', {
            class: classes,
            on: {
              click: item.click || function () {}
            },
            click: item.click
          }, [createElement('img', {
            class: {
              'mu-list-icon-img': true
            },
            attrs: {
              src: item.icon
            }
          }), createElement('div', {
            class: {
              'mu-list-icon-lable': true
            },
            innerHTML: item.label || ''
          }), createElement('div', {
            class: {
              'mu-list-icon-number': true
            },
            innerHTML: item.number
          })])
        })))
      }
      return createElement('div', {
        class: {
          'mu-list-icon-pack': true
        }
      }, iconList)
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
