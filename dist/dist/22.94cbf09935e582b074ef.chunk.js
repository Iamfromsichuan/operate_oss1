webpackJsonp([22],{283:function(e,t,a){a(884);var r=a(4)(a(885),a(886),null,null);r.options.__file="D:\\项目\\operate_oss\\src\\views\\shortMessageModule\\sgIp.vue",r.esModule&&Object.keys(r.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),r.options.functional&&console.error("[vue-loader] sgIp.vue: functional components are not supported with templates, they should use render functions."),e.exports=r.exports},884:function(e,t){},885:function(e,t,a){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var n=a(7),i=(r(n),a(14)),o=r(i),s=a(62);t.default={data:function(){var e=this;return{count:"",remarks:"",changedTime:[],modal_loading:!1,ruleValidate:{wscCode:[{required:!0,message:" ",trigger:"blur"}],name:[{required:!0,message:" ",trigger:"blur"}],code:[{required:!0,message:" ",trigger:"blur"}],isEnable:[{required:!0,message:" ",trigger:"blur"}],province:[{required:!0,message:" ",trigger:"blur"}],businessType:[{required:!0,message:" ",trigger:"blur"}],refundSource:[{required:!0,message:" ",trigger:"blur"}]},checkedItem:{},if_add:!1,modalAdd:!1,cityList:[],filter:{provinceName:"",pageNo:1,pageSize:s.pageSize},changefilter:{provinceCode:"",id:"",spNumber:"",provinceName:"",remarks:"",count:"",timeInterval:""},totalRecords:0,dataLoading:!1,columns:[{title:"省份编码",key:"provinceCode",align:"center"},{title:"sp号码",key:"spNumber",align:"center"},{title:"省份名称",key:"provinceName",align:"center"},{title:"备注",key:"remarks",align:"center"},{title:"用户间隔24小时收到的上限",key:"count",align:"center",width:400},{title:"发送时段",key:"timeInterval",align:"center"},{title:"操作",key:"action",width:150,align:"center",render:function(t,a){return t("div",[t("Button",{props:{type:"warning",size:"small"},style:{marginRight:"5px"},on:{click:function(){console.log(a.row),e.checkedItem=a.row,e.modalAdd=!0,e.count=e.checkedItem.count,e.remarks=e.checkedItem.remarks}}},"修改")])}}],datas:[]}},methods:{deleteTa:function(){this.modalAdd=!1},handleSubmit:function(){var e=this;e.changefilter=o.default.copyNeed(e.changefilter,e.checkedItem),e.changefilter.count=e.count,e.changefilter.remarks=e.remarks;var t,a,r=e.changefilter.timeInterval.split("-");e.changefilter;if(t=e.toGetTime(r[0]),a=e.toGetTime(r[1]),e.changefilter.timeInterval=t+"-"+a,!/^[0-9]+.?[0-9]*$/.test(e.changefilter.count))return void e.$Message.error("请输入数字");o.default.ajax.get(o.default.baseUrl+"/contact/sgipSpConfig/sgipSpConfigEdit",{params:this.changefilter}).then(function(t){console.log(t),t.data.status==s.ERR_OK&&(e.modalAdd=!1,e.$Message.success(t.data.msg)),e.search(1)}).catch(function(t){e.modalAdd=!1,e.$Message.error(res.data.msg),e.search(1)})},changeTimeInterval:function(){this.checkedItem.timeInterval=this.changedTime},handleChange:function(e){this.changedTime=e[0]+"-"+e[1]},toGetTime:function(e){return e=e.split(":"),e=60*parseInt(e[0])+parseInt(e[1])},changeAcTime:function(e){return e<10?e="00:0"+e:e>=10&&e<60?e="00:"+e:e>=60&&parseInt(e/60)<10&&e%60<10?e="0"+parseInt(e/60)+":0"+e%60:e>=60&&parseInt(e/60)<10&&e%60>=10?e="0"+parseInt(e/60)+":"+e%60:e>=60&&parseInt(e/60)>=10&&e%60<10?e=parseInt(e/60)+":0"+e%60:parseInt(e/60)>=60&&parseInt(e/60)>=10&&e%60>=10&&(e=parseInt(e/60)+":"+e%60),e},search:function(e){var t=this;this.filter.pageNo=e,this.dataLoading=!0,o.default.ajax.get(o.default.baseUrl+"/contact/sgipSpConfig/sgipSpConfigList",{params:this.filter}).then(function(e){if(e.data.status==s.ERR_OK){var a=e.data.data.list;console.log(e);for(var r,n,i=0;i<a.length;i++)a[i].timeInterval&&(r=t.changeAcTime(parseInt(a[i].timeInterval.split("-")[0])),n=t.changeAcTime(parseInt(a[i].timeInterval.split("-")[1])),a[i].timeInterval=r+"-"+n);t.datas=a,t.totalRecords=e.data.data.total,t.dataLoading=!1}else t.$Message.error(e.data.msg),t.dataLoading=!1}).catch(function(e){console.log(e)})},changePage:function(e){this.search(e)},getProvinceName:function(){var e=this;o.default.ajax.get(o.default.baseUrl+"/contact/sgipSpConfig/provinceCodeList").then(function(t){console.log(t),e.cityList=t.data,e.dataLoading=!1}).catch(function(e){console.log(e)})}},mounted:function(){this.getProvinceName(),this.dataLoading=!0}}},886:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"messageList"},[a("Row",[a("Col",{attrs:{span:"4"}},[a("Select",{attrs:{clearable:"",placeholder:"请选择省份",filterable:""},model:{value:e.filter.provinceName,callback:function(t){e.$set(e.filter,"provinceName",t)},expression:"filter.provinceName"}},e._l(e.cityList,function(t){return a("Option",{key:t.provinceName,attrs:{value:t.provinceName}},[e._v(e._s(t.provinceName))])}))],1),e._v(" "),a("Col",{attrs:{offset:"1",span:"7"}},[a("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:function(t){e.search(1)}}},[e._v("查找")])],1)],1),e._v(" "),a("br"),e._v(" "),a("Modal",{attrs:{width:"660","mask-closable":!1,"class-name":"vertical-center-modal modalAdd"},model:{value:e.modalAdd,callback:function(t){e.modalAdd=t},expression:"modalAdd"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),e._v(" "),a("span",[e._v("修改")])],1),e._v(" "),a("div",[a("Form",{ref:"formValidate",staticStyle:{width:"100%",margin:"0 auto"},attrs:{model:e.checkedItem,rules:e.ruleValidate,"label-width":120}},[a("FormItem",{staticStyle:{width:"60%"},attrs:{label:"省份编码    ",prop:"wscCode"}},[a("Input",{attrs:{disabled:"",placeholder:"省份编码"},model:{value:e.checkedItem.provinceCode,callback:function(t){e.$set(e.checkedItem,"provinceCode",t)},expression:"checkedItem.provinceCode"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"60%"},attrs:{label:"省份名称",prop:"name"}},[a("Input",{attrs:{disabled:"",placeholder:"省份名称，如：四川"},model:{value:e.checkedItem.provinceName,callback:function(t){e.$set(e.checkedItem,"provinceName",t)},expression:"checkedItem.provinceName"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"60%"},attrs:{label:"sp号码",prop:"name"}},[a("Input",{attrs:{disabled:"",placeholder:"sp号码"},model:{value:e.checkedItem.spNumber,callback:function(t){e.$set(e.checkedItem,"spNumber",t)},expression:"checkedItem.spNumber"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"60%"},attrs:{label:"主键ID",prop:"code"}},[a("Input",{attrs:{disabled:"",placeholder:"省份编码,如：101"},model:{value:e.checkedItem.id,callback:function(t){e.$set(e.checkedItem,"id",t)},expression:"checkedItem.id"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"60%"},attrs:{label:"24小时收到上限"}},[a("Input",{attrs:{placeholder:"请输入上限"},model:{value:e.count,callback:function(t){e.count=t},expression:"count"}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"80%"},attrs:{label:"发送时段"}},[a("Input",{staticStyle:{width:"40%"},attrs:{disabled:"",placeholder:"请输入发送时段"},model:{value:e.checkedItem.timeInterval,callback:function(t){e.$set(e.checkedItem,"timeInterval",t)},expression:"checkedItem.timeInterval"}}),e._v(" "),a("TimePicker",{attrs:{confirm:"",type:"timerange",format:"HH:mm",placement:"bottom-end"},on:{"on-change":e.handleChange,"on-ok":e.changeTimeInterval}})],1),e._v(" "),a("FormItem",{staticStyle:{width:"60%"},attrs:{label:"备注"}},[a("Input",{attrs:{placeholder:"请输入备注"},model:{value:e.remarks,callback:function(t){e.remarks=t},expression:"remarks"}})],1)],1)],1),e._v(" "),a("div",{staticStyle:{"text-align":"right"},attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"success",loading:e.modal_loading},on:{click:e.handleSubmit}},[e._v("提交")]),e._v(" "),a("Button",{staticStyle:{"margin-left":"8px"},attrs:{type:"ghost"},on:{click:e.deleteTa}},[e._v("取消")])],1)]),e._v(" "),a("Table",{attrs:{columns:e.columns,data:e.datas,loading:e.dataLoading}}),e._v(" "),a("br"),e._v(" "),a("Page",{attrs:{total:e.totalRecords,current:e.filter.pageNo,"page-size":e.filter.pageSize},on:{"on-change":e.changePage}}),e._v(" "),a("br")],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});