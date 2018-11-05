<template>
    <div class="complain_nation2">
        <QuickFilter :taglist="tagList" @gettagIndex='gettagIndex'></QuickFilter>
        <Collapse v-model="collapseName" style="margin: 10px 0">
            <Panel name="1">
                <div style="display:inline-block;float: left;margin-right: 10px" @click.stop>
                    <Select v-model="filter.provinceName" :clearable="true" placeholder="地市" style="width: 100px;">
                        <Option value="重庆">重庆</Option>
                        <Option value="新疆">新疆</Option>
                    </Select>
                   <!-- <DatePicker :value="initTime" type="datetimerange" placement="bottom-start" placeholder="导入时间" style="width: 300px" @on-change="changeTime"></DatePicker>-->
                    <!--<DatePicker type="date" :start-date="new Date(1991, 4, 14)" placeholder="Select date" style="width: 200px"></DatePicker>-->
                    <DatePicker type="datetimerange" format="yyyy-MM-dd" placeholder="Select date and time(Excluding seconds)" style="width: 200px"  :value="initTime" @on-change="changeTime"></DatePicker>
                    <Button type="primary" icon="ios-search" @click='search(1)'>查找</Button>
                    <Button type="primary" icon="ios-cloud-download" @click='downloadFile'>导出</Button>
                </div>
                <div slot="content">
                    <Select v-model="filter.productType" placeholder="业务类型" style="width: 100px;">
                        <Option value="低消" key="1">低消</Option>
                        <Option value="月包" key="2">月包</Option>
                        <Option value="内容包" key="3">内容包</Option>
                        <Option value="畅越" key="4">畅越</Option>
                        <Option value="其他" key="5">其他</Option>
                    </Select>
                    <Select v-model="filter.provinceName" :clearable="true" placeholder="地市" style="width: 100px;">
                        <Option value="重庆">重庆</Option>
                        <Option value="新疆">新疆</Option>
                    </Select>
                    <Select clearable v-model="filter.orderStatus" filterable placeholder="请选择订单状态" style="width: 100px;margin-right: 10px">
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
      <!--  <Row :gutter="10" style="margin: 10px 0">
            <Col span="2">
                <Input v-model="filter.productName" placeholder="产品名称" clearable ></Input>
            </Col>
            <Col span="3">
                <Input v-model="filter.contactPhone" placeholder="联系电话" clearable ></Input>
            </Col>
            <Col span="2">
                <Input v-model="filter.provinceName" placeholder="省份名称" clearable ></Input>
            </Col>
            <Col span="2">
                <Input v-model="filter.cityName" placeholder="地市名称" clearable ></Input>
            </Col>
            <Col span="2">
                <Input v-model="filter.orderStatus" placeholder="订单状态" clearable ></Input>
            </Col>
            <Col span="2">
                <Input v-model="filter.trackStatus" placeholder="跟单状态" clearable ></Input>
                &lt;!&ndash;<Select clearable v-model="filter.procStatus" filterable placeholder="请选择处理状态">
                    <Option value="-1" :key="">未处理</Option>
                    <Option value="1" :key="">成功</Option>
                    <Option value="2" :key="">无效</Option>
                </Select>&ndash;&gt;
            </Col>
            <Col span="2">
                <Input v-model="filter.orderSource" placeholder="订单来源" clearable ></Input>
            </Col>
            <Col span="6">
                <DatePicker :value="initTime" type="datetimerange" placement="bottom-start" placeholder="导入时间" style="width: 100%" @on-change="changeTime"></DatePicker>
            </Col>
            <Col span="3">
                <Button type="primary" icon="ios-search" @click='search(1)'>查找</Button>
                <Button type="primary" icon="ios-cloud-download" @click='downloadFile'>下载</Button>
            </Col>
        </Row>-->
        <Table
                :columns="columns"
                :data="datas"
                :loading="dataLoading"
                size="small"></Table>

        <br>
        <br>
        <div class="page">
            <Page :total="TotalRecords" :current="filter.pageNo" @on-change='changePage' :page-size="filter.pageSize" show-elevator show-sizer placement="top" :page-size-opts="pageConfig" @on-page-size-change="changePageSize" style="display: inline-block;vertical-align: middle;"></Page>
            <div class="records" style="display: inline-block;height: 32px;line-height: 32px;margin-left: 5%;">
                当前共<span style="color: #f00;font-weight: bold;"> {{TotalRecords}} </span>条记录
            </div>
        </div>
        <!-- 删除 -->
        <Modal v-model="modalEditor" width="320">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>订单回访</span>
            </p>
            <RadioGroup v-model="editor.trackStatus">
                <p>待跟进</p>
                <Radio label="301">未接</Radio>
                <Radio label="302">挂断</Radio>
                <Radio label="303">线路忙</Radio>
                <Radio label="304">关机</Radio>
                <Radio label="305">回头联系</Radio>
                <Radio label="306">次月办理</Radio>
                <Radio label="307">其他</Radio>
                <hr>
                <p>关闭</p>
                <Radio label="1">成功办理</Radio>
                <Radio label="2">失败</Radio>
                <Radio label="201">语言不通</Radio>
                <Radio label="202">点错</Radio>
                <Radio label="203">无法配送</Radio>
                <Radio label="204">不办理</Radio>
                <Radio label="205">非王卡套餐</Radio>
                <Radio label="206">要换套餐</Radio>
            </RadioGroup>
            <hr>
            <div>
                <p>备注</p>
                <Input v-model="editor.remarks" type="textarea" :rows="2" placeholder="请填写备注" />
                <!--v-model="value6"-->
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="subOrder">确认</Button>
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
    data() {
      return {
        tagIndex:'',
        collapseName:'',
        tagList: [ '亲情卡','不限量', '宽带', '回访订单'],
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
          orderStatus:-1,
          orderSource:'',
          startTime: '',
          endTime: '',
          cityName:'',
          productName:'',
          provinceName:'',
          contactPhone:'',
          productType:'1'//回访订单
        },
        TotalRecords: 0,
        columns: [
          {
            title: '业务',
            align: 'center',
            key: 'productType'
          },
          {
            title: '用户号码',
            align: 'center',
            key: 'contactPhone'
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
            key: 'orderSource'
          },
          {
            title: '省份',
            align: 'center',
            key: 'provinceName'
          },
          {
            title: '地市',
            align: 'center',
            key: 'cityName'
          },
          {
            title: '订单状态',
            align: 'center',
            key: 'orderStatus',
            render : (h,params) => {
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
            render: (h, params) => {
              return h('div', {
                /*on: {
                  dblclick: () => {
                    this.modalDetail = true
                    this.infoDetail = params.row
                  }
                }*/
              }, [
                h('Tooltip', {
                  props: {
                    content: params.row.createTime,
                    placement: 'top-start'
                  },
                  style: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'left'
                  }
                }, params.row.createTime.split(" ")[0])
              ])
            }
          },
          {
            title: '跟单状态',
            align: 'center',
            key: 'trackStatus',
            className: 'demo-table-info-column',
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
                      console.log(1)
                    }
                }
              },name)
            }
          },
          {
            title: '修改',
            align: 'center',
            render: (h, params) => {
              return h('Button', {
                props: {
                  icon: 'edit',
                  size: 'small',
                  type: (params.row.orderStatus == '-1') ? 'warning' : 'default'
                },
                on: {
                  click: () => {
                    if(params.row.orderStatus === -1) {
                      this.modalEditor = true;
                      this.editor.orderNo = params.row.orderNo;
                      this.editor.productCode = params.row.productCode
                    }else {
                      this.$Message.error("订单已关闭，不可修改")
                    }
                  }
                }
              })
            }
          },
          {
            title: '跟单时间',
            align: 'center',
            key: 'updateTime',
            render: (h, params) => {
              return h('div', {
                /*on: {
                  dblclick: () => {
                    this.modalDetail = true
                    this.infoDetail = params.row
                  }
                }*/
              }, [
                h('Tooltip', {
                  props: {
                    content: params.row.updateTime,
                    placement: 'top-start'
                  },
                  style: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    textAlign: 'left'
                  }
                }, params.row.updateTime.split(" ")[0])
              ])
            }
          },
          {
            title: '跟单人',
            align: 'center',
            key: 'receiver'
          },
          {
            title: '地址',
            align: 'center',
            key: 'contactAddress',
            render: (h, params) => {
                if(params.row.contactAddress) {
                  return h('div', {}, [
                    h('Tooltip', {
                      props: {
                        content: params.row.contactAddress,
                        placement: 'top-start'
                      },
                      style: {
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        textAlign: 'center',
                        width: '60px'
                      }
                    }, params.row.contactAddress)
                  ])
                }else {
                    return ''
                }
            }
          },
          {
            title: '备注',
            align: 'center',
            key: 'remarks',
            render: (h, params) => {
              if(params.row.remarks) {
                return h('div', {}, [
                  h('Tooltip', {
                    props: {
                      content: params.row.remarks,
                      placement: 'top-start'
                    },
                    style: {
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      textAlign: 'center',
                      width: '60px'
                    }
                  }, params.row.remarks)
                ])
              }else {
                return ''
              }
            }
          },
          {
            title: '锁定',
            key: 'action',
            align: 'center',
            className: 'demo-table-info-column',
            render : (h,params) => {
              return h('Button', {
                props: {
                  icon: 'locked',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.modalRefundMarks = true;
                    this.editOrderNo = params.row.orderNo;
                    this.refundRmarks = params.row.returnText ? params.row.returnText : `【${params.row.mobileNumber}】于【${params.row.orderData}】订购【${params.row.orderProduct}】业务。用户表示非本人订购，要求退费。与用户协商结果如下:\r\rXXXXXXX\r\r,用户表示满意。以下是该用户的所有订购截图，（如没有截图请联系4000126559）`
                  }
                }
              })
            }
          }
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
            status:307,
            statusDes:'其他(还能再次回访)'
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
          /*{
              status:207,
              statusDes:'其他(关闭)'
          }*/
        ],
        editor: {//editor.remarks
          orderNo:'',
          orderStatus:'',
          trackStatus:'',
          remarks:'',
          productCode:'',
          obligate:''
        },
      }
    },
    methods: {
      /*rowClassName (row, index) {
        if (index === 1) {
          return 'demo-table-info-row';
        }
        return '';
      },*/
      gettagIndex(index) {
        this.tagIndex = index;
        this.filter.productType = '亲情卡';
        if(index === -1 || index === 0) {
            this.filter.productType = '亲情卡';
        }else if(index === 1){
          this.filter.productType = '不限量';
        }else if(index === 2) {
          this.filter.productType = '宽带';
        }else if(index === 3) {
          this.filter.productType = '回访';
        }
        this.search(1)
      },
      subOrder() {
        let _that = this ;
        console.log(this.editor.trackStatus)
        if(this.editor.trackStatus) {
          this.dataLoading = true;
          let isTrue = false;
          let arr = [-1,301,302,303,304,305,306,307];
          for (let i = 0 ; i < arr.length ; i++) {//为false 是待处理   为true  就是关闭
            if(arr[i] == this.editor.trackStatus) {
              isTrue = true;
            }
          }
          if(isTrue) {
            this.editor.orderStatus = -1//待处理订单
          }else {
            if(this.editor.trackStatus == 2) {
              this.editor.orderStatus = 2//失败
            }else if(this.editor.trackStatus == 1) {
              this.editor.orderStatus = 1//成功
            }else {
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
        console.log(this.filter.startTime)
        console.log(this.filter.endTime)
      },
      search(no) {
        var _that = this;
        this.filter.pageNo = no
        this.dataLoading = true
        this.orderNos = ''
        this.checkedDatas = []
        util.ajax.get(util.baseUrl + '/core/orders/delivery/list', {
          params: this.filter
        })
          .then(function(res){
            _that.wscCode =''
            _that.dataLoading = false
            if(res.data.status == ERR_OK) {
              _that.datas = res.data.data.list
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
      this.search(1)
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
    }
    .ivu-table .demo-table-info-column{
       border-left: 1px solid blue;
    }
    .ivu-table .demo-table-info-row {
        border-left: none!important;
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
