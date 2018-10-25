webpackJsonp([18],{277:function(e,t,o){o(861);var n=o(4)(o(862),o(863),null,null);n.options.__file="D:\\项目\\operate_oss\\src\\views\\system\\menu.vue",n.esModule&&Object.keys(n.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),n.options.functional&&console.error("[vue-loader] menu.vue: functional components are not supported with templates, they should use render functions."),e.exports=n.exports},861:function(e,t){},862:function(e,t,o){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=o(96),a=n(r),s=o(14),l=n(s),i=o(62);t.default={data:function(){var e=this;return{modalAdd:!1,modal_loading:!1,formItem:{parentId:"",name:"",permission:"",href:"",type:"",sort:0,icon:"",remarks:""},data:[{title:"主菜单",loading:!1,render:function(t,o){o.root,o.node,o.data;return t("Row",{style:{display:"inline-block",width:"100%"}},[t("Col",{props:{span:"4"}},[t("span",e.newTree.name)]),t("Col",{props:{span:"4"}},[t("Icon",{props:{type:"information-circled"},style:{marginRight:"10px"}}),t("span",e.newTree.permission)]),t("Col",{props:{span:"4"}},[t("Icon",{props:{type:"ios-keypad"},style:{marginRight:"10px",marginLeft:"10px"}}),t("span",e.newTree.type)]),t("Button",{props:(0,a.default)({},e.buttonProps,{icon:"ios-plus-empty",type:"primary"}),style:{width:"52px"},on:{click:function(){e.append(e.newTree.id)}}})])},children:[]}],buttonProps:{type:"ghost",size:"small"},trees:[],newTree:{}}},methods:{getTrees:function(){var e=this;this.$Spin.show(),l.default.ajax.get(l.default.baseUrl+"/system/menu/list").then(function(t){console.log(t),e.$Spin.hide(),t.data.status==i.ERR_OK?(e.trees=t.data.data,e.initTrees()):e.$Message.error(t.data.msg)}).catch(function(e){console.log(e)})},initTrees:function(){var e=this.trees.findIndex(function(e){return-1===e.parentId});this.newTree=(0,a.default)({},this.trees[e],{children:[]}),this.appendTree(this.newTree)},appendTree:function(e){var t=this;this.trees.map(function(o){o.parentId===e.id&&(o=(0,a.default)({},o,{children:[]}),e.children.push(o),t.appendTree(o))})},renderContent:function(e,t){var o=this,n=(t.root,t.node,t.data);return e("Row",{style:{display:"inline-block",width:"100%"}},[e("Col",{props:{span:"4"}},[e("span",n.name)]),e("Col",{props:{span:"4"}},[e("Icon",{props:{type:"information-circled"},style:{marginRight:"10px"}}),e("span",n.permission)]),e("Col",{props:{span:"4"}},[e("Icon",{props:{type:"ios-keypad"},style:{marginRight:"10px",marginLeft:"10px"}}),e("span",n.type)]),e("Button",{props:(0,a.default)({},this.buttonProps,{icon:"ios-plus-empty",type:"success"}),style:{marginRight:"8px"},on:{click:function(){o.append(n.id)}}})])},loadData:function(e,t){t(this.newTree.children)},append:function(e){var t=this;this.modalAdd?(t.modal_loading=!0,l.default.ajax.get(l.default.baseUrl+"/system/menu/add",{params:t.formItem}).then(function(e){e.data.status==i.ERR_OK?(t.$Message.success("添加成功！"),t.modal_loading=!1,t.modalAdd=!1,window.location.reload()):(t.$Message.error(e.data.msg),t.modal_loading=!1)}).catch(function(e){console.log(e)})):(this.modalAdd=!0,this.formItem.parentId=e)}},mounted:function(){this.getTrees()}}},863:function(e,t,o){e.exports={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"menu"},[o("Tree",{ref:"tree",attrs:{data:e.data,render:e.renderContent,"show-checkbox":"",multiple:"","load-data":e.loadData}}),e._v(" "),o("Modal",{attrs:{width:"500",height:"400"},model:{value:e.modalAdd,callback:function(t){e.modalAdd=t},expression:"modalAdd"}},[o("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[o("Icon",{attrs:{type:"information-circled"}}),e._v(" "),o("span",[e._v("添加菜单")])],1),e._v(" "),o("div",{staticStyle:{"text-align":"center"}},[o("Form",{attrs:{model:e.formItem,"label-width":80}},[o("FormItem",{attrs:{label:"名称"}},[o("Input",{attrs:{placeholder:"名称"},model:{value:e.formItem.name,callback:function(t){e.$set(e.formItem,"name",t)},expression:"formItem.name"}})],1),e._v(" "),o("FormItem",{attrs:{label:"排序"}},[o("InputNumber",{staticStyle:{width:"100%"},attrs:{max:10,min:1},model:{value:e.formItem.sort,callback:function(t){e.$set(e.formItem,"sort",t)},expression:"formItem.sort"}})],1),e._v(" "),o("FormItem",{attrs:{label:"链接"}},[o("Input",{attrs:{placeholder:"链接"},model:{value:e.formItem.href,callback:function(t){e.$set(e.formItem,"href",t)},expression:"formItem.href"}})],1),e._v(" "),o("FormItem",{attrs:{label:"图标"}},[o("Input",{staticStyle:{width:"80%"},attrs:{placeholder:"图标"},model:{value:e.formItem.icon,callback:function(t){e.$set(e.formItem,"icon",t)},expression:"formItem.icon"}}),e._v(" "),o("a",{attrs:{href:"http://ionicons.com/",title:"",target:"blank"}},[e._v("图标库")])],1),e._v(" "),o("FormItem",{attrs:{label:"类型",placeholder:"类型"}},[o("Select",{model:{value:e.formItem.type,callback:function(t){e.$set(e.formItem,"type",t)},expression:"formItem.type"}},[o("Option",{attrs:{value:"menu"}},[e._v("菜单")]),e._v(" "),o("Option",{attrs:{value:"button"}},[e._v("按钮")]),e._v(" "),o("Option",{attrs:{value:"view"}},[e._v("视图")])],1)],1),e._v(" "),o("FormItem",{attrs:{label:"权限"}},[o("Input",{attrs:{placeholder:"权限"},model:{value:e.formItem.permission,callback:function(t){e.$set(e.formItem,"permission",t)},expression:"formItem.permission"}})],1),e._v(" "),o("FormItem",{attrs:{label:"备注"}},[o("Input",{attrs:{placeholder:"备注"},model:{value:e.formItem.remarks,callback:function(t){e.$set(e.formItem,"remarks",t)},expression:"formItem.remarks"}})],1)],1)],1),e._v(" "),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("Button",{attrs:{type:"success",size:"large",long:"",loading:e.modal_loading},on:{click:e.append}},[e._v("确认添加")])],1)])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});