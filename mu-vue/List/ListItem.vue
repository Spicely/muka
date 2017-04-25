<style>
  .mu-list-item-pack {
    display: flex;
  }

</style>

<script>
  /**
   *  time    2017/03/09
   *  name    Spicely
   *  email   Spicely@outlook.com
   */
  import lang from '../../mu/base/lang'
  export default {
    name: 'list-item',
    render: function (createElement) {
      let iconList = []
      if (this.num) {
        let line = Math.ceil(this.params.length / this.num)
        Array.apply(null, {
          length: line
        }).map((item, i) => {
          iconList.push(createElement('ul', {
            class: {
              'mu-list-item-line': true
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
              }, [createElement('div', {
                class: {
                  'mu-list-icon-lable': true
                },
                innerHTML: this.bond ? item[this.bond] : item
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
          }, [createElement('div', {
            class: {
              'mu-list-icon-lable': true
            },
            innerHTML: this.bond ? item[this.bond] : item
          })])
        })))
      }
      return createElement('div', {
        class: {
          'mu-list-item-pack': true
        }
      }, iconList)
    },
    props: {
      params: {
        type: Array,
        default: []
      },
      num: {
        type: Number,
        default: 0
      },
      bond: {
        type: String,
        default: ''
      }
    }
  }

</script>
