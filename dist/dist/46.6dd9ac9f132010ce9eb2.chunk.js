webpackJsonp([46],{292:function(e,t,a){a(914);var i=a(4)(a(915),a(916),null,null);i.options.__file="D:\\项目\\operate_oss\\src\\views\\BusinessTrigger\\UploadController.vue",i.esModule&&Object.keys(i.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] UploadController.vue: functional components are not supported with templates, they should use render functions."),e.exports=i.exports},914:function(e,t){},915:function(e,t,a){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var s=a(96),o=i(s),l=a(7),r=i(l),n=a(14),d=i(n),c=a(62);t.default={data:function(){return{isBlack:!1,responseCode:"",CodeAndName:"",myreg:/^[1][3,4,5,7,8][0-9]{9}$/,modal1:!1,slecetValue:"",modal_loading:!1,changefilter:{provinceName:"",phone:"",provinceCode:"",remarks:""},ruleValidate:{id:[{required:!0,message:" ",trigger:"blur"}],tableName:[{required:!0,message:" ",trigger:"blur"}],tableType:[{required:!0,message:" ",trigger:"change"}],tableTitle:[{required:!0,message:" ",trigger:"blur"}]},modalAdd:!1,items:[],instant:{},filter:{pageNo:1,pageSize:15,id:"",tableName:"",tableType:"",tableTitle:"",tableField:"",operationType:"",remarks:"",token:r.default.get("token")},totalRecords:0,dataLoading:!1,columns:[{title:"表名",key:"tableName"},{title:"表标题",key:"tableTitle"},{title:"上传类型",key:"operationType",width:100,render:function(e,t){return e("span",{},1==t.row.operationType?"新增 ":2==t.row.operationType?"删除 ":3==t.row.operationType?"添加":4==t.row.operationType?"初始化":5==t.row.operationType?"同步":"")}},{title:"上传文件名",key:"fileName"},{title:"上传文件重命名",key:"newName"},{title:"上传状态",key:"result",width:100,render:function(e,t){return e("span",{},0==t.row.result?"待处理 ":1==t.row.result?"成功  ":2==t.row.result?"失败":-1==t.row.result?"处理中":"")}},{title:"上传返回报文",key:"resultData",render:function(e,t){return 2==t.row.result?e("Poptip",{props:{trigger:"hover",width:"400",content:t.row.resultData}},[e("Button",{props:{icon:"edit",size:"small",type:t.row.returnText?"ghost":"warning"}})]):e("span",{},0==t.row.result?"待处理 ":1==t.row.result?"成功  ":2==t.row.result?"失败":-1==t.row.result?"处理中":"")}},{title:"表字段",key:"tableField"},{title:"备注",key:"remarks"},{title:"创建时间",key:"createTime"}],datasList:[],datas:[],datasWhite:[],datasBlack:[],datasLimen:[]}},methods:{reduceIds:function(){"white"==this.filter.tableType?(this.datasList=this.datasWhite,this.isBlack=!1):"black"==this.filter.tableType?(this.datasList=this.datasBlack,this.isBlack=!0):this.datasList=this.datas},getId:function(e){console.log(e);for(var t=0;t<this.datas.length;t++)if(this.datas[t].tableTitle==e)return void(this.instant=(0,o.default)({},this.datas[t]))},upLoad:function(){this.filter.tableTitle?this.filter.operationType?(this.filter.id=this.instant.id,this.filter.fileName=this.instant.fileName,this.filter.tableField=this.instant.tableField,this.filter.tableName=this.instant.tableName,this.modal1=!0):this.$Message.error("请选择需要上传的类型"):this.$Message.error("请选择需要上传的表名")},cacheSearch:function(){var e=this;e.filter.provinceName=e.CodeAndName.split(";")[0],e.filter.provinceCode=e.CodeAndName.split(";")[1],this.filter.phone?this.myreg.test(this.filter.phone)?this.CodeAndName?(this.dataLoading=!0,d.default.ajax.get(d.default.baseUrl+"/contact/sgipPhoneBlack/ridis",{params:this.filter}).then(function(t){e.dataLoading=!1,console.log(t.data.msg),e.responseCode=t.data.msg,e.modal1=!0}).catch(function(e){console.log(e)})):e.$Message.error("查询省份名称不可为空"):e.$Message.error("请输入正确的11位数字号码"):e.$Message.error("查询号码不可为空")},GetValue:function(e){var t=JSON.parse(e);this.changefilter.provinceName=t.provinceName,this.changefilter.provinceCode=t.provinceCode},deleteTa:function(){this.modalAdd=!1},handleSubmit:function(e){var t=this;t.dataLoading=!1,d.default.ajax.get(d.default.baseUrl+"/contact/sgipPhoneBlack/add",{params:t.changefilter}).then(function(e){t.dataLoading=!1,t.modalAdd=!1,t.search(1)}).catch(function(e){console.log(e)})},show:function(){this.modalAdd=!0},getProvinceName:function(){var e=this;d.default.ajax.get(d.default.baseUrl+"/contact/sgipSpConfig/provinceCodeList").then(function(t){console.log(t),e.items=t.data,e.dataLoading=!1}).catch(function(e){console.log(e)})},changeTime:function(e){d.default.changeTime.bind(this)(e)},search:function(e){var t=this;t.filter.pageNo=e,this.filter.pageSize=c.pageSize,this.dataLoading=!0,this.orderNos="",this.checkedDatas=[],d.default.ajax.get(d.default.baseUrl+"/upload/list",{params:this.filter}).then(function(e){t.wscCode="",t.dataLoading=!1,e.data.status==c.ERR_OK?(t.datasLimen=e.data.data.list,t.totalRecords=e.data.data.total,console.log(t.totalRecords)):t.$Message.error(e.data.msg)}).catch(function(e){console.log(e)})},searchListNmae:function(e){var t=this;this.filter.pageNo=e,t.filter.pageSize=100,this.dataLoading=!0,this.orderNos="",this.checkedDatas=[],d.default.ajax.get(d.default.baseUrl+"/black/white/config/list",{params:this.filter}).then(function(e){if(t.filter.pageSize=15,t.wscCode="",t.dataLoading=!1,e.data.status==c.ERR_OK){t.datas=e.data.data.list;for(var a=0;a<t.datas.length;a++)"白名单"==t.datas[a].tableType||"white"==t.datas[a].tableType?t.datasWhite.push(t.datas[a]):t.datasBlack.push(t.datas[a]);t.search(1)}else t.$Message.error(e.data.msg)}).catch(function(e){console.log(e)})},changePage:function(e){this.search(e)},download:function(){if(this.filter.tableTitle){for(var e=0;e<this.datas.length;e++)if(this.datas[e].tableTitle==this.filter.tableTitle){this.filter.id=this.datas[e].id;break}window.location.href=d.default.baseUrl+"/upload/downloadTemplate?token="+r.default.get("token")+"&id="+this.filter.id}else this.$Message.error("请选择需要下载的表名")}},created:function(){this.searchListNmae(1),this.getProvinceName()}}},916:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"messageList messageList_m"},[a("Row",[a("Col",{attrs:{span:"3"}},[a("Select",{attrs:{clearable:"",filterable:"",placeholder:"黑白名单类型"},on:{"on-change":e.reduceIds},model:{value:e.filter.tableType,callback:function(t){e.$set(e.filter,"tableType",t)},expression:"filter.tableType"}},[a("Option",{attrs:{value:"black"}},[e._v("黑名单")]),e._v(" "),a("Option",{attrs:{value:"white"}},[e._v("白名单")])],1)],1),e._v(" "),a("Col",{attrs:{span:"3"}},[a("Select",{attrs:{clearable:"",filterable:"",placeholder:"黑白名单表名"},on:{"on-change":e.getId},model:{value:e.filter.tableTitle,callback:function(t){e.$set(e.filter,"tableTitle",t)},expression:"filter.tableTitle"}},e._l(e.datasList,function(t,i){return a("Option",{key:i,attrs:{value:t.tableTitle}},[e._v(e._s(t.tableTitle))])}))],1),e._v(" "),a("Col",{attrs:{span:"3"}},[a("Select",{attrs:{clearable:"",filterable:"",placeholder:"上传类型"},model:{value:e.filter.operationType,callback:function(t){e.$set(e.filter,"operationType",t)},expression:"filter.operationType"}},[e.isBlack?a("Option",{key:"1",attrs:{value:"1"}},[e._v("新增 ")]):e._e(),e._v(" "),e.isBlack?a("Option",{key:"2",attrs:{value:"2"}},[e._v("删除 ")]):e._e(),e._v(" "),e.isBlack?e._e():a("Option",{key:"3",attrs:{value:"3"}},[e._v("添加")]),e._v(" "),e.isBlack?e._e():a("Option",{key:"4",attrs:{value:"4"}},[e._v("初始化")]),e._v(" "),e.isBlack?e._e():a("Option",{key:"5",attrs:{value:"5"}},[e._v("同步")])],1)],1),e._v(" "),a("Col",{attrs:{span:"7",offset:"1"}},[a("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:function(t){e.search(1)}}},[e._v("查找")]),e._v(" "),a("Button",{attrs:{type:"success",icon:"ios-cloud-upload-outline"},on:{click:e.upLoad}},[e._v("上传文件")]),e._v(" "),a("Button",{attrs:{type:"error",icon:"ios-cloud-download"},on:{click:e.download}},[e._v("导出模板")])],1)],1),e._v(" "),a("br"),e._v(" "),a("Table",{attrs:{columns:e.columns,data:e.datasLimen,loading:e.dataLoading}}),e._v(" "),a("br"),e._v(" "),a("Page",{attrs:{total:e.totalRecords,current:e.filter.pageNo,"page-size":e.filter.pageSize},on:{"on-change":e.changePage}}),e._v(" "),a("br"),e._v(" "),a("Modal",{model:{value:e.modal1,callback:function(t){e.modal1=t},expression:"modal1"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"ios-information-circle"}}),e._v(" "),a("span",[e._v("上传文件----"+e._s(e.filter.tableTitle))])],1),e._v("\n        备注:(请先填写备注，文件在拖入或者点击导入后，会直接上传)"),a("Input",{staticStyle:{"margin-bottom":"20px"},attrs:{placeholder:"此处可输入备注"},model:{value:e.filter.remarks,callback:function(t){e.$set(e.filter,"remarks",t)},expression:"filter.remarks"}}),e._v(" "),a("Upload",{attrs:{multiple:"",type:"drag",action:"http://oss.operate.terabyte.com.cn/upload/uploadFile","with-credentials":!0,data:e.filter}},[a("div",{staticStyle:{padding:"20px 0"}},[a("Icon",{staticStyle:{color:"#3399ff"},attrs:{type:"ios-cloud-upload",size:"52"}}),e._v(" "),a("p",[e._v("点击虚线内或者将文件拖入虚线内上传")])],1)])],1)],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});