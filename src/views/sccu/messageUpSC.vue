<!--需求已改  此模块统一到了  短信模块   短信上行-->
<template>
    <div class="messageList">
        <Row>
            <Col span="3">
                <Input icon="ios-person-outline" placeholder="电话号码" style="width: 90%" v-model="filter.mobileNumber"></Input>
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
                initTime: [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`],
                filter: {
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
                            }, params.row.procStatus == -1 ? '未处理' : params.row.procStatus == 1 ? '有效' : '无效')
                        }
                    },
                    {
                        title: 'sp 号码',
                        key: 'spNumber'
                    },
                    {
                        title: '创建时间',
                        key: 'createTime'
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
                this.dataLoading = true
                util.ajax.get(util.baseUrl + '/sccu/sms/mo/list', {
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
                window.location.href = util.baseUrl + '/sccu/sms/mo/export?token='+Cookies.get('token') + util.parseParam(this.filter)
            }
        },
        mounted() {
            this.filter.startTime = this.initTime[0]
            this.filter.endTime = this.initTime[1]
        }
    }
</script>

<style lang="less">

</style>
