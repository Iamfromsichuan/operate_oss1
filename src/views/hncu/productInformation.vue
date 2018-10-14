<template>
    <div class="messageList">
        <Row>
            <Col span="3">
                <Input icon="ios-photos-outline" placeholder="订购编码" style="width: 90%" v-model="filter.orderCode"></Input>
            </Col>
            <Col span="3">
                <Input icon="ios-paper-outline" placeholder="产品名称" style="width: 90%" v-model="filter.productName"></Input>
            </Col>
            <Col span="3">
                <Input icon="ios-calendar" placeholder="产品类型" style="width: 90%" v-model="filter.productType"></Input>
            </Col>
            <Col span="4">
                <Select @on-change="con" placeholder="生效方式" v-model="filter.effectWay" style="width:200px">
                    <Option v-for="item in modeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </Col>
            <Col span="7">
                <Button type="primary" icon="ios-search" @click="search(1)">查找</Button>
                <Button type="success" icon="ios-cloud-download" @click="download">导出</Button>
            </Col>
        </Row>
        <br>

        <Table  :columns="columns" :data="datas" :loading="dataLoading"></Table>
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
                modeList:[
                    {
                        value:'立即生效',
                        label:'立即生效'
                    },
                    {
                        value:'次月生效',
                        label:'次月生效'
                    }
                ],
                initTime: [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 00:00:00`, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`],
                filter: {
                    orderCode: '',
                    productName: '',
                    effectWay: '',
                    productType:'',
                    pageNo:1,
                    pageSize: pageSize
                },
                totalRecords: 0,
                dataLoading: false,
                columns: [
                    {
                        title: '金额',
                        key: 'amount'
                    },
                    {
                        title: '生效方式',
                        key: 'effectWay',
                        // width: '400'
                    },
                    {
                        title: ' 4G资费编码',
                        key: 'element4g',
                        ellipsis:'true'
                        /*render: (h, params) => {
                            return h('Tag', {
                                props: {
                                    color: params.row.procStatus == -1 ? 'yellow' : params.row.procStatus == 1 ? 'green' : 'red'
                                }
                            }, params.row.procStatus == -1 ? '未处理' : params.row.procStatus == 1 ? '有效' : '无效')
                        }*/
                    },
                    {
                        title: '23G资费编码',
                        key: 'element23g',
                        ellipsis:'true'
                    },
                    {
                        title: '上行编码',
                        key: 'moCode'
                    },
                    {
                        title: '订购编码',
                        key: 'orderCode'
                    },
                    {
                        title: '4G包编码',
                        key: 'package4g'
                    },
                    {
                        title: '23G包编码',
                        key: 'package4g'
                    },
                    {
                        title: '23G产品编码',
                        key: 'productId23g',
                        ellipsis:'true'
                    },
                    {
                        title: '4G产品编码',
                        key: 'productId4g'
                    },
                    {
                        title: '产品名称',
                        key: 'productName'
                    },
                    {
                        title: '产品类型',
                        key: 'productType'
                    }
                ],
                datas: []
            }
        },
        methods: {
            con(value){
              this.filter.effectWay = value
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
                console.log(this.filter.effectWay)
                util.ajax.get(util.baseUrl + '/hncu/products/list', {
                    params: _that.filter
                })
                    .then(function(res){
                        if(res.data.status == ERR_OK) {
                            _that.datas = res.data.data.list
                            _that.totalRecords = res.data.data.total
                            _that.dataLoading = false
                            console.log(_that.datas)
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
                window.location.href = `${util.baseUrl}/hncu/products/export?token=${Cookies.get('token')}&orderCode=${this.filter.orderCode}&productName=${this.filter.productName}&effectWay=${this.filter.effectWay}&productType=${this.filter.productType}`
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
