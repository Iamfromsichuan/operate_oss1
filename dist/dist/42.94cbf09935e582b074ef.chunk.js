webpackJsonp([42],{292:function(e,t,a){a(927);var o=a(4)(a(928),a(929),null,null);o.options.__file="D:\\项目\\operate_oss\\src\\views\\Orders\\order.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] order.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},927:function(e,t){},928:function(e,t,a){"use strict";function o(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(96),n=o(r),i=a(7),l=o(i),s=a(14),c=o(s),d=a(62);t.default={computed:{content:function(){if(!this.messageList)return"";var e=void 0;switch(this.againObj.orderStatus){case"1":return e=this.messageList.filter(function(e){return e.smsType.indexOf("成功")>=0}),e[0];case"2":return e=this.messageList.filter(function(e){return e.smsType.indexOf("失败")>=0}),e[0];case"6":return""}}},data:function(){var e=this;return{tent:"",spNu:"",disabledGroup:"成功",againObj:{productCode:"",mobileNumber:"",productName:"",orderStatus:"",handRemarks:"",content:"",orderNo:"",spNumber:"",provinceCode:""},messageList:[],collapseName:"",cancelObj:{orderNo:"",remarks:""},modalAgain:!1,modalCancel:!1,moreSearch:!1,modal1:!1,modal_loading:!1,items:"",CodeAndName:"",initTime:[(new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getDate()+" 00:00:00",(new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getDate()+" 23:59:59"],filter:{mobileNumber:"",startTime:"",endTime:"",productType:"",provinceName:"",netStop:"",orderStatus:"",provinceCode:"",orderNo:"",pageNo:1,pageSize:d.pageSize},objectList:[],totalRecords:0,pageConfig:[8,10,15,18,20,300],TotalRecords:0,dataLoading:!1,columns1:[{title:"字段",key:"title"},{title:"内容",key:"name"}],columns:[{title:"电话号码",key:"mobileNumber"},{title:"产品名称",key:"productName",render:function(e,t){return e("Tooltip",{props:{content:t.row.productName?t.row.productName:"点击添加",placement:"top-start"},style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:"left",width:60}},t.row.productName)}},{title:"订单来源",key:"orderSource"},{title:"网别",key:"netStop"},{title:"渠道类型",key:"channelType"},{title:"订单状态",key:"orderStatus",render:function(e,t){return e("Span",{},0===t.row.orderStatus?"充值中":1===t.row.orderStatus?"成功":2===t.row.orderStatus?"失败":3===t.row.orderStatus?"待查单":4===t.row.orderStatus?"订单异常":5===t.row.orderStatus?"手工补充":"")}},{title:"充值说明",key:"orderContent",render:function(e,t){return e("Poptip",{props:{trigger:"hover",width:(0===t.index||1===t.index||2===t.index)&&t.row.orderContent.length>100?1e3:400,content:t.row.orderContent?t.row.orderContent:"点击添加"},style:{whiteSpace:"normal",color:"操作成功"==t.row.orderContent||"订购成功"==t.row.orderContent?"green":"red"}},"操作成功"==t.row.orderContent||"订购成功"==t.row.orderContent?t.row.orderContent:"查看详情")}},{title:"创建时间",key:"createTime"},{title:"省份编码",key:"provinceCode"},{title:"短信内容",key:"smsContent",width:"auto",render:function(e,t){return e("Poptip",{props:{trigger:"hover",width:"400",content:t.row.smsContent?t.row.smsContent:"点击添加"},style:{whiteSpace:"normal"}},[e("Button",{props:{icon:"edit",size:"small",type:"primary"}})])}},{title:"操作",key:"action",align:"center",width:150,render:function(t,a){return 4!=a.row.orderStatus?5==a.row.orderStatus?t("div",[t("Button",{props:{type:"warning",size:"small"},style:{marginRight:"5px"},on:{click:function(){var t=e;t.objectList=[];for(var o in a.row)for(var r=0;r<t.foundColumns.length;r++)if(o===t.foundColumns[r].key){var i={};i.name=a.row[o],t.objectList.push((0,n.default)({},t.foundColumns[r],i))}e.modal1=!0}}},"详情"),t("Button",{props:{type:"error",size:"small"},style:{marginRight:"5px"},on:{click:function(){var t=e;e.againObj.productCode=a.row.productCode,e.againObj.mobileNumber=a.row.mobileNumber,e.againObj.productName=a.row.productName,e.againObj.orderNo=a.row.orderNo,e.againObj.provinceCode=a.row.provinceCode,t.dataLoading=!0,c.default.ajax.get(c.default.baseUrl+"/core/orders/smsList",{params:{productCode:t.againObj.productCode,provinceCode:t.againObj.provinceCode,channelType:"手工补充"}}).then(function(e){t.dataLoading=!1,e.status==d.ERR_OK?(console.log(e),t.messageList=e.data.data.list.map(function(e){var t=e.spCode.split(":");return e.spCode=t[1],e}),t.modalAgain=!0):t.$Message.error(e)}).catch(function(e){console.log(e)})}}},"修改")]):t("div",[t("Button",{props:{type:"warning",size:"small"},on:{click:function(){var t=e;t.objectList=[];for(var o in a.row)for(var r=0;r<t.foundColumns.length;r++)if(o===t.foundColumns[r].key){var i={};i.name=a.row[o],t.objectList.push((0,n.default)({},t.foundColumns[r],i))}e.modal1=!0}}},"查看详情")]):t("div",[t("Button",{props:{type:"warning",size:"small"},style:{marginRight:"5px"},on:{click:function(){var t=e;t.objectList=[];for(var o in a.row)for(var r=0;r<t.foundColumns.length;r++)if(o===t.foundColumns[r].key){var i={};i.name=a.row[o],t.objectList.push((0,n.default)({},t.foundColumns[r],i))}e.modal1=!0}}},"详情"),t("Button",{props:{type:"error",size:"small"},style:{marginRight:"5px"},on:{click:function(){e.cancelObj.orderNo=a.row.orderNo,e.modalCancel=!0}}},"重冲")])}}],foundColumns:[{title:"电话号码",key:"mobileNumber"},{title:"网别",key:"netStop"},{title:"订单来源",key:"orderSource"},{title:"产品类型",key:"productType"},{title:"订单状态",key:"orderStatus"},{title:"省份编码",key:"provinceCode"},{title:"短信内容",key:"smsContent"},{title:"返回时间",key:"responseTime",align:"center",width:200},{title:"返回状态",key:"responseData"},{title:"订单号",key:"orderNo"},{title:"开始时间",key:"startTime"},{title:"结束时间",key:"endTime"},{title:"产品编码",key:"productCode"},{title:"流水号",key:"transId"},{title:"产品名称",key:"productName"},{title:"通道编码",key:"passagewayCode"},{title:"渠道类型",key:"channelType"},{title:"附加数据",key:"attachData"},{title:"充值策略",key:"rechargeStrategy"},{title:"充值策略数据",key:"rechargeStrategyData"},{title:"充值路径",key:"rechargeProfile"},{title:"充值索引",key:"rechargeIndex"},{title:"订单内容",key:"orderContent"},{title:"请求数据",key:"requestData"},{title:"响应数据",key:"responseData"},{title:"创建时间",key:"createTime"},{title:"查单请求数据",key:"queryRequestData"},{title:"查单响应数据",key:"queryResponseData"},{title:"备注",key:"remarks"}],datas:[]}},methods:{again:function(){console.log(this.againObj);var e=this;e.dataLoading=!0,c.default.ajax.get(c.default.baseUrl+"/core/orders/editV2",{params:e.againObj}).then(function(t){e.dataLoading=!1,e.modalAgain=!1,200==t.data.status?(e.againObj.handRemarks="",e.$Message.success(t.data.msg),e.search(e.filter.pageNo)):e.$Message.error(t.data.msg)}).catch(function(e){console.log(e)})},updateItem:function(e){this.againObj.orderStatus=e},changePageSize:function(e){this.filter.pageSize=e,this.search(1)},commoneRender:function(e,t,a){return e("Tooltip",{props:{content:t.row[a]?t.row[a]:"点击添加",placement:"top-start"},style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:"left",width:"60"}},t.row[a])},ok:function(){},cancel:function(){var e=this;c.default.ajax.get(c.default.baseUrl+"/core/orders/abnormalEdit",{params:{orderNo:this.cancelObj.orderNo,remarks:this.cancelObj.remarks}}).then(function(t){t.status==d.ERR_OK?(e.$Message.success("操作成功"),e.modalCancel=!1,e.dataLoading=!1,e.search(1)):(e.$Message.error(t.msg),e.dataLoading=!1)}).catch(function(e){console.log(e)})},changeTime:function(e){e.length?(this.filter.startTime=e[0]+" 00:00:00",this.filter.endTime=e[1]+" 23:59:59"):(this.filter.startTime="",this.filter.endTime="")},search:function(e){var t=this;this.filter.pageNo=e,this.dataLoading=!0,c.default.ajax.get(c.default.baseUrl+"/core/orders/list",{params:this.filter}).then(function(e){e.status==d.ERR_OK?(t.datas=e.data.data.list,t.TotalRecords=e.data.data.total,t.dataLoading=!1):(t.$Message.error(e),t.dataLoading=!1)}).catch(function(e){console.log(e)})},changePage:function(e){this.search(e)},download:function(){window.location.href=c.default.baseUrl+"/core/orders/export?token="+l.default.get("token")+c.default.parseParam(this.filter)},getProvinceName:function(e){var t=this;c.default.ajax.get(c.default.baseUrl+"/system/data/dictionary/list",{params:{dictionaryType:e}}).then(function(e){console.log(e),t.items=e.data,t.dataLoading=!1}).catch(function(e){console.log(e)})}},created:function(){this.filter.startTime=this.initTime[0],this.filter.endTime=this.initTime[1],this.getProvinceName("省份")},watch:{content:function(){this.content?(this.againObj.content=this.content.content,this.againObj.spNumber=this.content.spCode):(this.againObj.content="",this.againObj.spNumber="")}}}},929:function(e,t,a){e.exports={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"messageList messageList_m"},[a("Collapse",{staticStyle:{margin:"10px 0"},model:{value:e.collapseName,callback:function(t){e.collapseName=t},expression:"collapseName"}},[a("Panel",{attrs:{name:"1"}},[a("div",{staticStyle:{display:"inline-block",float:"left","margin-right":"10px"},on:{click:function(e){e.stopPropagation()}}},[a("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",filterable:"",placeholder:"省份"},model:{value:e.filter.provinceCode,callback:function(t){e.$set(e.filter,"provinceCode",t)},expression:"filter.provinceCode"}},e._l(e.items,function(t){return a("Option",{key:t.dictionaryCode,attrs:{value:t.dictionaryCode}},[e._v(e._s(t.dictionaryName))])})),e._v(" "),a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"datetimerange",format:"yyyy-MM-dd",placeholder:"请选择查询时间",value:e.initTime},on:{"on-change":e.changeTime}}),e._v(" "),a("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:function(t){e.search(1)}}},[e._v("查找")]),e._v(" "),a("Button",{attrs:{type:"success",icon:"ios-cloud-download"},on:{click:e.download}},[e._v("导出")])],1),e._v(" "),a("div",{attrs:{slot:"content"},slot:"content"},[a("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",filterable:"",placeholder:"订单状态"},model:{value:e.filter.orderStatus,callback:function(t){e.$set(e.filter,"orderStatus",t)},expression:"filter.orderStatus"}},[a("Option",{attrs:{value:"0"}},[e._v("充值中")]),e._v(" "),a("Option",{attrs:{value:"1"}},[e._v("成功")]),e._v(" "),a("Option",{attrs:{value:"2"}},[e._v("失败")]),e._v(" "),a("Option",{attrs:{value:"3"}},[e._v("待查单")]),e._v(" "),a("Option",{attrs:{value:"4"}},[e._v("订单异常")]),e._v(" "),a("Option",{attrs:{value:"5"}},[e._v("手工补充")])],1),e._v(" "),a("Input",{staticStyle:{width:"100px"},attrs:{placeholder:"订单类型"},model:{value:e.filter.productType,callback:function(t){e.$set(e.filter,"productType",t)},expression:"filter.productType"}}),e._v(" "),a("Select",{staticStyle:{width:"100px"},attrs:{clearable:"",filterable:"",placeholder:"网别 "},model:{value:e.filter.netStop,callback:function(t){e.$set(e.filter,"netStop",t)},expression:"filter.netStop"}},[a("Option",{attrs:{value:"23G"}},[e._v("23G")]),e._v(" "),a("Option",{attrs:{value:"4G"}},[e._v("4G")])],1),e._v(" "),a("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"订单编号"},model:{value:e.filter.orderNo,callback:function(t){e.$set(e.filter,"orderNo",t)},expression:"filter.orderNo"}})],1),e._v(" "),a("div",{staticStyle:{display:"inline-block",float:"right","margin-right":"10px",width:"150px"},on:{click:function(e){e.stopPropagation()}}},[a("Input",{staticStyle:{width:"90%"},attrs:{icon:"search",placeholder:"电话号码"},on:{"on-click":function(t){e.search(1)}},model:{value:e.filter.mobileNumber,callback:function(t){e.$set(e.filter,"mobileNumber",t)},expression:"filter.mobileNumber"}})],1)])],1),e._v(" "),a("br"),e._v(" "),a("Table",{attrs:{columns:e.columns,data:e.datas,loading:e.dataLoading}}),e._v(" "),a("div",{staticClass:"page"},[a("Page",{staticStyle:{display:"inline-block","vertical-align":"middle"},attrs:{total:e.TotalRecords,current:e.filter.pageNo,"page-size":e.filter.pageSize,"show-elevator":"","show-sizer":"",placement:"top","page-size-opts":e.pageConfig},on:{"on-change":e.changePage,"on-page-size-change":e.changePageSize}}),e._v(" "),a("div",{staticClass:"records",staticStyle:{display:"inline-block",height:"32px","line-height":"32px","margin-left":"5%"}},[e._v("\n            当前共"),a("span",{staticStyle:{color:"#f00","font-weight":"bold"}},[e._v(" "+e._s(e.TotalRecords)+" ")]),e._v("条记录\n        ")])],1),e._v(" "),a("Modal",{attrs:{width:"1200"},on:{"on-ok":e.ok},model:{value:e.modal1,callback:function(t){e.modal1=t},expression:"modal1"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),e._v(" "),a("span",[e._v("详情展示")])],1),e._v(" "),a("Row",[a("Col",{attrs:{span:"8"}},[a("Table",{attrs:{border:"",columns:e.columns1,data:e.objectList.slice(0,12)}})],1),e._v(" "),a("Col",{attrs:{span:"8"}},[a("Table",{attrs:{border:"",columns:e.columns1,data:e.objectList.slice(12,21).concat(e.objectList.slice(24))}})],1),e._v(" "),a("Col",{attrs:{span:"8"}},[a("Table",{attrs:{border:"",columns:e.columns1,data:e.objectList.slice(21,24)}})],1)],1)],1),e._v(" "),a("Modal",{attrs:{width:"360"},model:{value:e.modalCancel,callback:function(t){e.modalCancel=t},expression:"modalCancel"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),e._v(" "),a("span",[e._v("重新充值订单")])],1),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("Input",{attrs:{placeholder:"备注"},model:{value:e.cancelObj.remarks,callback:function(t){e.$set(e.cancelObj,"remarks",t)},expression:"cancelObj.remarks"}}),e._v(" "),a("p",[e._v("此操作会重新充值该订单")]),e._v(" "),a("p",[e._v("确定重冲么？")])],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"error",size:"large",long:"",loading:e.modal_loading},on:{click:e.cancel}},[e._v("确定")])],1)]),e._v(" "),a("Modal",{attrs:{width:"400"},model:{value:e.modalAgain,callback:function(t){e.modalAgain=t},expression:"modalAgain"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),e._v(" "),a("span",[e._v("手工补充订单")])],1),e._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("Input",{staticStyle:{"margin-bottom":"10px"},attrs:{placeholder:"电话号码",disabled:""},model:{value:e.againObj.mobileNumber,callback:function(t){e.$set(e.againObj,"mobileNumber",t)},expression:"againObj.mobileNumber"}}),e._v(" "),a("Input",{staticStyle:{"margin-bottom":"10px"},attrs:{placeholder:"名称",disabled:""},model:{value:e.againObj.productName,callback:function(t){e.$set(e.againObj,"productName",t)},expression:"againObj.productName"}}),e._v(" "),a("RadioGroup",{staticStyle:{"margin-bottom":"10px"},on:{"on-change":e.updateItem},model:{value:e.againObj.orderStatus,callback:function(t){e.$set(e.againObj,"orderStatus",t)},expression:"againObj.orderStatus"}},[a("Radio",{attrs:{label:"1"}},[e._v("成功")]),e._v(" "),a("Radio",{attrs:{label:"2"}},[e._v("失败")]),e._v(" "),a("Radio",{attrs:{label:"6"}},[e._v("重复订购")])],1),e._v(" "),a("Input",{directives:[{name:"show",rawName:"v-show",value:e.againObj.content,expression:"againObj.content"}],staticStyle:{"margin-bottom":"10px"},attrs:{value:e.againObj.content,type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"Enter something...",disabled:""}}),e._v(" "),a("Input",{directives:[{name:"show",rawName:"v-show",value:e.againObj.content,expression:"againObj.content"}],staticStyle:{"margin-bottom":"10px"},attrs:{value:e.againObj.spNumber,placeholder:"电话号码",disabled:""}}),e._v(" "),a("Input",{staticStyle:{"margin-bottom":"10px"},attrs:{type:"textarea",autosize:{minRows:2,maxRows:5},placeholder:"备注"},model:{value:e.againObj.handRemarks,callback:function(t){e.$set(e.againObj,"handRemarks",t)},expression:"againObj.handRemarks"}})],1),e._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"error",size:"large",long:"",loading:e.modal_loading},on:{click:e.again}},[e._v("确定")])],1)])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});