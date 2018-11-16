<template>
    <div class="messageList">
        <Row :gutter="10">
            <Col span="3">
                <Select clearable v-model="filter.proviceCode" placeholder="请选择省份" filterable>
                    <Option  value="sccu" >四川联通</Option>
                    <Option  value="hncu" >海南联通</Option>
                    <Option  value="cqcu" >重庆联通</Option>
                    <Option  value="nxcu" >宁夏联通</Option>
                    <Option  value="gzcu" >贵州联通</Option>
                </Select>
            </Col>
            <Col span="3">
                <Select clearable v-model="filter.reportState" placeholder="状态报告" filterable>
                    <Option  value="" >全部</Option>
                    <Option  value="-1" >未收到</Option>
                    <Option  value="0" >成功</Option>
                    <Option  value="2" >失败</Option>
                </Select>
            </Col>
            <Col span="3">
                <Select clearable v-model="filter.submitStatus" placeholder="提交报告" filterable>
                    <Option  value="" >全部</Option>
                    <Option  value="-1" >黑名单</Option>
                    <Option  value="0" >成功</Option>
                    <Option  value="2" >失败</Option>
                </Select>
            </Col>
            <Col span="3">
                <Input icon="ios-person-outline" placeholder="电话号码" v-model="filter.mobileNumber"></Input>
            </Col>
            <Col span="6">
                <DatePicker :value="initTime" type="datetimerange" placement="bottom-start" placeholder="导入时间" style="width: 90%" @on-change="changeTime"></DatePicker>
            </Col>
            <Col span="4">
                <Button type="primary" icon="ios-search" @click="search(1)">查找</Button>
                <Button type="success" icon="ios-cloud-download" @click="download">导出</Button>
            </Col>
        </Row>
        <br>

        <Table :columns="columns" :data="datas" :loading="dataLoading" style="margin-bottom: 50px;"></Table>
        <!--<br>
        <Page :total="totalRecords" :current="filter.pageNo" @on-change='changePage' :page-size="filter.pageSize"></Page>
        <br>-->
        <div class="page">
            <Page :total="totalRecords" :current="filter.pageNo" @on-change='changePage' :page-size="filter.pageSize" show-elevator show-sizer placement="top" :page-size-opts="pageConfig" @on-page-size-change="changePageSize" style="display: inline-block;vertical-align: middle;"></Page>
            <div class="records" style="display: inline-block;height: 32px;line-height: 32px;margin-left: 5%;">
                当前共<span style="color: #f00;font-weight: bold;"> {{totalRecords}} </span>条记录
            </div>
        </div>

    </div>
</template>

<script>
  import Cookies from 'js-cookie'
  import util from '@/libs/util'
  import {ERR_OK,pageSize} from '@/config/config'
  export default {
    data () {
      return {
        initTime: [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`],
        filter: {
          proviceCode:'',
          mobileNumber: '',
          startTime: '',
          endTime: '',
          pageNo:1,
          content:'',
          reportState:'',
          pageSize: pageSize
        },
        pageConfig: [8, 10, 15, 18, 20, 300],
        totalRecords: 0,
        dataLoading: false,
        columns: [
          {
            title: '号码',
            key: 'mobileNumber'
          },
          {
            title: '短信内容',
            key: 'content',
            width: '400'
          },
          {
            title: '提交状态',
            key: 'submitStatus'
          },
          {
            title: '状态报告',
            key: 'reportCode'
          },
          {
            title: '状态编码',
            key: 'reportState'
          },
          {
            title: 'sp 号码',
            key: 'spNumber'
          },
          {
            title: '创建时间',
            key: 'createTime'
          },
          {
            title: '状态报告时间',
            key: 'reportTime'
          }
        ],
        datas: []
      }
    },
    methods: {
      changeTime(time) {
        util.changeTime.bind(this)(time)
      },
      search(no) {
        let _that = this;
        this.filter.pageNo = no;
       /* this.filter.reportState||(this.filter.reportState=-2);*/
        if( this.filter.proviceCode ) {
          this.dataLoading = true;
          util.ajax.get(util.baseUrl + '/sms/mt/listV2', {
            params: this.filter
          })
            .then(function(res){
              if(res.data.status == ERR_OK) {
                _that.datas = res.data.data.list
                _that.totalRecords = res.data.data.total
                _that.dataLoading = false
              }else {
                _that.$Message.error(res.msg)
                _that.dataLoading = false
              }
            })
            .catch(function(err){
              console.log(err);
            });
        }else {
          this.$Message.error("请先选取省份")
        }

      },
      changePage(no) {
        this.search(no)
      },
      changePageSize(pageSize) {
        this.filter.pageSize = pageSize;
        this.search(1)
      },
      download() {
        console.log(util.baseUrl + '/sms/mt/exportV2?token='+Cookies.get('token') + util.parseParam(this.filter))
        window.location.href = util.baseUrl + '/sms/mt/exportV2?token='+Cookies.get('token') + util.parseParam(this.filter)
      }
    },
    mounted() {
      this.filter.startTime = this.initTime[0]
      this.filter.endTime = this.initTime[1]
    }
  }
</script>

<style lang="less">
    .messageList .page{
        background: #fff;
        position: fixed;
        width: 100%;
        bottom: 0;
        z-index: 999999;
    }
</style>
