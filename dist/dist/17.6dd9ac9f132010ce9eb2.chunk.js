webpackJsonp([17],{279:function(e,t,a){a(867);var s=a(4)(a(868),a(869),null,null);s.options.__file="D:\\项目\\operate_oss\\src\\views\\system\\user.vue",s.esModule&&Object.keys(s.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),s.options.functional&&console.error("[vue-loader] user.vue: functional components are not supported with templates, they should use render functions."),e.exports=s.exports},867:function(e,t){},868:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=a(14),o=function(e){return e&&e.__esModule?e:{default:e}}(s),r=a(62);t.default={data:function(){var e=this;return{roleList:[],dataLoading:!1,modal_loading:!1,modalAdd:!1,modalChangePwd:!1,columns:[{title:"上级管理账户",key:"parentUserName"},{title:"用户名",key:"userName"},{title:"操作",render:function(t,a){return t("Button",{props:{type:"primary",icon:"edit"},on:{click:function(){e.modalChangePwd=!0,e.editUser.userName=a.row.userName,e.editUser.newPassword=""}}},"修改密码")}}],data:[],formValidate:{userName:"",passWord:"",roleId:"",phone:"",email:""},ruleValidate:{userName:[{required:!0,message:"用户名不能为空",trigger:"blur"}],passWord:[{required:!0,message:"密码不能为空",trigger:"blur"}],email:[{type:"email",message:"邮箱格式不正确",trigger:"blur"}]},editUser:{userName:"",newPassword:""}}},methods:{getRoles:function(){var e=this;o.default.ajax.get(o.default.baseUrl+"/system/role/list").then(function(t){t.data.status==r.ERR_OK?e.roleList=t.data.data:e.$Message.error(t.data.msg)}).catch(function(e){console.log(e)})},getDatas:function(){var e=this;this.dataLoading=!0,o.default.ajax.get(o.default.baseUrl+"/system/user/list").then(function(t){e.dataLoading=!1,t.data.status==r.ERR_OK?e.data=t.data.data.list:e.$Message.error(t.data.msg)}).catch(function(e){console.log(e)})},addShow:function(){this.modalAdd=!0,this.getRoles()},handleSubmit:function(e){var t=this,a=this;this.$refs[e].validate(function(e){e?(t.modal_loading=!0,o.default.ajax.get(o.default.baseUrl+"/system/user/add",{params:a.formValidate}).then(function(e){a.modal_loading=!1,e.data.status==r.ERR_OK?(a.$Message.success("用户添加成功！"),a.modalAdd=!1,a.getDatas()):a.$Message.error(e.data.msg)}).catch(function(e){console.log(e)})):t.$Message.error("信息填写不正确!")})},resetPwd:function(){if(!this.editUser.newPassword)return void this.$Message.error("请输入新密码！");var e=this;this.modal_loading=!0,o.default.ajax.get(o.default.baseUrl+"/system/user/editUser",{params:e.editUser}).then(function(t){e.modal_loading=!1,t.data.status==r.ERR_OK?(e.$Message.success("密码重置成功！"),e.modalChangePwd=!1,e.getDatas()):e.$Message.error(t.data.msg)}).catch(function(e){console.log(e)})}},created:function(){this.getDatas()}}},869:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"user"},[a("Row",{attrs:{type:"flex",justify:"end"}},[a("Button",{attrs:{type:"success",icon:"plus"},on:{click:e.addShow}},[e._v("新增用户")])],1),e._v(" "),a("br"),e._v(" "),a("Table",{attrs:{border:"",columns:e.columns,data:e.data,loading:e.dataLoading}}),e._v(" "),a("br"),e._v(" "),a("Modal",{attrs:{width:"360"},model:{value:e.modalAdd,callback:function(t){e.modalAdd=t},expression:"modalAdd"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),e._v(" "),a("span",[e._v("添加用户")])],1),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("Form",{ref:"formValidate",attrs:{model:e.formValidate,rules:e.ruleValidate,"label-width":80}},[a("FormItem",{attrs:{label:"用户名",prop:"userName"}},[a("Input",{attrs:{placeholder:"请输入用户名"},model:{value:e.formValidate.userName,callback:function(t){e.$set(e.formValidate,"userName",t)},expression:"formValidate.userName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"密码",prop:"passWord"}},[a("Input",{attrs:{placeholder:"请输入密码",type:"password"},model:{value:e.formValidate.passWord,callback:function(t){e.$set(e.formValidate,"passWord",t)},expression:"formValidate.passWord"}})],1),e._v(" "),a("FormItem",{attrs:{label:"角色",prop:"roleId"}},[a("Select",{model:{value:e.formValidate.roleId,callback:function(t){e.$set(e.formValidate,"roleId",t)},expression:"formValidate.roleId"}},e._l(e.roleList,function(t){return a("Option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])}))],1),e._v(" "),a("FormItem",{attrs:{label:"电话",prop:"phone"}},[a("Input",{attrs:{placeholder:"用户联系号码"},model:{value:e.formValidate.phone,callback:function(t){e.$set(e.formValidate,"phone",t)},expression:"formValidate.phone"}})],1),e._v(" "),a("FormItem",{attrs:{label:"E-mail",prop:"email"}},[a("Input",{attrs:{placeholder:"用户email"},model:{value:e.formValidate.email,callback:function(t){e.$set(e.formValidate,"email",t)},expression:"formValidate.email"}})],1)],1)],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"success",size:"large",long:"",loading:e.modal_loading},on:{click:function(t){e.handleSubmit("formValidate")}}},[e._v("确认添加")])],1)]),e._v(" "),a("Modal",{attrs:{width:"360"},model:{value:e.modalChangePwd,callback:function(t){e.modalChangePwd=t},expression:"modalChangePwd"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),e._v(" "),a("span",[e._v("重置用户密码:"+e._s(e.editUser.userName))])],1),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("Form",{ref:"editUser",attrs:{model:e.editUser,"label-width":80}},[a("FormItem",{attrs:{label:"重置密码",prop:"newPassword"}},[a("Input",{attrs:{placeholder:"请输入新密码"},model:{value:e.editUser.newPassword,callback:function(t){e.$set(e.editUser,"newPassword",t)},expression:"editUser.newPassword"}})],1)],1)],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"warning",size:"large",long:"",loading:e.modal_loading},on:{click:e.resetPwd}},[e._v("重置")])],1)])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});