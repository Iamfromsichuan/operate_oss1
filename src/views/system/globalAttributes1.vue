<template>
    <Tree :data="data5" :render="renderContent"></Tree>
</template>
<script>
  import util from '@/libs/util';
  import {ERR_OK} from '@/config/config';
  export default {
    data () {
      return {
        trees:[],
        data5: [
          {
            title: 'parent 1',
            expand: true,
            render: (h, { root, node, data }) => {
              return h('Row', {
                style: {
                  display: 'inline-block',
                  width: '100%'
                }
              }, [
                h('Col',{
                  props: {
                    span: '4'
                  }
                }, [h('span', '我的名字')]),
                h('Col', {
                  props: {
                    span: '4'
                  }
                }, [
                  h('Icon', {
                    props: {
                      type: 'information-circled'
                    },
                    style: {
                      marginRight: '10px'
                    }
                  }),
                  h("span", '不要1111')
                ]),
                h('Col', {
                  props: {
                    span: '4'
                  }
                }, [
                  h('Icon', {
                    props: {
                      type: 'ios-keypad'
                    },
                    style: {
                      marginRight: '10px',
                      marginLeft: '10px'
                    }
                  }),
                  h("span", '问')
                ]),
                h('Button', {
                  props: Object.assign({}, this.buttonProps, {
                    icon: 'ios-plus-empty',
                    type: 'primary'
                  }),
                  style: {
                    width: '52px'
                  },
                  on: {
                    click: () => { this.append(this.newTree.id) }
                  }
                })
              ]);
            },
            children: [

            ]
          }
        ],
        buttonProps: {
          type: 'default',
          size: 'small',
        }
      }
    },
    methods: {
      getTrees () {
        var _that = this
        this.$Spin.show();
        util.ajax.get(util.baseUrl + '/system/data/dictionary/list')
          .then(function(res){
            _that.$Spin.hide();
            if(res.status == ERR_OK) {
              _that.trees = res.data;
              let arr = _that.data5[0].children;
              //提取没有出现过的dictionaryType
              let common = '';
              //第一次遍历数据源trees  提供共同特征作dictionaryType为一级目录
              _that.trees.forEach(function (item,i) {
                let name = item.dictionaryType;
                if(common.indexOf(item.dictionaryType)  < 0 ) {
                  let obj = Object.assign({},item,{
                    children:[],
                    expand: true,
                    description: "",
                    dictionaryCode: name,
                    dictionaryName: name,
                  });
                  arr.push(obj);
                  common = common + item.dictionaryType;
                  obj = null;
                }
              });
              //第二次遍历数据源  提取一级目录所属的  二级元素
              _that.trees.forEach(function (item, i) {
                //item.dictionaryType ===
                for( let i =0 ;i < arr.length ; i++ ) {
                  if(arr[i].dictionaryType === item.dictionaryType) {
                    let obj = Object.assign({},item,{
                      children:[],
                      expand: true
                    });
                    arr[i].children.push(item);
                    obj = null;
                  }
                }
              })
              console.log(arr)
            }else {
              _that.$Message.error(res.toString())
            }
          })
          .catch(function(res){
            console.log(res.msg)
          });
      },
      getFirstChild() {//获取一级子目录
        let arr = this.data5.children;
        //提取没有出现过的dictionaryType
        let common = '';
        //遍历数据源trees  提供共同特征作dictionaryType为一级目录
        this.trees.filter(function (item,i) {
          if(common.indexOf(item.dictionaryType)  < 0 ) {
            let obj = Object.assign({},item,{
              children:[],
              expand: true,
              description: "",
              dictionaryCode: name,
              dictionaryName: name,
            });
            arr.push(obj);
            common = common + item.dictionaryType;
            obj = null;
          }
        });
      },
      renderContent (h, { root, node, data }) {
        return h('Row', {
          style: {
            display: 'inline-block',
            width: '100%'
          }
        }, [
          h('Col',{
            props: {
              span: '4'
            }
          }, [h('span',data.dictionaryType)]),
          h('Col', {
            props: {
              span: '4'
            }
          }, [
            h('Icon', {
              props: {
                type: 'information-circled'
              },
              style: {
                marginRight: '10px'
              }
            }),
            h("span", data.dictionaryName)
          ]),
          h('Col', {
            props: {
              span: '4'
            }
          }, [
            h('Icon', {
              props: {
                type: 'ios-keypad'
              },
              style: {
                marginRight: '10px',
                marginLeft: '10px'
              }
            }),
            h("span", data.dictionaryCode)//description
          ]),
          h('Col', {
            props: {
              span: '4'
            }
          }, [
            h('Icon', {
              props: {
                type: 'ios-keypad'
              },
              style: {
                marginRight: '10px',
                marginLeft: '10px'
              }
            }),
            h("span", data.description)//description
          ]),
          h('Button', {
            props: Object.assign({}, this.buttonProps, {
              icon: 'ios-plus-empty',
              type: 'primary'
            }),
            style: {
              width: '52px'
            },
            on: {
              click: () => { this.append('') }
            }
          })
        ]);
      },
      append (data) {
        const children = data.children || [];
        children.push({
          title: 'appended node',
          expand: true
        });
        this.$set(data, 'children', children);
      },
      remove (root, node, data) {
        const parentKey = root.find(el => el === node).parent;
        const parent = root.find(el => el.nodeKey === parentKey).node;
        const index = parent.children.indexOf(data);
        parent.children.splice(index, 1);
      }
    },
    created() {
      this.getTrees();
    }
  }
</script>
