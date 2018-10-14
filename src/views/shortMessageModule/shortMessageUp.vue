<!--各个省份的  短信上行  功能  全部集成到此页面-->
<template>
    <div class="messageList">
        <Row :gutter="10">
            <Col span="3">
                <Input icon="ios-clock-outline" placeholder="spNumber" style="width: 100%" v-model="filter.spNumber"></Input>
            </Col>
            <Col span="3">
                <Input icon="ios-person-outline" placeholder="电话号码" style="width: 100%" v-model="filter.mobileNumber"></Input>
            </Col>
            <Col span="3">
                <Select clearable v-model="CodeAndName" filterable placeholder="请选择省份名称">
                    <Option v-for="item in items" :value="item.provinceName+';'+item.provinceCode" :key="item.provinceName">{{ item.provinceName }}</Option>
                </Select>
            </Col>
            <Col span="3">
                <Select clearable v-model="filter.procStatus" filterable placeholder="请选择处理状态">
                    <Option value="-1" :key="">未处理</Option>
                    <Option value="1" :key="">成功</Option>
                    <Option value="2" :key="">无效</Option>
                </Select>
            </Col>
            <Col span="7">
                <DatePicker :value="initTime" type="datetimerange" placement="bottom-start" placeholder="导入时间" style="width: 90%" @on-change="changeTime"></DatePicker>
            </Col>
            <Col span="4">
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
                items:"",
                CodeAndName:"",
                initTime: [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`],
                filter: {
                    mobileNumber: '',
                    spNumber:"",
                    startTime: '',
                    endTime: '',
                    procStatus:"",
                    provinceName:"",
                    provinceCode:"",
                    pageNo:1,
                    pageSize: pageSize
                },
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
                        title: '处理状态',
                        key: 'procStatus',
                        render: (h, params) => {
                            return h('Tag', {
                                props: {
                                    color: params.row.procStatus == -1 ? 'yellow' : params.row.procStatus == 1 ? 'green' : 'red'
                                }
                            }, params.row.procStatus == -1 ? '未处理' : params.row.procStatus == 1 ? '成功' : '无效')
                        }
                    },
                    {
                        title: 'sp 号码',
                        key: 'spNumber'
                    },
                    {
                        title: '处理时间',
                        key: 'receiveTime'
                    }
                ],
                datas: []
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
                var _that = this
                this.filter.pageNo = no
                if(this.CodeAndName){
                    this.filter.spName = this.CodeAndName.split(";")[0];
                    this.filter.provinceCode = this.CodeAndName.split(";")[1];
                }else {
                    this.filter.spName = "";
                    this.filter.provinceCode = "";
                }

                this.filter.pageNo = no
                this.dataLoading = true
                util.ajax.get(util.baseUrl + '/sms/mo/list', {
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
            },
            changePage(no) {
                this.search(no)
            },
            download() {
                window.location.href = util.baseUrl + '/sms/mo/export?token='+Cookies.get('token') + util.parseParam(this.filter)
            },
            getProvinceName(){
                var _that = this
                util.ajax.get(util.baseUrl + '/contact/sgipSpConfig/provinceCodeList')
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
            this.getProvinceName();
        }
    }
</script>

<style lang="less">

</style>
