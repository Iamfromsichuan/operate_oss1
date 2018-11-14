<template>
    <div class="complain_nation2">
        <QuickFilter :taglist="tagList" @gettagIndex='gettagIndex'></QuickFilter>
        <Collapse v-model="collapseName" style="margin: 10px 0">
            <Panel name="1">
                <div style="display:inline-block;float: left;margin-right: 10px" @click.stop>
                    <Select v-model="filter.provinceName" :clearable="true" placeholder="省份" style="width: 100px;">
                        <Option value="">全部</Option>
                        <Option value="新疆">新疆</Option>
                        <Option value="重庆">重庆</Option>
                    </Select>

                   <!-- <DatePicker :value="initTime" type="datetimerange" placement="bottom-start" placeholder="导入时间" style="width: 300px" @on-change="changeTime"></DatePicker>-->
                    <!--<DatePicker type="date" :start-date="new Date(1991, 4, 14)" placeholder="Select date" style="width: 200px"></DatePicker>-->
                    <DatePicker type="datetimerange" format="yyyy-MM-dd" placeholder="请选择查询时间" style="width: 200px"  :value="initTime" @on-change="changeTime"></DatePicker>
                    <Button type="primary" icon="ios-search" @click='search(1)'>查找</Button>
                    <Button type="warning" icon="ios-cloud-download" @click='downloadFile'>导出</Button>
                    <Button type="success" icon="ios-cloud-download" @click='showSend'>派单</Button>
                </div>
                <div slot="content">
                    <Select v-model="filter.cityName" :clearable="true" placeholder="地市" style="width: 100px;">
                        <Option value="">全部</Option>
                        <Option v-for="(item,index) in cityList" :key="index" :value="item.val">{{item.name}}</Option>
                    </Select>
                    <Select v-if="isAll" v-model="filter.productType" placeholder="业务类型" style="width: 100px;">
                        <Option value="" key="1">全部</Option>
                        <Option value="亲情卡" key="2">亲情卡</Option>
                        <Option value="不限量" key="3">不限量</Option>
                        <Option value="宽带" key="4">宽带</Option>
                    </Select>
                    <Select v-model="filter.orderSource" :clearable="true" placeholder="渠道" style="width: 150px;">
                        <Option value="">全部</Option>
                        <Option value="沃视窗">沃视窗</Option>
                        <Option value="营销平台">营销平台</Option>
                        <Option value="沃助手平台">沃助手平台</Option>
                        <Option value="宽带公司">宽带公司</Option>
                    </Select>
                    <Select v-if="isAll" clearable v-model="filter.orderStatus" filterable placeholder="请选择订单状态" style="width: 150px;margin-right: 10px">
                        <Option value="" :key="">全部</Option>
                        <Option value="-1" :key="">待处理</Option>
                        <Option value="1" :key="">成功</Option>
                        <Option value="2" :key="">失败</Option>
                    </Select>
                </div>
                <div style="display:inline-block;float: right;margin-right: 10px;width: 150px" @click.stop>
                    <Input icon="search" placeholder="电话号码" style="width: 90%" v-model='filter.contactPhone' @on-click="search(1)"></Input>
                </div>
            </Panel>
        </Collapse>
        <Table

                :columns="columns"
                :data="datas"
                :loading="dataLoading"
                ref="selection"
                @on-selection-change="removeame"
                size="small"></Table>
        <br>
        <br>
        <div class="page">
            <Page :total="TotalRecords" :current="filter.pageNo" @on-change='changePage' :page-size="filter.pageSize" show-elevator show-sizer placement="top" :page-size-opts="pageConfig" @on-page-size-change="changePageSize" style="display: inline-block;vertical-align: middle;"></Page>
            <div class="records" style="display: inline-block;height: 32px;line-height: 32px;margin-left: 5%;">
                当前共<span style="color: #f00;font-weight: bold;"> {{TotalRecords}} </span>条记录
            </div>
        </div>

        <Modal v-model="modalSend" width="320">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>派单</span>
            </p>
            <p>当前选中订单数：<span style="color: red;">{{selection.length}}</span></p>
            <hr>
            <div>
                <p style="margin-bottom: 10px;font-size: 16px;">指定派送人：</p>
                <!--@on-change="checkedUser"-->
                <Select v-model="model12" filterable  >
                    <Option :value="firstUser.dictionaryCode" :key="firstUser.dictionaryCode">{{ firstUser.dictionaryName }}</Option>
                    <Option v-for="item in userList" :value="item.dictionaryCode" :key="item.dictionaryCode">{{ item.dictionaryName }}</Option>
                </Select>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="sendOrder">确认</Button>
            </div>
        </Modal>
        <!-- 订单回访弹窗 -->
        <Modal v-model="modalEditor" width="320">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>订单回访</span>
            </p>
            <RadioGroup v-model="editor.trackStatus" @on-change="showOtherInput">
                <p style="font-size: 16px;font-weight: 800;">待跟进</p>
                <Radio label="301" style="width: 28%;margin-right: 0;box-sizing: border-box">未接</Radio>
                <Radio label="302" style="width: 28%;margin-right: 0;box-sizing: border-box">挂断</Radio>
                <Radio label="304" style="width: 28%;margin-right: 0;box-sizing: border-box">关机</Radio>
                <Radio label="305" style="width: 28%;margin-right: 0;box-sizing: border-box">回头联系</Radio>
                <Radio label="306" style="width: 28%;margin-right: 0;box-sizing: border-box">次月办理</Radio>
                <Radio label="308" style="width: 28%;margin-right: 0;box-sizing: border-box">无法接通</Radio>
                <Radio label="307" style="width: 28%;margin-right: 0;box-sizing: border-box;display: block;">其他</Radio>
                <Input v-if="otherIdea" placeholder="请输入其他情况" style="width: 90%;margin-top: 10px;"  v-model='editor.obligate'></Input>
                <hr>
                <p style="font-size: 16px;font-weight: 800;">关闭</p>
                <Radio label="1" style="width: 28%;margin-right: 0;box-sizing: border-box">成功办理</Radio>
                <Radio label="201" style="width: 28%;margin-right: 0;box-sizing: border-box">语言不通</Radio>
                <Radio label="202" style="width: 28%;margin-right: 0;box-sizing: border-box">点错</Radio>
                <Radio label="203" style="width: 28%;margin-right: 0;box-sizing: border-box">无法配送</Radio>
                <Radio label="204" style="width: 28%;margin-right: 0;box-sizing: border-box">不办理</Radio>
                <Radio label="205" style="width: 28%;margin-right: 0;box-sizing: border-box">非王卡套餐</Radio>
                <Radio label="206" style="width: 28%;margin-right: 0;box-sizing: border-box">要换套餐</Radio>
                <Radio label="207" style="width: 28%;margin-right: 0;box-sizing: border-box;display: block;">其他</Radio>
                <Input v-if="otherIdeaDown" placeholder="请输入其他情况" style="width: 90%;margin-top: 10px;"  v-model='editor.obligate'></Input>
            </RadioGroup>
            <hr>
            <div>
                <p style="font-size: 16px;font-weight: 800;">备注</p>
                <Input v-model="editor.remarks" type="textarea" :rows="2" placeholder="请填写备注" />
                <!--v-model="value6"-->
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="subOrder">确认</Button>
            </div>
        </Modal>
        <!--订单历史-->
        <Modal v-model="modalHistory" width="300" class="modelHistory">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>订单操作历史</span><br/>
            </p>
            <div style="margin-bottom: 20px;">
                <p>跟单业务：<span>{{historyDetaile.productName}}</span></p>
                <p>用户号码：<span>{{historyDetaile.contactPhone}}</span></p>
                <p>下单时间：<span>{{historyDetaile.createTime}}</span></p>
            </div>
            <Timeline>
                <TimelineItem v-for="(item,index) in historyList" :key="index">
                    <p class="time">{{item.logInfo +'(' + item.operator + ')'}}</p>
                    <p class="content">{{item.createTime}}</p>
                </TimelineItem>
            </Timeline>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="historyClose">确定</Button>
            </div>
        </Modal>
    </div>

