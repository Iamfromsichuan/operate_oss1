<template>
    <div class="complain_nation">
        <Row :gutter="10" style="margin: 10px 0">
            <Col span="2">
                <Input v-model="filter.productName" placeholder="产品名称" clearable ></Input>
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
                <!--<Select clearable v-model="filter.procStatus" filterable placeholder="请选择处理状态">
                    <Option value="-1" :key="">未处理</Option>
                    <Option value="1" :key="">成功</Option>
                    <Option value="2" :key="">无效</Option>
                </Select>-->
            </Col>
            <Col span="2">
                <Input v-model="filter.orderSource" placeholder="订单来源" clearable ></Input>
            </Col>
            <Col span="6">
                <DatePicker :value="initTime" type="datetimerange" placement="bottom-start" placeholder="导入时间" style="width: 100%" @on-change="changeTime"></DatePicker>
            </Col>
            <Col span="4">
                <Button type="primary" icon="ios-search" @click='search(1)'>查找</Button>
                <Button type="primary" icon="ios-cloud-download" @click='downloadFile'>下载</Button>
            </Col>
        </Row>
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
        <Modal v-model="modalDelete" width="320">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除订单</span>
            </p>
            <div style="text-align:center">
                <Input  type="password" :autosize="true" placeholder="请验证当前用户密码"></Input>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading">确认</Button>
            </div>
        </Modal>
    </div>

</template>

<script>
  import util from '@/libs/util';
  import Cookies from 'js-cookie';
  import {ERR_OK,pageSize} from '@/config/config'

  export default {
    data() {
      return {
        modalDelete:false,
        byte:"",
        InputList:[],//表中有多个字段
        loading:"",
        collapseName: '1',
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
        },
        TotalRecords: 0,
        columns: [
          {
            title: '订单号',
            align: 'center',
            key: 'orderNo',
          },
          {
            title: '订单时间',
            align: 'center',
            key: 'createTime'
          },
          {
            title: '联系号码',
            align: 'center',
            key: 'contactPhone'
          },
          {
            title: '来源',
            align: 'center',
            key: 'orderSource'
          },
          {
            title: '产品名称',
            align: 'center',
            key: 'productName'
          },
          {
            title: '业务分类',
            align: 'center',
            key: 'productType'
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
            title: '跟单时间',
            align: 'center',
            key: 'updateTime'
          },
          {
            title: '备注',
            align: 'center',
            key: 'remarks'
          },
          {
            title: '锁定状态',
            align: 'center',
            key: 'lockStatus'
          },
          {
            title: '锁定时间',
            align: 'center',
            key: 'lockTime'
          },
          {
            title: 'Action',
            key: 'action',
            width: 150,
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
                }, '修改'),
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
                }, '日志'),
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
                }, '详情')
              ]);
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
      }
    },
    methods: {
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
    created() {
      this.filter.startTime = this.initTime[0];
      this.filter.endTime = this.initTime[1];
      this.search(1)
    }
  }
</script>
<style type="text/css">
    .complain_nation .ivu-table-cell{
        padding: 0;
    }
    .complain_nation .page{
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
