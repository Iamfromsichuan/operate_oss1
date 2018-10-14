<template>
    <div class="messageList">
        <Row>
            <Col span="3">
                <Select filterable v-model="filter.channelCode" placeholder="请选择渠道类别" style="width: 90%">
                    <Option v-for="(index,key) in inWayList" :key="key" :value="index.dictionaryCode">{{index.dictionaryName}}</Option>
                </Select>
            </Col>
            <Col span="3">
                <Input placeholder="产品编码" style="width: 90%" v-model="filter.productCode"></Input>
            </Col>
            <Col span="3">
                <Input placeholder="产品名称" style="width: 90%" v-model="filter.productName"></Input>
                <!--<Select v-model="filter.productCode" filterable placeholder="请选择产品类型" style="width: 350px;">
                    <Option v-for="(index,key) in producstCode" :value="index.productCode" :key="key">{{ index.productName }}</Option>
                </Select>-->
            </Col>
            <Col span="3">
                 <Input placeholder="产品类型" style="width: 90%" v-model="filter.productType"></Input>
            </Col>
            <Col span="3">
                <Select filterable v-model="filter.effectWay" placeholder="请选择生效方式" style="width: 90%">
                    <Option v-for="(index,key) in effectWay" :key="key" :value="index.dictionaryCode">{{index.dictionaryCode}}</Option>
                </Select>
            </Col>


            <!--<Col span="3">
                <Select clearable v-model="CodeAndName" filterable placeholder="请选择省份名称">
                    <Option v-for="(item,key) in inWayList" :value="item.provinceName" :key="key">{{ item.provinceName }}</Option>
                </Select>
            </Col>-->
            <Col span="5" offset="1">
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
                effectWay:[],
                producstCode:[],
                inWayList:[],
                datas2:[],
                responseCode:'',
                CodeAndName:"",
                modal1:false,
                modal_loading:false,
                ruleValidate: {
                    provinceName: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur'}
                    ],
                    phone: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    provinceCode: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    remarks: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ]
                },
                modalAdd:false,
                items:[],
                filter: {
                    productCode: '',
                    channelCode:'',
                    productName:'',
                    productType:'',
                    effectWay:'',
                    pageNo:1,
                    pageSize: pageSize
                },
                totalRecords: 0,
                dataLoading: false,
                columns: [
                    {
                        title: '产品编码',
                        key: 'productCode',
                    },
                    {
                        title: '渠道编码',
                        width:80,
                        key: 'channelCode'
                    },
                    {
                        title: '产品名称',
                        align: 'center',
                        width:80,
                        key: 'productName',
                        render: (h, params) => {
                            var name = params.row.productName.split("元")[0].replace(/[^0-9]/ig,"")
                            return h('Poptip', {
                                props: {
                                    trigger: "hover",
                                    width: '400',
                                    content: params.row.productName
                                }
                            }, [
                                h('Button', {
                                    props: {
                                        size: 'small',
                                        type: 'ghost'
                                    }
                                },name)
                            ])
                        }
                    },
                    {
                        title: '价格',
                        width:60,
                        key: 'amount'
                    },
                    {
                        title: '通道编码',
                        key: 'productId'
                    },
                    {
                        title: '23G产品ID',
                        key: 'productId23g'
                    },
                    {
                        title: 'package23g',
                        key: '23G包编码'
                    },
                    {
                        title: '23G资费编码',
                        key: 'element23g'
                    },
                    {
                        title: '23G产品ID-预付费',
                        key: 'productId23gPre'
                    },
                    {
                        title: '23G包编码-预付费',
                        key: 'package23gPre'
                    },
                    {
                        title: '23G资费编码-预付费',
                        key: 'element23gPre'
                    },
                    {
                        title: '4G产品ID',
                        key: 'productId4g'
                    },
                    {
                        title: '4G包编码',
                        key: 'package4g'
                    },
                    {
                        title: '4G资费编码',
                        key: 'element4g',
                        render: (h, params) => {
                            return h('Poptip', {
                                props: {
                                    trigger: "hover",
                                    width: '400',
                                    content: params.row.element4g
                                }
                            }, [
                                h('Button', {
                                    props: {
                                        icon: 'edit',
                                        size: 'small',
                                        type: 'ghost'
                                    }
                                })
                            ])
                        }
                    },
                    {
                        title: '产品类型',
                        width:90,
                        key: 'productType'
                    },
                    {
                        title: '生效方式',
                        key: 'effectWay'
                    }
                ],
                datas: []
            }
        },
        methods: {
            getWay(name) {
                //inWayList--/system/data/dictionary/list
                var _that = this
                let jsonData = new URLSearchParams();
                jsonData.append('dictionaryType',name);
                util.ajax.post(util.baseUrl + '/system/data/dictionary/list',jsonData)
                    .then(function(res){
                        _that.dataLoading = false
                        if(res.status == ERR_OK) {
                            if(name == "省份") {
                                _that.inWayList = res.data
                            }else if(name == "生效方式") {
                                _that.effectWay = res.data
                            }
                        }else {
                            _that.$Message.error(res)
                        }
                    })
                    .catch(function(err){
                        console.log(err)
                    });
            },
            _sarilizeUrl(str) {
                const keys = Object.keys(str);
                const values = Object.values(str);
                let strs = ''
                for(let i=0;i<keys.length;i++){
                    strs += keys[i] + '=' + values[i] + '&';
                }
                return strs.substring(0,strs.length-1)
            },
            download() {
                const strs = this._sarilizeUrl(this.filter)
                console.log(strs)
                window.location.href = util.baseUrl + '/core/channel/products/export?token='+Cookies.get('token') +"&"+ strs
            },

            GetValue(item){
                var a = JSON.parse(item)
                this.changefilter.provinceName = a.provinceName
                this.changefilter.provinceCode = a.provinceCode
            },
            changeTime(time) {
                util.changeTime.bind(this)(time)
            },
            search(no) {
                this.t1 = true
                var _that = this
                this.filter.pageNo = no
                this.filter.provinceName = this.CodeAndName.split(";")[0];
                this.dataLoading = true
                util.ajax.get(util.baseUrl + '/core/channel/products/list', {
                    params: this.filter
                })
                    .then(function(res){
                        console.log(res)
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
            }
        },
        created() {
            this.getWay("省份")
            this.getWay("生效方式")
        }
    }
</script>

<style lang="less">

</style>
