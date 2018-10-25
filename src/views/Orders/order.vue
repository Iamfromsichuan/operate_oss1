
<template>
    <div class="messageList messageList_m">
        <Row :gutter="5">
            <Col span="3">
                <Select clearable v-model="filter.provinceCode" filterable placeholder="请选择省份名称">
                    <Option v-for="item in items" :value="item.dictionaryCode" :key="item.dictionaryCode">{{ item.dictionaryName }}</Option>
                </Select>
            </Col>
            <Col span="3">
                <Select clearable v-model="filter.orderStatus" filterable placeholder="请选择订单状态">
                    <Option value="0">充值中</Option>
                    <Option value="1">成功</Option>
                    <Option value="2">失败</Option>
                    <Option value="3">待查单</Option>
                    <Option value="4">订单异常</Option>
                </Select>
            </Col>
            <Col span="3">
                <Input placeholder="电话号码" style="width: 100%" v-model="filter.mobileNumber"></Input>
            </Col>
            <Col span="2">
                <Input placeholder="订单类型" style="width: 100%" v-model="filter.productType"></Input>
            </Col>
            <Col span="2">
                <Select clearable v-model="filter.netStop" filterable placeholder="请输入网别">
                    <Option value="23G">23G</Option>
                    <Option value="4G">4G</Option>
                </Select>
            </Col>

            <Col span="6">
                <Button type="primary" icon="ios-search" @click="search(1)">查找</Button>
                <Button type="success" icon="ios-cloud-download" @click="download">导出</Button>
                <Button type="success" icon="ios-cloud-download" @click="moreSearch = !moreSearch">更多查找</Button>
            </Col>
        </Row>
        <Row v-if="moreSearch" :gutter="5" style="margin-top: 10px;">
            <Col span="6">
                <DatePicker :value="initTime" type="datetimerange" placement="bottom-start" placeholder="导入时间" style="width: 100%" @on-change="changeTime"></DatePicker>
            </Col>
            <Col span="4">
                <Input placeholder="订单编号" style="width: 100%" v-model="filter.orderNo"></Input>
            </Col>
        </Row>
        <br>
        <Table :columns="columns" :data="datas" :loading="dataLoading"></Table>
        <br>
        <Page :total="totalRecords" :current="filter.pageNo" @on-change='changePage' :page-size="filter.pageSize"></Page>
        <br>
        <Modal
                v-model="modal1"
                width="1200"
                @on-ok="ok"
                @on-cancel="cancel">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>详情展示</span>
            </p>
            <Row>
                <Col span="8">
                    <Table border :columns="columns1" :data="objectList.slice(0,12)"></Table>
                </Col>
                <Col span="8">
                    <Table border :columns="columns1" :data="objectList.slice(12,21).concat(objectList.slice(24))"></Table>
                </Col>
                <Col span="8">
                    <Table border :columns="columns1" :data="objectList.slice(21,24)"></Table>
                </Col>
            </Row>
            <!--<div v-for="(item,key) in objectList" style="width: 50%;display: inline-block">

            </div>-->
        </Modal>
        <Modal v-model="modalCancel" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>重新充值订单</span>
            </p>
            <div style="text-align:center">
                <Input v-model="cancelObj.remarks" placeholder="备注"></Input>
                <p>此操作会重新充值该订单</p>
                <p>确定重冲么？</p>
            </div>
            <div slot="footer">
                <Button type="error" size="large" long :loading="modal_loading" @click="cancel">确定</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import Cookies from 'js-cookie'
    import util from '@/libs/util'
    import {ERR_OK,pageSize} from '@/config/config'
    export default {
        data () {
            return {
                cancelObj:{
                  orderNo:'',
                  remarks:''
                },
                modalCancel:false,
                moreSearch:false,
                modal1:false,
                modal_loading:false,
                items:"",
                CodeAndName:"",
                initTime: [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`],
                filter: {
                    mobileNumber:"",//电话号码
                    startTime: '',
                    endTime: '',
                    productType:"",//产品类型
                    provinceName:"",//来源
                    netStop:"",//网别
                    orderStatus:"",//订单状态
                    provinceCode:"",//省份
                    orderNo:'',
                    pageNo:1,
                    pageSize: pageSize
                },
                objectList:[],
                totalRecords: 0,
                dataLoading: false,
                columns1:[
                    {
                        title: '字段',
                        key: 'title',
                    },

                    {
                        title: '内容',
                        key: 'name',
                    },
                ],
                columns: [
                    {
                        title: '电话号码',
                        key: 'mobileNumber',
                    },
                    {
                        title: '产品名称',
                        key: 'productName',
                          render: (h, params) => {
                            return h('Tooltip', {
                                props: {
                                    content: params.row.productName ? params.row.productName : '点击添加',
                                    placement: 'top-start',
                                },
                                style: {
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    textAlign: 'left',
                                    width: '60'
                                }
                            },params.row.productName)
                        }
                    },
                    {
                        title: '订单来源',
                        key: 'orderSource'
                    },
                    {
                       title: '网别',
                       key: 'netStop'
                    },
                    {
                        title: '渠道类型',
                        key: 'channelType'
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus',
                        render:(h,params) => {
                            return h('Span',
                              {},
                              params.row.orderStatus === 0 ? '充值中' : params.row.orderStatus === 1 ? '成功' : params.row.orderStatus === 2 ? '失败' : params.row.orderStatus === 3 ? '待查单' : params.row.orderStatus === 4 ? '订单异常' : ''
                            )
                        }
                    },
                    {
                        title: '充值说明',
                        key: 'orderContent',
                      render: (h, params) => {
                        return h('Poptip', {
                          props: {
                            trigger: "hover",
                            width: (params.index===0 || params.index===1 || params.index===2)&&(params.row.orderContent.length > 100) ? 1000 : 400,
                            content: params.row.orderContent ? params.row.orderContent : '点击添加'
                          },
                          style: {
                            whiteSpace: 'normal',
                            color:(params.row.orderContent=='操作成功' || params.row.orderContent=='订购成功')?'green':'red'
                          }
                        }, (params.row.orderContent=='操作成功' || params.row.orderContent=='订购成功')? params.row.orderContent : '查看详情')
                      }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '省份编码',
                        key: 'provinceCode'
                    },
                    {
                        title: '短信内容',
                        key: 'smsContent',
                        width:'auto',
                        render: (h, params) => {
                            return h('Poptip', {
                                props: {
                                    trigger: "hover",
                                    width: '400',
                                    content: params.row.smsContent ? params.row.smsContent : '点击添加'
                                },
                                style: {
                                    whiteSpace: 'normal'
                                }
                            }, [
                                h('Button', {props: {
                                        icon: 'edit',
                                        size: 'small',
                                        type:  'primary'
                                    }})
                            ])
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            if(params.row.orderStatus !== 4) {
                              return h('div', [
                                h('Button', {
                                  props: {
                                    type: 'warning',
                                    size: 'small'
                                  },
                                  on: {
                                    click:()=>{
                                      let _that = this;//foundColumns
                                      _that.objectList  = [];
                                      for(let i in params.row) {
                                        for(let b = 0; b< _that.foundColumns.length ; b++ ) {
                                          if(i === _that.foundColumns[b].key) {
                                            let obj = {};
                                            obj.name = params.row[i];
                                            _that.objectList.push(Object.assign({},_that.foundColumns[b],obj))
                                          }
                                        }
                                      }
                                      this.modal1 = true
                                    }
                                  }
                                }, '查看详情'),
                              ]);
                            }else {
                                return h('div', [
                                  h('Button', {
                                    props: {
                                      type: 'warning',
                                      size: 'small'
                                    },
                                    style : {marginRight:5},
                                    on: {
                                      click:()=>{
                                        let _that = this;//foundColumns
                                        _that.objectList  = [];
                                        for(let i in params.row) {
                                          for(let b = 0; b< _that.foundColumns.length ; b++ ) {
                                            if(i === _that.foundColumns[b].key) {
                                              let obj = {};
                                              obj.name = params.row[i];
                                              _that.objectList.push(Object.assign({},_that.foundColumns[b],obj))
                                            }
                                          }
                                        }
                                        this.modal1 = true
                                      }
                                    }
                                  }, '详情'),///core/orders/abnormalEdit
                                  h('Button', {
                                    props: {
                                      type: 'error',
                                      size: 'small'
                                    },
                                    style: {
                                      marginRight: '5px'
                                    },
                                    on: {
                                      click: () => {
                                        this.cancelObj.orderNo = params.row.orderNo
                                        this.modalCancel = true;
                                      }
                                    }
                                  }, '重冲')
                                ]);
                              }
                            }
                        }
                ],
                foundColumns: [
                    {
                        title: '电话号码',
                        key: 'mobileNumber',
                    },
                    {
                        title: '网别',
                        key: 'netStop'
                    },
                    {
                        title: '订单来源',
                        key: 'orderSource'
                    },
                    {
                        title: '产品类型',
                        key: 'productType'
                    },
                    {
                        title: '订单状态',
                        key: 'orderStatus'
                    },
                    {
                        title: '省份编码',
                        key: 'provinceCode'
                    },
                    {
                        title: '短信内容',
                        key: 'smsContent'
                    },
                    {
                        title: '返回时间',//
                        key: 'responseTime',
                        align: 'center',
                        width:200
                    },
                    {
                        title: '返回状态',
                        key: 'responseData'
                    },
                     {
                         title: '订单号',
                         key: 'orderNo'
                     },
                     {
                         title: '开始时间',
                         key: 'startTime'
                     },
                     {
                         title: '结束时间',
                         key: 'endTime'
                     },
                     {
                         title: '产品编码',
                         key: 'productCode',
                     },
                     {
                         title: '流水号',
                         key: 'transId',
                     },


                     {
                         title: '产品名称',
                         key: 'productName'
                     },

                     {
                         title: '通道编码',
                         key: 'passagewayCode'
                     },
                     {
                         title: '渠道类型',
                         key: 'channelType'
                     },
                     {
                         title: '附加数据',
                         key: 'attachData'
                     },
                     {
                         title: '充值策略',
                         key: 'rechargeStrategy'
                     },
                     {
                         title: '充值策略数据',
                         key: 'rechargeStrategyData'
                     },
                     {
                         title: '充值路径',
                         key: 'rechargeProfile'
                     },
                     {
                         title: '充值索引',
                         key: 'rechargeIndex'
                     },

                     {
                         title: '订单内容',
                         key: 'orderContent'
                     },

                     {
                         title: '请求数据',
                         key: 'requestData'
                     },
                     {
                         title: '响应数据',
                         key: 'responseData'
                     },

                     {
                         title: '创建时间',
                         key: 'createTime'
                     },

                     {
                         title: '查单请求数据',
                         key: 'queryRequestData'
                     },
                     {
                         title: '查单响应数据',
                         key: 'queryResponseData'
                     },
                     {
                         title: '备注',
                         key: 'remarks'
                     },

                ],
                datas: []
            }
        },
        methods: {
            commoneRender(h, params,name) {
                return h('Tooltip', {
                    props: {
                        content: params.row[name] ? params.row[name] : '点击添加',
                        placement: 'top-start',
                    },
                    style: {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'left',
                        width: '60'
                    }
                },params.row[name])

            },
            ok() {

            },
            cancel() {
              let _that = this;
              util.ajax.get(util.baseUrl + '/core/orders/abnormalEdit', {
                params: {
                  orderNo : this.cancelObj.orderNo,
                  remarks:this.cancelObj.remarks
                }
              })
                .then(function(res){
                  if(res.status == ERR_OK) {
                    _that.$Message.success("操作成功");
                    _that.modalCancel = false;
                    _that.dataLoading = false;
                    _that.search(1);
                  }else {
                    _that.$Message.error(res.msg);
                    _that.dataLoading = false
                  }
                })
                .catch(function(err){
                  console.log(err);
                });
            },
            changeTime(time) {
                if(time.length) {
                    this.filter.startTime = time[0]
                    this.filter.endTime = time[1]
                }else {
                    this.filter.startTime = ''
                    this.filter.endTime = ''
                }
            },
            search(no) {
                var _that = this
                this.filter.pageNo = no
                this.dataLoading = true
                util.ajax.get(util.baseUrl + '/core/orders/list', {
                    params: this.filter
                })
                    .then(function(res){
                        if(res.status == ERR_OK) {
                            _that.datas = res.data.data.list
                            _that.totalRecords = res.data.data.total
                            _that.dataLoading = false
                        }else {
                            _that.$Message.error(res)
                            _that.dataLoading = false
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            },
            changePage(no) {
                this.search(no)
            },
            download() {
                window.location.href = util.baseUrl + '/core/orders/export?token='+Cookies.get('token') + util.parseParam(this.filter)
            },
            getProvinceName(name){
                var _that = this
                util.ajax.get(util.baseUrl + '/system/data/dictionary/list',{
                    params:{
                        dictionaryType:name
                    }
                })
                    .then(function(res){
                        console.log(res)
                        _that.items = res.data
                        _that.dataLoading = false
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }
        },
        created() {
            this.filter.startTime = this.initTime[0]
            this.filter.endTime = this.initTime[1]
            this.getProvinceName("省份");
        }
    }
</script>
<style  lang="less">
    .messageList .vertical-center-modal {
        display: flex;
        align-items: center;
        justify-content: center;
        .ivu-modal{
            top: 0;
        }
    }
    .messageList .ivu-modal-body{
        overflow: auto!important;
    }
    .messageList_m .ivu-poptip-inner{
        white-space: normal!important;
        font-size: 14px;
        top: -50px!important;
    }
    .messageList .ivu-checkbox-inner{
        border: 1px solid #2196F3;
    }
    .messageList .ivu-table th{
        overflow: visible!important;
    }
    .messageList .ivu-table .ivu-btn-ghost{
        background-color: #E0E0E0;
    }
    .messageList .page{
        background: #fff;
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 999999;
    }
    .messageList .ivu-table{
        color: #000;
    }
    .messageList .ivu-table .ivu-table-cell .ivu-btn{
        min-width: 28px;
        min-height: 24px;
    }
    .messageList .ivu-tooltip-inner{
        white-space:normal
    }

</style>
<!--messageList-->