</template>

<script>
  import util from '@/libs/util';
  import Cookies from 'js-cookie';
  import {ERR_OK,pageSize} from '@/config/config'
  import QuickFilter from '@/views/main-components/quickFilter'

  export default {
    computed:{
      dates() {
         return this.date
      }
    },
    data() {
      return {
        firstUser:{
          dictionaryCode:'',
          dictionaryName:''
        },
        defaultUser:Cookies.get("user"),
        userList:[],
        model12:[],
        modalSend:false,
        selection:[],
        temp:60*60*2*1000,
        date : new Date(),
        otherIdea:false,
        otherIdeaDown:false,
        historyDetaile:{},
        historyList:[],
        modalHistory:false,
        deliveryOrderNo:'',
        isAll : true,
        tagIndex:'',
        collapseName:'',
        tagList: [ '订单详情','亲情卡','不限量', '宽带'],
        cityList:[{name:'乌鲁木齐',val:'乌鲁木齐'},{name:'吐鲁番',val:'吐鲁番'},{name:'阿勒泰',val:'阿勒泰'},{name:'伊犁',val:'伊犁'},{name:'重庆',val:'重庆'},{name:'四川',val:'四川'},{name:'昌吉',val:'昌吉'},],
        modalEditor:false,
        byte:"",
        InputList:[],//表中有多个字段
        loading:"",
        remark:"",
        // 详情框
        initTime: [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`],
        modal_loading: false,
        // 退款列表相关
        dataLoading: false,
        filter: {
          pageNo: 1,
          pageSize: pageSize,
          trackStatus:'',
          orderStatus:'',
          orderSource:'',
          startTime: '',
          endTime: '',
          cityName:'',
          productName:'',
          provinceName:'',
          contactPhone:'',
          obligate:'',
          token:Cookies.get('token'),
          productType:''//回访订单
        },
        TotalRecords: 0,
        columns: [
          {
            type: 'selection',
            width: 40,
            align: 'center'
          },
          {
            title: '业务',
            align: 'center',
            key: 'productType'
          },
          {
            title: '用户号码',
            align: 'center',
            key: 'contactPhone',
            width:'100'
          },
          {
            title: '地市',
            align: 'center',
            key: 'cityName'
          },
          {
            title: '产品名称',
            align: 'center',
            key: 'productName',
            render: (h, params) => {
              return h('div', {}, [
                h('Tooltip', {
                  props: {
                    content: params.row.productName,
                    placement: 'top-start'
                  },
                  style: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'center',
                    width: '60px'
                  }
                }, params.row.productName)
              ])
            }
          },
          {
            title: '渠道',
            align: 'center',
            key: 'orderSource',
            width:90
           /* render : (h,params) => {
              if(params.row.orderSource.indexOf('沃') < 0) {//<Icon type="settings"></Icon>
                return h('div',{},[
                  h('span',{},params.row.orderSource),//<Icon type="checkmark"></Icon>
                  h('Icon',{
                    props: {
                      type:'checkmark',
                      size:12,
                      color:'red'
                    },
                    style : {
                      marginLeft:"5px"
                    }
                  })
                ])
              }else {
                return h('span',{},params.row.orderSource)
              }
            }*/
          },
          {
            title: '省份',
            align: 'center',
            key: 'provinceName'
          },

          {
            title: '订单状态',
            align: 'center',
            key: 'orderStatus',
            render : (h,params) => {//_disabled: true
              let name ;
              for(let i = 0 ; i < this.statusList.length ; i ++) {
                if(params.row.orderStatus === this.statusList[i].status) {
                  if(params.row.orderStatus === -1) {
                    name = '待跟进'
                  }else {
                    name = this.statusList[i].statusDes;
                  }
                }
              }
              return h('span',{},name)
            }
          },
          {
            title: '创建时间',
            align: 'center',
            key: 'createTime',
            width:'90',
            render: (h, params) => {
              let _that = this;
              let ti = params.row.createTime;
              let timenow = _that.initTimes(ti);
              return h('div',{
                style : {
                  paddingRight : '10px'
                }
              },timenow)
            }
          },
          {
            title: '跟单状态',
            align: 'center',
            key: 'trackStatus',
            width:60,
            className: 'demo-table-info-column1',
            render : (h,params) => {
              let name ;
              for(let i = 0 ; i < this.statusList.length ; i ++) {
                if(params.row.trackStatus === this.statusList[i].status) {
                  name = this.statusList[i].statusDes;
                }
              }
              return h('span',{
                style : {
                  color : '#2d8cf0'
                },
                on : {
                    click : () => {
                      this.deliveryOrderNo = params.row.orderNo;
                      this.historyDetaile = params.row;
                      this.getHistory();
                    }
                }
              },name)
            }
          },
          {
            title: '跟单时间',
            align: 'center',
            key: 'updateTime',
            width:'80',
            render: (h, params) => {
              let _that = this;
              let ti = params.row.updateTime;
              let timenow = _that.initTimes(ti);
              return h('div',{},timenow)
            }
          },
          {
            title: '跟单人',
            align: 'center',
            key: 'receiver',
            width:'60',
          },
          {
            title: '跟单',
            align: 'center',
            width:'60',
            render: (h, params) => {
              let type;
              let icon;
              if(params.row.orderStatus != '-1'){
                type = 'default'
              } else {
                if((( this.date - params.row.updateTime ) >= this.temp) || params.row.receiver.indexOf("自动处理")>=0 ) {
                  type = 'warning'
                }else if(( this.date - params.row.updateTime ) < this.temp ) {
                  type = 'primary'
                }
              }
              if(params.row.orderSource.indexOf('沃') < 0) {//<Icon type="paper-airplane"></Icon>
                    icon = 'paper-airplane'
              }else {
                    icon = 'edit'
              }
              return h('Button', {
                props: {
                  icon: icon,//edit
                  size: 'small',
                  type: type
                },
                on: {
                  click: () => {
                    if(params.row.orderStatus === -1) {
                      this.editor.orderNo = params.row.orderNo;
                      this.editor.productCode = params.row.productCode;
                      this.editor.remarks = '';
                      this.editor.obligate = '';
                      this.editor.trackStatus = 301;
                      this.modalEditor = true;
                    }else {
                      this.$Message.error("订单已关闭，不可修改")
                    }
                  }
                }
              })
            }
          },
          {
            title: '备注',
            align: 'center',
            key: 'remarks',
            width:'220',
          },
        ],
        datas: [],
        pageConfig: [8, 10, 15, 18, 20, 300],
        statusList:[
          {
            status:-1,
            statusDes:'订单创建'
          },
          {
            status:0,
            statusDes:'已预约'
          },
          {
            status:1,
            statusDes:'成功办理'
          },
          {
            status:2,
            statusDes:'失败'
          },
          {
            status:6,
            statusDes:'意向订单'
          },
          {
            status:301,
            statusDes:'未接'
          },
          {
            status:302,
            statusDes:'挂断'
          },
          {
            status:303,
            statusDes:'线路忙'
          },
          {
            status:304,
            statusDes:'关机'
          },
          {
            status:305,
            statusDes:'回头联系'
          },
          {
            status:306,
            statusDes:'次月办理'
          },
          {
            status:308,
            statusDes:'无法接通'
          },
          {
            status:307,
            statusDes:'其他'
          },
          {
            status:201,
            statusDes:'语言不通'
          },
          {
            status:202,
            statusDes:'点错'
          },
          {
            status:203,
            statusDes:'无法配送'
          },
          {
            status:204,
            statusDes:'不办理'
          },
          {
            status:205,
            statusDes:'非王卡套餐'
          },
          {
            status:206,
            statusDes:'要换套餐'
          },
          {
            status:999,
            statusDes:'订单关闭'
          },
          {
              status:207,
              statusDes:'其他'
          }
        ],
        editor: {//editor.remarks
          orderNo:'',
          orderStatus:'',
          trackStatus:'301',
          remarks:'',
          productCode:'',
          obligate:'',
          token:Cookies.get('token'),
        },
        times : setInterval(()=>this.date=(new Date()).getTime(),1000)
      }
    },
    methods: {
      removeame(s) {
        this.selection = [];
        this.selection = s.map((item,index)=>{
          return item.orderNo
        });
        console.log(this.selection)
      },
      sendOrder() {
        if(!this.model12) {
          this.$Message.error("请选择派送人");
          return
        }
        let _that = this;
        let a = this.selection.join(',');
        util.ajax.get(util.baseUrl + '/core/orders/delivery/dispatch', {
          params: {
            orderNos:_that.selection.join(','),
            dictionaryCodes:_that.model12
          }
        })
          .then(function(res){
            console.log(res);
            if(res.status == ERR_OK) {
              _that.$Message.success(res.data.msg);
               _that.modalSend = false
            }
          })
          .catch(function(err){
            console.log(err)
          });
      },
      getUserList() {
        let _that = this;
        util.ajax.get(util.baseUrl + '/system/data/dictionary/list', {
          params: {
            dictionaryType:'登录名'
          }
        })
          .then(function(res){
            console.log(res.data);
            if(res.status == ERR_OK) {
                _that.userList = res.data;
                let first = Cookies.get('user');
                let _index ;
                _index = _that.userList.findIndex((item)=> {
                    return item.dictionaryName == first
               });
              _that.firstUser = _that.userList.splice(_index,1)[0];
              console.log(_that.firstUser);
              console.log(_that.userList)
            }
          })
          .catch(function(err){
            console.log(err)
          });
      },
      /*checkedUser(val) {
        console.log(val)
      },*/
      showSend() {
        if(this.selection.length > 0 ) {
          this.model12 = '';
          this.modalSend = true
        }else {
            this.$Message.error("请先选择需要派送的订单")
        }
      },
      name(s,r) {
        this.selection = [];
        this.selection = s.map((item,index)=>{
          return item.orderNo
        }) ;
        console.log(this.selection)
      },
      initTimes(val) {
        let time = new Date(val);
        let compar = function (va) {
          if(va >= 10) {
                return va
          }else if(va < 10) {
                return 0 + '' + va
          }
        };
        var noeTime = compar(time.getMonth()+1) + '-' + compar(time.getDate()) + ' ' + compar(time.getHours()) +':'+ compar(time.getMinutes());
        return noeTime;
      },
      showOtherInput(val) {
        if(val == 307) {
          this.otherIdea = true;
          this.otherIdeaDown = false;
          return
        }else if(val == 207) {
           this.otherIdeaDown = true;
          this.otherIdea = false;
            return
        }
        this.otherIdea = false;
        this.otherIdeaDown = false;
      },
      historyClose() {
        this.modalHistory = false;
      },
      getHistory() {
        let _that = this;
        util.ajax.get(util.baseUrl + '/core/orders/delivery/logList', {
          params: {
            deliveryOrderNo:this.deliveryOrderNo,
            token:_that.filter.token
          }
        })
          .then(function(res){
            _that.dataLoading = false;
            if(res.data.status == ERR_OK) {
               _that.historyList = res.data.data.list.reverse();
               for(let i = 0; i < _that.statusList.length ; i ++) {
                    for(let j = 0 ; j < _that.historyList.length ; j++) {
                      if(_that.historyList[j].logInfo == _that.statusList[i].status) {
                        _that.historyList[j].logInfo = _that.statusList[i].statusDes
                      }
                    }
               }
               _that.modalHistory = true
            }else {

            }
          })
          .catch(function(err){
            console.log(err)
          });
      },
      gettagIndex(index) {
        this.tagIndex = index;
        this.filter.productType = '亲情卡';
        this.filter.orderStatus = -1;
        this.initTime = [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`]
        if(index === -1 || index === 0) {
          this.filter.productType = '';
          this.filter.orderStatus = '';
          this.initTime = [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`]
          this.cityList = [{name:'乌鲁木齐',val:'乌鲁木齐'},{name:'吐鲁番',val:'吐鲁番'},{name:'阿勒泰',val:'阿勒泰'},{name:'伊犁',val:'伊犁'},{name:'重庆',val:'重庆'},{name:'四川',val:'四川'},{name:'昌吉',val:'昌吉'},];
          this.isAll = true
        }else if(index === 1){
          this.initTime = ['',''];
          this.filter.orderStatus = -1;
          this.filter.productType = '亲情卡';
          this.cityList = [{name:'乌鲁木齐',val:'乌鲁木齐'},{name:'吐鲁番',val:'吐鲁番'},{name:'阿勒泰',val:'阿勒泰'},{name:'重庆',val:'重庆'}];
          this.isAll = false
        }else if(index === 2) {
          this.initTime = ['',''];
          this.filter.orderStatus = -1;
          this.filter.productType = '不限量';
          this.cityList = [{name:'昌吉',val:'昌吉'}];
          this.isAll = false
        }else if(index === 3) {
          this.initTime = ['',''];
          this.filter.orderStatus = -1;
          this.filter.productType = '宽带';
          this.cityList = [{name:'乌鲁木齐',val:'乌鲁木齐'},{name:'四川',val:'四川'}];
          this.isAll = false
        }
        this.filter.startTime = this.initTime[0];
        this.filter.endTime = this.initTime[1];
        this.search(1)
      },
      subOrder() {
        let _that = this ;
        console.log(this.editor.trackStatus)
        if(this.editor.trackStatus) {
          this.dataLoading = true;
          let isTrue = false;
          let arr = [-1,301,302,303,304,305,306,307,308];
          for (let i = 0 ; i < arr.length ; i++) {//为false 是待处理   为true  就是关闭
            if(arr[i] == this.editor.trackStatus) {
              isTrue = true;
            }
          }
          if(isTrue) {
            this.editor.orderStatus = -1//待处理订单
            if(this.editor.trackStatus == 307) {
                if(!this.editor.obligate) {
                  this.dataLoading = false;
                  this.$Message.error("请填写--其他--的详细跟单状态，必填");
                  return
                }
            }
          }else {
            if(this.editor.trackStatus == 2) {
              this.editor.orderStatus = 2//失败
            }else if(this.editor.trackStatus == 1) {
              this.editor.orderStatus = 1//成功
            }else {
              if(this.editor.trackStatus == 207) {
                console.log(this.editor.obligate)
                if(!this.editor.obligate) {
                  this.dataLoading = false;
                  this.$Message.error("请填写--其他(失败)--的详细跟单情况，必填");
                  return
                }
              }
              this.editor.orderStatus = 2//失败
            }
          };
          util.ajax.get(util.baseUrl + '/core/orders/delivery/update', {
            params: this.editor
          })
            .then(function(res){
              _that.dataLoading = false;
              if(res.data.status == ERR_OK) {
                _that.modalEditor = false;
                _that.search(_that.filter.pageNo)
              }else {
                _that.$Message.error(res.data.msg)
              }
            })
            .catch(function(err){
              console.log(err)
            });
        }else {
          this.$Message.error("请选择需要修改的状态")
        }
      },
      changeTime(time) {
        if(time.length) {
          this.filter.startTime = time[0] + " " +"00:00:00";
          this.filter.endTime = time[1] + " " + "23:59:59"
        }else {
          this.filter.startTime = ''
          this.filter.endTime = ''
        }
      },
      search(no) {
        var _that = this;
        this.filter.pageNo = no;
        this.dataLoading = true;
        this.orderNos = '';
        this.checkedDatas = [];
        util.ajax.get(util.baseUrl + '/core/orders/delivery/list', {
          params: this.filter
        })
          .then(function(res){
            _that.wscCode =''
            _that.dataLoading = false
            if(res.data.status == ERR_OK) {
              let dataList = res.data.data.list;
              _that.datas = dataList.map((item) => {
                if(item.orderStatus != -1) {
                  return Object.assign({},item,{
                    _disabled: true
                  })
                }
                return item
              });
              /*_that.datas = res.data.data.list;*/
              _that.TotalRecords = res.data.data.total
            }else {
              _that.$Message.error(res.data.msg)
            }
          })
          .catch(function(err){
            console.log(err)
          });
      },
      changePageSize(pageSize) {
        this.filter.pageSize = pageSize
        this.search(1)
      },
      changePage(no) {
        this.search(no)
      },
      /*exportOut() {
          let _url = `${util.baseUrl}/qgcu/refund/exportExcel?token=${Cookies.get('token')}${util.parseParam(this.filter)}`
          window.location.href = _url
      },*/
      downloadFile() {
        let _that = this ;
        let downObj = Object.assign({},_that.filter);
        delete downObj.pageNo;
        delete downObj.pageSize;
        window.location.href = `${util.baseUrl}/core/orders/delivery/export?token=${Cookies.get('token')}${util.parseParam(downObj)}`
      }
    },
    components: {QuickFilter},//Statistic
    created() {
      this.filter.startTime = this.initTime[0];
      this.filter.endTime = this.initTime[1];
      this.getUserList();
      this.search(1);
    },
    destroyed() {
      clearInterval(this.times);
    }
  }
</script>
<style type="text/css">
    .complain_nation2 .ivu-table-cell{
        padding: 0;
    }
    .complain_nation2 .page{
        background: #fff;
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 999999;
    }
    .complain_nation2 .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
        padding-left: 10px;
    }
    .ivu-table thead .demo-table-info-column {
        border-left: none;
        border-right: none;
    }
    .ivu-table .demo-table-info-column{
       border-right: 1px solid blue;
    }
    .ivu-table .demo-table-info-column1{
        border-left: 1px solid blue;
    }
    .ivu-table .demo-table-info-row {
        border-left: none!important;
    }
   .ivu-modal-header{
        border-bottom: none!important;
    }
    .modelHistory{
        background: #BBBBBB;
    }
    .ivu-table .demo-row td{
        background-color: red;
    }
</style>

<style lang="less" scoped>
    .ivu-form-item {
        display: inline-block;
        width: 30%;
        margin-bottom: 10px;
    }
    hr{
        margin: 10px 0;
        border-top: 1px solid #2196F3;
    }
</style>
