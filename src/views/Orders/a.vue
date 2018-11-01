<template>
    <div class="messageList messageListTurnOrder">
        <Row :gutter="10">
            <Col span="4">
                <Select clearable v-model="filter.proviceCode" placeholder="请选择省份" filterable>
                    <Option  value="sccu" >四川联通</Option>
                    <Option  value="hncu" >海南联通</Option>
                    <Option  value="cqcu" >重庆联通</Option>
                    <Option  value="nxcu" >宁夏联通</Option>
                    <Option  value="gzcu" >贵州联通</Option>
                </Select>
            </Col>
            <Col span="3">
                <Input icon="ios-person-outline" placeholder="电话号码" v-model="filter.mobileNumber"></Input>
            </Col>
            <Col span="7">
                <DatePicker :value="initTime" type="datetimerange" placement="bottom-start" placeholder="导入时间" style="width: 90%" @on-change="changeTime"></DatePicker>
            </Col>
            <Col span="7">
                <Button type="primary" icon="ios-search" @click="search(1)">查找</Button>
                <Button type="success" icon="ios-cloud-download" @click="download">导出</Button>
            </Col>
        </Row>
        <br>

        <Table :columns="columns" :data="datas" :loading="dataLoading"></Table>
        <br>
        <Page :total="totalRecords" :current="filter.pageNo" @on-change='changePage' :page-size="filter.pageSize"></Page>
        <br>

    </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import util from '@/libs/util'
  import {ERR_OK,pageSize} from '@/config/config'
  export default {
    data () {
      return {
        initTime: [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01 00:00:00`, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`],
        filter: {
          proviceCode:'',
          mobileNumber: '',
          startTime: '',
          endTime: '',
          pageNo:1,
          pageSize: pageSize
        },
        totalRecords: 0,
        dataLoading: false,
        columns: [
          {
            title: '联系号码',
            align: 'center',
            key: 'contactPhone',
          },
          {
            title: '联系人',
            align: 'center',
            key: 'contactName'
          },
          {
            title: '省份名称',
            align: 'center',
            key: 'provinceName'
          },
          {
            title: '联系地址',
            align: 'center',
            key: 'contactAddress'
          },
          {
            title: '身份证号码',
            align: 'center',
            key: 'idNumber'
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
            title: '跟单状态',
            align: 'center',
            key: 'trackStatus',
            render : (h,params) => {
              let name ;
              for(let i = 0 ; i < this.statusList.length ; i ++) {
                if(params.row.trackStatus === this.statusList[i].status) {
                  name = this.statusList[i].statusDes;
                }
              }
              return h('span',{},name)
            }
          },
          {
            title: '订单来源',
            align: 'center',
            key: 'orderSource'
          },
          {
            title: '更新时间',
            align: 'center',
            key: 'updateTime'
          },
          {
            title: '备注',
            align: 'center',
            key: 'remarks'
          },
          {
            title: 'Action',
            key: 'action',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      util.changeState.call(this,"开启",params)
                    }
                  }
                }, '开启'),
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
                      console.log(1)
                      util.changeState.call(this,"关闭",params)
                    }
                  }
                }, '关闭'),
                h('Button', {
                  props: {
                    type: 'warning',
                    size: 'small'
                  },

                  on: {
                    click: () => {
                      this.modalAdd = true
                      this.if_add = false
                      this.formItem = {
                        customer: Cookies.get('user'), //客服
                        mobileNumber: '', //电话号
                        province: params.row.province, // 省份
                        businessType: '月包', // 业务类型
                        isEnable: params.row.isEnable,  //是否启用 0关闭 1 启用
                        wscCode: params.row.wscCode, // 沃视窗编码
                        name: params.row.name, // 退费来源
                        code: params.row.code, // 省份编码 主键
                        returnText: '用户否认订购行为。', // 回单文本
                        remarks: params.row.remarks, // 备注
                      }
                      if(params.row.isEnable == "关闭"){
                        this.formItem.isEnable = 0
                      }else if(params.row.isEnable == "开启"){
                        this.formItem.isEnable = 1
                      }
                    }
                  }
                }, '修改')
              ]);
            }
          }
        ],
        datas: [],
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
      }
    },
    methods: {
      changeTime(time) {
        util.changeTime.bind(this)(time)
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
              _that.wscCodes=[]
              _that.filter.wscCode=''
              _that.datas = res.data.data.list
              for(let i=0;i<_that.datas.length;i++){
                _that.wscCodes.push(_that.datas[i].wscCode)
              }
              _that.totalRecords = res.data.total
            }else {
              _that.$Message.error(res.data.msg)
            }
          })
          .catch(function(err){
            console.log(err)
          });
      },
      changePage(no) {
        this.search(no)
      },
      download() {
        window.location.href = util.baseUrl + '/sccu/sms/export?token='+Cookies.get('token') + util.parseParam(this.filter)
      }
    },
    mounted() {
      this.filter.startTime = this.initTime[0]
      this.filter.endTime = this.initTime[1]
    }
  }
</script>

<style type="text/css">
    .messageListTurnOrder .ivu-table-cell{
        padding: 0;
    }
    .messageListTurnOrder .page{
        background: #fff;
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 999999;
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
