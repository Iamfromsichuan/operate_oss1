webpackJsonp([7],{278:function(e,t,n){n(866);var a=n(4)(n(867),n(868),null,null);a.options.__file="D:\\项目\\operate_oss\\src\\views\\system\\role.vue",a.esModule&&Object.keys(a.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),a.options.functional&&console.error("[vue-loader] role.vue: functional components are not supported with templates, they should use render functions."),e.exports=a.exports},391:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.editMixin={computed:{msgTitle:function(){return this.if_add?"新增":"编辑"},msgEdit:function(){return this.if_add?"确认添加":"确认修改"},editType:function(){return this.if_add?"success":"primary"}},data:function(){return{if_add:!0,modalEdit:!1,modal_loading:!1}}}},866:function(e,t){},867:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(96),i=a(o),s=n(14),d=a(s),r=n(62),l=n(391);t.default={mixins:[l.editMixin],data:function(){var e=this;return{dataLoading:!1,columns:[{title:"id",key:"id"},{title:"角色名",key:"name"},{title:"操作",render:function(t,n){return t("Button",{props:{type:"primary",icon:"edit"},on:{click:function(){e.editInfo.id=n.row.id,e.editInfo.name=n.row.name,e.modalEdit=!0,e.if_add=!1,e.getTrees(n.row.id)}}},"编辑")}}],data:[],editInfo:{id:"",name:"",menuIds:[]},treeData:[{title:"主菜单",loading:!1,render:function(t,n){n.root,n.node,n.data;return t("Row",{style:{display:"inline-block",width:"100%"}},[t("Col",{props:{span:"4"}},[t("span",e.newTree.name)])])},children:[]}],buttonProps:{type:"ghost",size:"small"},trees:[],newTree:{}}},methods:{getTrees:function(e){this.treeData=[];var t=this;d.default.ajax.get(d.default.baseUrl+"/system/role/menu/list",{params:{roleId:e}}).then(function(e){e.data.status==r.ERR_OK?(t.trees=e.data.data,t.initTrees(),t.treeData=[{title:"主菜单",loading:!1,render:function(e,n){n.root,n.node,n.data;return e("Row",{style:{display:"inline-block",width:"100%"}},[e("Col",{props:{span:"4"}},[e("span",t.newTree.name)])])},children:[]}]):t.$Message.error(e.data.msg)}).catch(function(e){console.log(e)})},initTrees:function(){var e=this.trees.findIndex(function(e){return-1===e.parentId});this.newTree=(0,i.default)({},this.trees[e],{children:[],expand:!0}),this.appendTree(this.newTree)},appendTree:function(e){var t=this;this.trees.map(function(n){n.parentId===e.id&&(n=(0,i.default)({},n,{children:[],expand:!0,checked:1==n.flage}),e.children.push(n),t.appendTree(n))})},renderContent:function(e,t){t.root,t.node;return e("Row",{style:{display:"inline-block",width:"100%"}},[e("Col",{props:{span:"4"}},[e("span",t.data.name)])])},loadData:function(e,t){t(this.newTree.children)},getDatas:function(){var e=this;this.dataLoading=!0,d.default.ajax.get(d.default.baseUrl+"/system/role/list").then(function(t){e.dataLoading=!1,t.data.status==r.ERR_OK?e.data=t.data.data:e.$Message.error(t.data.msg)}).catch(function(e){console.log(e)})},addShow:function(){this.modalEdit=!0,this.if_add=!0,this.editInfo={name:"",menuIds:[]},this.getTrees(0)},edit:function(){var e=this,t=this;this.editInfo.menuIds=[],this.$refs.tree.getCheckedNodes().forEach(function(t){e.editInfo.menuIds.push(t.id)});var n=this.if_add?"/system/role/add":"/system/role/edit";this.modal_loading=!0;var a=new URLSearchParams;a.append("id",this.editInfo.id||""),a.append("name",this.editInfo.name),a.append("menuIds",this.editInfo.menuIds),d.default.ajax.post(d.default.baseUrl+n,a).then(function(e){t.modal_loading=!1,e.data.status==r.ERR_OK?(t.$Message.success("操作成功!"),t.modalEdit=!1,t.getDatas()):t.$Message.error(e.data.msg)}).catch(function(e){console.log(e)})}},mounted:function(){this.getDatas()}}},868:function(e,t,n){e.exports={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"role"},[n("Row",{attrs:{type:"flex",justify:"end"}},[n("Button",{attrs:{type:"success",icon:"plus"},on:{click:e.addShow}},[e._v("新增角色")])],1),e._v(" "),n("br"),e._v(" "),n("Table",{attrs:{border:"",columns:e.columns,data:e.data,loading:e.dataLoading}}),e._v(" "),n("Modal",{attrs:{width:"500"},model:{value:e.modalEdit,callback:function(t){e.modalEdit=t},expression:"modalEdit"}},[n("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[n("Icon",{attrs:{type:"information-circled"}}),e._v(" "),n("span",[e._v(e._s(e.msgTitle))])],1),e._v(" "),n("div",{staticStyle:{"text-align":"center"}},[n("Input",{model:{value:e.editInfo.name,callback:function(t){e.$set(e.editInfo,"name",t)},expression:"editInfo.name"}},[n("span",{attrs:{slot:"prepend"},slot:"prepend"},[e._v("角色名:")])]),e._v(" "),n("Tree",{ref:"tree",attrs:{data:e.treeData,render:e.renderContent,"show-checkbox":"",multiple:"","load-data":e.loadData}})],1),e._v(" "),n("div",{attrs:{slot:"footer"},slot:"footer"},[n("Button",{attrs:{type:e.editType,size:"large",long:"",loading:e.modal_loading},on:{click:e.edit}},[e._v(e._s(e.msgEdit))])],1)])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});