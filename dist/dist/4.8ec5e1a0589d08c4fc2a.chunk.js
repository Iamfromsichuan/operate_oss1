webpackJsonp([4],{294:function(t,e,a){a(941),a(942);var i=a(4)(a(943),a(944),"data-v-0a834c16",null);i.options.__file="D:\\项目\\operate_oss\\src\\views\\Orders\\turnOver.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] turnOver.vue: functional components are not supported with templates, they should use render functions."),t.exports=i.exports},343:function(t,e,a){a(344);var i=a(4)(a(345),a(346),null,null);i.options.__file="D:\\项目\\operate_oss\\src\\views\\main-components\\quickFilter.vue",i.esModule&&Object.keys(i.esModule).some(function(t){return"default"!==t&&"__esModule"!==t})&&console.error("named exports are not supported in *.vue files."),i.options.functional&&console.error("[vue-loader] quickFilter.vue: functional components are not supported with templates, they should use render functions."),t.exports=i.exports},344:function(t,e){},345:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default={props:{taglist:{type:Array,default:[]}},data:function(){return{checkedIndex:0}},methods:{checkTag:function(t){this.checkedIndex==t?this.checkedIndex=0:this.checkedIndex=t,this.$emit("gettagIndex",this.checkedIndex)}}}},346:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"quickFilter"},[a("ul",{staticClass:"listContent"},t._l(t.taglist,function(e,i){return a("li",{key:i,staticClass:"listItem",class:{active:t.checkedIndex==i},on:{click:function(e){t.checkTag(i)}}},[t._v(t._s(e))])}))])},staticRenderFns:[]},t.exports.render._withStripped=!0},941:function(t,e){},942:function(t,e){},943:function(t,e,a){"use strict";function i(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var r=a(96),o=i(r),s=a(14),n=i(s),l=a(7),d=i(l),c=a(62),u=a(343),p=i(u);e.default={data:function(){var t=this;return{otherIdea:!1,otherIdeaDown:!1,historyDetaile:{},historyList:[],modalHistory:!1,deliveryOrderNo:"",isAll:!0,tagIndex:"",collapseName:"",tagList:["回访订单","亲情卡","不限量","宽带"],cityList:[{name:"乌鲁木齐",val:"乌鲁木齐"},{name:"吐鲁番",val:"吐鲁番"},{name:"阿勒泰",val:"阿勒泰"},{name:"伊犁",val:"伊犁"},{name:"重庆",val:"重庆"},{name:"四川",val:"四川"},{name:"昌吉",val:"昌吉"}],modalEditor:!1,byte:"",InputList:[],loading:"",remark:"",initTime:[(new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getDate()+" 00:00:00",(new Date).getFullYear()+"-"+((new Date).getMonth()+1)+"-"+(new Date).getDate()+" 23:59:59"],modal_loading:!1,dataLoading:!1,filter:{pageNo:1,pageSize:c.pageSize,trackStatus:"",orderStatus:"",orderSource:"",startTime:"",endTime:"",cityName:"",productName:"",provinceName:"",contactPhone:"",obligate:"",token:d.default.get("token"),productType:""},TotalRecords:0,columns:[{title:"业务",align:"center",key:"productType"},{title:"用户号码",align:"center",key:"contactPhone",width:"100"},{title:"产品名称",align:"center",key:"productName",render:function(t,e){return t("div",{},[t("Tooltip",{props:{content:e.row.productName,placement:"top-start"},style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:"center",width:"60px"}},e.row.productName)])}},{title:"渠道",align:"center",key:"orderSource"},{title:"省份",align:"center",key:"provinceName"},{title:"地市",align:"center",key:"cityName"},{title:"订单状态",align:"center",key:"orderStatus",render:function(e,a){for(var i=void 0,r=0;r<t.statusList.length;r++)a.row.orderStatus===t.statusList[r].status&&(i=-1===a.row.orderStatus?"待跟进":t.statusList[r].statusDes);return e("span",{},i)}},{title:"创建时间",align:"center",key:"createTime",render:function(t,e){return t("div",{},[t("Tooltip",{props:{content:e.row.createTime,placement:"top-start"},style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:"left"}},e.row.createTime.split(" ")[0])])}},{title:"跟单状态",align:"center",key:"trackStatus",className:"demo-table-info-column1",render:function(e,a){for(var i=void 0,r=0;r<t.statusList.length;r++)a.row.trackStatus===t.statusList[r].status&&(i=t.statusList[r].statusDes);return e("span",{style:{color:"#2d8cf0"},on:{click:function(){t.deliveryOrderNo=a.row.orderNo,t.historyDetaile=a.row,t.getHistory()}}},i)}},{title:"回访跟单",align:"center",render:function(e,a){return e("Button",{props:{icon:"edit",size:"small",type:"-1"==a.row.orderStatus?"warning":"default"},on:{click:function(){-1===a.row.orderStatus?(t.editor.orderNo=a.row.orderNo,t.editor.productCode=a.row.productCode,t.editor.remarks="",t.editor.obligate="",t.editor.trackStatus=301,t.modalEditor=!0):t.$Message.error("订单已关闭，不可修改")}}})}},{title:"跟单时间",align:"center",key:"updateTime",render:function(t,e){return t("div",{},[t("Tooltip",{props:{content:e.row.updateTime,placement:"top-start"},style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:"left"}},e.row.updateTime.split(" ")[0])])}},{title:"跟单人",align:"center",key:"receiver"},{title:"锁定",key:"action",align:"center",className:"demo-table-info-column",render:function(e,a){return e("Button",{props:{icon:"locked",size:"small"},on:{click:function(){t.modalRefundMarks=!0,t.editOrderNo=a.row.orderNo,t.refundRmarks=a.row.returnText?a.row.returnText:"【"+a.row.mobileNumber+"】于【"+a.row.orderData+"】订购【"+a.row.orderProduct+"】业务。用户表示非本人订购，要求退费。与用户协商结果如下:\r\rXXXXXXX\r\r,用户表示满意。以下是该用户的所有订购截图，（如没有截图请联系4000126559）"}}})}},{title:"地址",align:"center",key:"contactAddress",render:function(t,e){return e.row.contactAddress?t("div",{},[t("Tooltip",{props:{content:e.row.contactAddress,placement:"top-start"},style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:"center",width:"60px"}},e.row.contactAddress)]):""}},{title:"备注",align:"center",key:"remarks",render:function(t,e){return e.row.remarks?t("div",{},[t("Tooltip",{props:{content:e.row.remarks,placement:"top-start"},style:{whiteSpace:"nowrap",overflow:"hidden",textOverflow:"ellipsis",textAlign:"center",width:"60px"}},e.row.remarks)]):""}}],datas:[],pageConfig:[8,10,15,18,20,300],statusList:[{status:-1,statusDes:"订单创建"},{status:0,statusDes:"已预约"},{status:1,statusDes:"成功办理"},{status:2,statusDes:"失败"},{status:6,statusDes:"意向订单"},{status:301,statusDes:"未接"},{status:302,statusDes:"挂断"},{status:303,statusDes:"线路忙"},{status:304,statusDes:"关机"},{status:305,statusDes:"回头联系"},{status:306,statusDes:"次月办理"},{status:307,statusDes:"其他"},{status:201,statusDes:"语言不通"},{status:202,statusDes:"点错"},{status:203,statusDes:"无法配送"},{status:204,statusDes:"不办理"},{status:205,statusDes:"非王卡套餐"},{status:206,statusDes:"要换套餐"},{status:999,statusDes:"订单关闭"},{status:207,statusDes:"其他"}],editor:{orderNo:"",orderStatus:"",trackStatus:"301",remarks:"",productCode:"",obligate:"",token:d.default.get("token")}}},methods:{showOtherInput:function(t){return 307==t?(this.otherIdea=!0,void(this.otherIdeaDown=!1)):207==t?(this.otherIdeaDown=!0,void(this.otherIdea=!1)):(this.otherIdea=!1,void(this.otherIdeaDown=!1))},historyClose:function(){this.modalHistory=!1},getHistory:function(){var t=this;n.default.ajax.get(n.default.baseUrl+"/core/orders/delivery/logList",{params:{deliveryOrderNo:this.deliveryOrderNo,token:t.filter.token}}).then(function(e){if(t.dataLoading=!1,e.data.status==c.ERR_OK){t.historyList=e.data.data.list.reverse();for(var a=0;a<t.statusList.length;a++)for(var i=0;i<t.historyList.length;i++)t.historyList[i].logInfo==t.statusList[a].status&&(t.historyList[i].logInfo=t.statusList[a].statusDes);t.modalHistory=!0}}).catch(function(t){console.log(t)})},gettagIndex:function(t){this.tagIndex=t,this.filter.productType="亲情卡",this.filter.orderStatus=-1,-1===t||0===t?(this.filter.productType="",this.filter.orderStatus="",this.cityList=[{name:"乌鲁木齐",val:"乌鲁木齐"},{name:"吐鲁番",val:"吐鲁番"},{name:"阿勒泰",val:"阿勒泰"},{name:"伊犁",val:"伊犁"},{name:"重庆",val:"重庆"},{name:"四川",val:"四川"},{name:"昌吉",val:"昌吉"}],this.isAll=!0):1===t?(this.filter.orderStatus=-1,this.filter.productType="亲情卡",this.cityList=[{name:"乌鲁木齐",val:"乌鲁木齐"},{name:"吐鲁番",val:"吐鲁番"},{name:"阿勒泰",val:"阿勒泰"},{name:"重庆",val:"重庆"}],this.isAll=!1):2===t?(this.filter.orderStatus=-1,this.filter.productType="不限量",this.cityList=[{name:"昌吉",val:"昌吉"}],this.isAll=!1):3===t&&(this.filter.orderStatus=-1,this.filter.productType="宽带",this.cityList=[{name:"乌鲁木齐",val:"乌鲁木齐"},{name:"四川",val:"四川"}],this.isAll=!1),this.search(1)},subOrder:function(){var t=this;if(console.log(this.editor.trackStatus),this.editor.trackStatus){this.dataLoading=!0;for(var e=!1,a=[-1,301,302,303,304,305,306,307],i=0;i<a.length;i++)a[i]==this.editor.trackStatus&&(e=!0);if(e){if(this.editor.orderStatus=-1,307==this.editor.trackStatus&&!this.editor.obligate)return this.dataLoading=!1,void this.$Message.error("请填写--其他--的详细跟单状态，必填")}else if(2==this.editor.trackStatus)this.editor.orderStatus=2;else if(1==this.editor.trackStatus)this.editor.orderStatus=1;else{if(207==this.editor.trackStatus&&(console.log(this.editor.obligate),!this.editor.obligate))return this.dataLoading=!1,void this.$Message.error("请填写--其他(失败)--的详细跟单情况，必填");this.editor.orderStatus=2}n.default.ajax.get(n.default.baseUrl+"/core/orders/delivery/update",{params:this.editor}).then(function(e){t.dataLoading=!1,e.data.status==c.ERR_OK?(t.modalEditor=!1,t.search(t.filter.pageNo)):t.$Message.error(e.data.msg)}).catch(function(t){console.log(t)})}else this.$Message.error("请选择需要修改的状态")},changeTime:function(t){t.length?(this.filter.startTime=t[0]+" 00:00:00",this.filter.endTime=t[1]+" 23:59:59"):(this.filter.startTime="",this.filter.endTime=""),console.log(this.filter.startTime),console.log(this.filter.endTime)},search:function(t){var e=this;this.filter.pageNo=t,this.dataLoading=!0,this.orderNos="",this.checkedDatas=[],n.default.ajax.get(n.default.baseUrl+"/core/orders/delivery/list",{params:this.filter}).then(function(t){e.wscCode="",e.dataLoading=!1,t.data.status==c.ERR_OK?(e.datas=t.data.data.list,e.TotalRecords=t.data.data.total):e.$Message.error(t.data.msg)}).catch(function(t){console.log(t)})},changePageSize:function(t){this.filter.pageSize=t,this.search(1)},changePage:function(t){this.search(t)},downloadFile:function(){var t=this,e=(0,o.default)({},t.filter);delete e.pageNo,delete e.pageSize,window.location.href=n.default.baseUrl+"/core/orders/delivery/export?token="+d.default.get("token")+n.default.parseParam(e)}},components:{QuickFilter:p.default},created:function(){this.filter.startTime=this.initTime[0],this.filter.endTime=this.initTime[1],this.search(1)}}},944:function(t,e,a){t.exports={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"complain_nation2"},[a("QuickFilter",{attrs:{taglist:t.tagList},on:{gettagIndex:t.gettagIndex}}),t._v(" "),a("Collapse",{staticStyle:{margin:"10px 0"},model:{value:t.collapseName,callback:function(e){t.collapseName=e},expression:"collapseName"}},[a("Panel",{attrs:{name:"1"}},[a("div",{staticStyle:{display:"inline-block",float:"left","margin-right":"10px"},on:{click:function(t){t.stopPropagation()}}},[a("Select",{staticStyle:{width:"100px"},attrs:{clearable:!0,placeholder:"地市"},model:{value:t.filter.cityName,callback:function(e){t.$set(t.filter,"cityName",e)},expression:"filter.cityName"}},[a("Option",{attrs:{value:""}},[t._v("全部")]),t._v(" "),t._l(t.cityList,function(e,i){return a("Option",{key:i,attrs:{value:e.val}},[t._v(t._s(e.name))])})],2),t._v(" "),a("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"datetimerange",format:"yyyy-MM-dd",placeholder:"Select date and time(Excluding seconds)",value:t.initTime},on:{"on-change":t.changeTime}}),t._v(" "),a("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:function(e){t.search(1)}}},[t._v("查找")]),t._v(" "),a("Button",{attrs:{type:"warning",icon:"ios-cloud-download"},on:{click:t.downloadFile}},[t._v("导出")])],1),t._v(" "),a("div",{attrs:{slot:"content"},slot:"content"},[t.isAll?a("Select",{staticStyle:{width:"100px"},attrs:{placeholder:"业务类型"},model:{value:t.filter.productType,callback:function(e){t.$set(t.filter,"productType",e)},expression:"filter.productType"}},[a("Option",{key:"1",attrs:{value:""}},[t._v("全部")]),t._v(" "),a("Option",{key:"2",attrs:{value:"亲情卡"}},[t._v("亲情卡")]),t._v(" "),a("Option",{key:"3",attrs:{value:"不限量"}},[t._v("不限量")]),t._v(" "),a("Option",{key:"4",attrs:{value:"宽带"}},[t._v("宽带")])],1):t._e(),t._v(" "),a("Select",{staticStyle:{width:"150px"},attrs:{clearable:!0,placeholder:"渠道"},model:{value:t.filter.orderSource,callback:function(e){t.$set(t.filter,"orderSource",e)},expression:"filter.orderSource"}},[a("Option",{attrs:{value:""}},[t._v("全部")]),t._v(" "),a("Option",{attrs:{value:"沃视窗"}},[t._v("沃视窗")]),t._v(" "),a("Option",{attrs:{value:"营销平台"}},[t._v("营销平台")]),t._v(" "),a("Option",{attrs:{value:"沃助手平台"}},[t._v("沃助手平台")]),t._v(" "),a("Option",{attrs:{value:"宽带公司"}},[t._v("宽带公司")])],1),t._v(" "),t.isAll?a("Select",{staticStyle:{width:"150px","margin-right":"10px"},attrs:{clearable:"",filterable:"",placeholder:"请选择订单状态"},model:{value:t.filter.orderStatus,callback:function(e){t.$set(t.filter,"orderStatus",e)},expression:"filter.orderStatus"}},[a("Option",{attrs:{value:""}},[t._v("全部")]),t._v(" "),a("Option",{attrs:{value:"-1"}},[t._v("待处理")]),t._v(" "),a("Option",{attrs:{value:"1"}},[t._v("成功")]),t._v(" "),a("Option",{attrs:{value:"2"}},[t._v("失败")])],1):t._e()],1),t._v(" "),a("div",{staticStyle:{display:"inline-block",float:"right","margin-right":"10px",width:"150px"},on:{click:function(t){t.stopPropagation()}}},[a("Input",{staticStyle:{width:"90%"},attrs:{icon:"search",placeholder:"电话号码"},on:{"on-click":function(e){t.search(1)}},model:{value:t.filter.contactPhone,callback:function(e){t.$set(t.filter,"contactPhone",e)},expression:"filter.contactPhone"}})],1)])],1),t._v(" "),a("Table",{attrs:{columns:t.columns,data:t.datas,loading:t.dataLoading,size:"small"}}),t._v(" "),a("br"),t._v(" "),a("br"),t._v(" "),a("div",{staticClass:"page"},[a("Page",{staticStyle:{display:"inline-block","vertical-align":"middle"},attrs:{total:t.TotalRecords,current:t.filter.pageNo,"page-size":t.filter.pageSize,"show-elevator":"","show-sizer":"",placement:"top","page-size-opts":t.pageConfig},on:{"on-change":t.changePage,"on-page-size-change":t.changePageSize}}),t._v(" "),a("div",{staticClass:"records",staticStyle:{display:"inline-block",height:"32px","line-height":"32px","margin-left":"5%"}},[t._v("\n            当前共"),a("span",{staticStyle:{color:"#f00","font-weight":"bold"}},[t._v(" "+t._s(t.TotalRecords)+" ")]),t._v("条记录\n        ")])],1),t._v(" "),a("Modal",{attrs:{width:"320"},model:{value:t.modalEditor,callback:function(e){t.modalEditor=e},expression:"modalEditor"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),t._v(" "),a("span",[t._v("订单回访")])],1),t._v(" "),a("RadioGroup",{on:{"on-change":t.showOtherInput},model:{value:t.editor.trackStatus,callback:function(e){t.$set(t.editor,"trackStatus",e)},expression:"editor.trackStatus"}},[a("p",{staticStyle:{"font-size":"16px","font-weight":"800"}},[t._v("待跟进")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"301"}},[t._v("未接")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"302"}},[t._v("挂断")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"304"}},[t._v("关机")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"305"}},[t._v("回头联系")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"306"}},[t._v("次月办理")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box",display:"block"},attrs:{label:"307"}},[t._v("其他")]),t._v(" "),t.otherIdea?a("Input",{staticStyle:{width:"90%","margin-top":"10px"},attrs:{placeholder:"请输入其他情况"},model:{value:t.editor.obligate,callback:function(e){t.$set(t.editor,"obligate",e)},expression:"editor.obligate"}}):t._e(),t._v(" "),a("hr"),t._v(" "),a("p",{staticStyle:{"font-size":"16px","font-weight":"800"}},[t._v("关闭")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"1"}},[t._v("成功办理")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"201"}},[t._v("语言不通")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"202"}},[t._v("点错")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"203"}},[t._v("无法配送")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"204"}},[t._v("不办理")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"205"}},[t._v("非王卡套餐")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box"},attrs:{label:"206"}},[t._v("要换套餐")]),t._v(" "),a("Radio",{staticStyle:{width:"28%","margin-right":"0","box-sizing":"border-box",display:"block"},attrs:{label:"207"}},[t._v("其他")]),t._v(" "),t.otherIdeaDown?a("Input",{staticStyle:{width:"90%","margin-top":"10px"},attrs:{placeholder:"请输入其他情况"},model:{value:t.editor.obligate,callback:function(e){t.$set(t.editor,"obligate",e)},expression:"editor.obligate"}}):t._e()],1),t._v(" "),a("hr"),t._v(" "),a("div",[a("p",{staticStyle:{"font-size":"16px","font-weight":"800"}},[t._v("备注")]),t._v(" "),a("Input",{attrs:{type:"textarea",rows:2,placeholder:"请填写备注"},model:{value:t.editor.remarks,callback:function(e){t.$set(t.editor,"remarks",e)},expression:"editor.remarks"}})],1),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"primary",size:"large",long:"",loading:t.modal_loading},on:{click:t.subOrder}},[t._v("确认")])],1)],1),t._v(" "),a("Modal",{staticClass:"modelHistory",attrs:{width:"300"},model:{value:t.modalHistory,callback:function(e){t.modalHistory=e},expression:"modalHistory"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"information-circled"}}),t._v(" "),a("span",[t._v("订单操作历史")]),a("br")],1),t._v(" "),a("div",{staticStyle:{"margin-bottom":"20px"}},[a("p",[t._v("跟单业务："),a("span",[t._v(t._s(t.historyDetaile.productName))])]),t._v(" "),a("p",[t._v("用户号码："),a("span",[t._v(t._s(t.historyDetaile.contactPhone))])]),t._v(" "),a("p",[t._v("下单时间："),a("span",[t._v(t._s(t.historyDetaile.createTime))])])]),t._v(" "),a("Timeline",t._l(t.historyList,function(e,i){return a("TimelineItem",{key:i},[a("p",{staticClass:"time"},[t._v(t._s(e.logInfo+"("+e.operator+")"))]),t._v(" "),a("p",{staticClass:"content"},[t._v(t._s(e.createTime))])])})),t._v(" "),a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"error",size:"large",long:"",loading:t.modal_loading},on:{click:t.historyClose}},[t._v("确定")])],1)],1)],1)},staticRenderFns:[]},t.exports.render._withStripped=!0}});