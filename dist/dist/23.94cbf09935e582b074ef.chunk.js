webpackJsonp([23],{287:function(e,t,s){s(896);var o=s(4)(s(897),s(898),null,null);o.options.__file="D:\\项目\\operate_oss\\src\\views\\shortMessageModule\\sendMessage.vue",o.esModule&&Object.keys(o.esModule).some(function(e){return"default"!==e&&"__esModule"!==e})&&console.error("named exports are not supported in *.vue files."),o.options.functional&&console.error("[vue-loader] sendMessage.vue: functional components are not supported with templates, they should use render functions."),e.exports=o.exports},896:function(e,t){},897:function(e,t,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=s(14),n=function(e){return e&&e.__esModule?e:{default:e}}(o),i=s(62);t.default={computed:{disabled:function(){return!this.message.phones.length||!this.message.content.length},number:function(){return this.message.phones?this.message.phones.split(",").length:0},provinceNameUnique:function(){var e=this;if(e.spCodeList=[],e.proviceName){console.log(this.provinceNames);for(var t=0;t<this.provinceNames.length;t++)this.provinceNames[t].provinceName==e.proviceName&&e.spCodeList.push(e.provinceNames[t].spCode)}else this.spCodeList=[""];return e.spCodeList}},data:function(){return{spCode:"",proviceName:"",spCodeList:[],isCh:!1,modalConfirm:!1,loading:!1,message:{phones:"",content:"",provinceCode:"",spCode:""},provinceNameList:[],provinceNames:[]}},methods:{getSpCode:function(){var e=this;n.default.ajax.get(n.default.baseUrl+"/tool/sp/config/list").then(function(t){console.log(t),t.data.status==i.ERR_OK||e.$Message.error(t.msg)}).catch(function(e){console.log(e)})},inInfro:function(e){var t=e.split("\n");t[t.length-1]?this.message.phones=e.split("\n").join(","):(t.pop(),this.message.phones=t.join(","))},send:function(){var e=this;return this.message.phones.length?this.message.content.length?this.message.phones.split(",").length>200?void e.$Notice.error({title:"错误报告",desc:"电话数超过200",duration:999}):void n.default.ajax.get(n.default.baseUrl+"/tool/sp/config/list").then(function(t){if(t.status==i.ERR_OK){e.provinceNames=t.data;var s=void 0;s=t.data.map(function(e){return e.provinceName});for(var o=0;o<s.length;o++)(function(e,t){for(var s=0;s<e.length;s++)if(e[s]==t)return!0;return!1})(e.provinceNameList,s[o])||e.provinceNameList.push(s[o]);e.modalConfirm=!0}else e.$Message.error(t.msg)}).catch(function(e){console.log(e)}):void this.$Message.warning("请输入需要发送的内容!"):void this.$Message.warning("请输入需要发送的号码!")},comfirmSend:function(){var e=this;if(this.loading=!0,!this.proviceName||!this.spCode)return void e.$Message.error("请选择省份或spCode");this.message.proviceName=this.proviceName;var t=this.provinceNames.findIndex(function(t){return t.provinceName==e.proviceName});console.log(t),this.message.proviceCode=this.provinceNames[t].provinceCode,this.message.spCode=this.spCode,n.default.ajax.get(n.default.baseUrl+"/sms/mt/sendTxt",{params:this.message}).then(function(t){e.modalConfirm=!1,e.loading=!1,t.data.status==i.ERR_OK?e.$Notice.success({title:"发送状态",desc:t.data.msg,duration:999}):e.$Notice.error({title:"发送状态",desc:t.data.msg,duration:999})}).catch(function(t){console.log(t),e.$Message.error(t)})},reset:function(e){e?this.message.content="":this.message.phones=""}},watch:{spCode:function(){console.log(this.spCode)}}}},898:function(e,t,s){e.exports={render:function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"sendMessage"},[s("Row",[s("i-col",{attrs:{span:"10"}},[s("i-input",{attrs:{type:"textarea",rows:8,placeholder:"请输入需要发送的号码(用,分隔)"},on:{input:e.inInfro},model:{value:e.message.phones,callback:function(t){e.$set(e.message,"phones",t)},expression:"message.phones"}}),e._v(" "),s("p",{staticStyle:{"text-align":"right","font-size":"16px","padding-right":"20px"}},[e._v("当前号码数："),s("span",{staticStyle:{color:"red"}},[e._v(e._s(e.number))]),e._v("/200")])],1),e._v(" "),s("i-col",{attrs:{span:"2",push:"1"}},[s("br"),e._v(" "),s("br"),e._v(" "),s("i-button",{attrs:{type:"error",icon:"ios-arrow-left",long:"",size:"large"},on:{click:function(t){e.reset(0)}}},[e._v("重置号码")]),e._v(" "),s("br"),e._v(" "),s("br"),e._v(" "),s("br"),e._v(" "),s("i-button",{attrs:{type:"warning",icon:"ios-arrow-right",long:"",size:"large"},on:{click:function(t){e.reset(1)}}},[e._v("重置内容")])],1),e._v(" "),s("i-col",{attrs:{span:"10",push:"2"}},[s("i-input",{attrs:{type:"textarea",rows:8,placeholder:"请输入短信内容"},model:{value:e.message.content,callback:function(t){e.$set(e.message,"content",t)},expression:"message.content"}}),e._v(" "),s("p",{staticStyle:{"text-align":"right","font-size":"16px","padding-right":"20px"}},[e._v("当前字数 ："),s("span",{staticStyle:{color:"red"}},[e._v(e._s(e.message.content.length))]),e._v("/140 ")])],1)],1),e._v(" "),s("br"),e._v(" "),s("Row",[s("i-col",{attrs:{span:"12",push:"6"}},[s("i-button",{attrs:{type:"primary",icon:"email",long:"",size:"large",disabled:e.disabled,loading:e.loading},on:{click:e.send}},[e._v("发送")])],1)],1),e._v(" "),s("br"),e._v(" "),s("Modal",{attrs:{width:"360"},model:{value:e.modalConfirm,callback:function(t){e.modalConfirm=t},expression:"modalConfirm"}},[s("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[s("Icon",{attrs:{type:"information-circled"}}),e._v(" "),s("span",[e._v("确认发送")])],1),e._v(" "),s("div",{staticStyle:{"text-align":"center"}},[s("p",{staticStyle:{"margin-bottom":"10px"}},[e._v("总共 "+e._s(e.message.phones.split(",").length)+" 个号码")]),e._v(" "),s("Select",{staticStyle:{width:"40%"},attrs:{filterable:"",placeholder:"省份"},model:{value:e.proviceName,callback:function(t){e.proviceName=t},expression:"proviceName"}},e._l(e.provinceNameList,function(t,o){return s("Option",{key:o,attrs:{value:t}},[e._v(e._s(t))])})),e._v(" "),s("Select",{staticStyle:{width:"40%"},attrs:{filterable:"",placeholder:"spCode"},model:{value:e.spCode,callback:function(t){e.spCode=t},expression:"spCode"}},e._l(e.provinceNameUnique,function(t){return s("Option",{key:t,attrs:{value:t}},[e._v(e._s(t))])})),e._v(" "),s("p",{staticStyle:{"margin-top":"10px"}},[e._v("确认发送吗？")])],1),e._v(" "),s("div",{attrs:{slot:"footer"},slot:"footer"},[s("Button",{attrs:{type:"primary",size:"large",long:""},on:{click:e.comfirmSend}},[e._v("确认发送")])],1)])],1)},staticRenderFns:[]},e.exports.render._withStripped=!0}});