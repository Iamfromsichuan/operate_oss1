<template>
    <div class="messageList">
        <Row>
            <Col span="3">
                <Input v-model="filter.phone" placeholder="请输入：表名" clearable style="width: 200px"></Input>
            </Col>
            <Col span="7" offset="1">
                <Button type="primary" icon="ios-search" @click="search(1)">查找</Button>
                <Button type="success" icon="plus" @click="addModel">新增黑白名单表</Button>
            </Col>
        </Row>
        <br>
        <Table :columns="columns" :data="datasLimen" :loading="dataLoading"></Table>
        <br>
        <Page :total="totalRecords" :current="filter.pageNo" @on-change='changePage' :page-size="filter.pageSize"></Page>
        <br>
        <Modal v-model="modalAdd" width="400" :mask-closable="false" class-name="vertical-center-modal modalAdd">
            <p slot="header" style="color:#f60;text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>新增业务黑名单表</span>
                <span class="customer" style="position: absolute; right: 8%;;color:#333">
                    客服: {{formItem.customer}}
                </span>
            </p>
            <div>
                <Form ref="formValidate" :model="formItem" :rules="ruleValidate" style="width: 100%;margin: 0 auto">
                    <FormItem  style="width: 100%;margin-bottom: 10px">
                        <Input v-model="formItem.phone" placeholder="请输入电话" clearable style="width: 100%"></Input>
                    </FormItem>
                    <FormItem prop="phone"  style="width:100%;margin-bottom: 10px">
                        <Select v-model="formItem.tableId" filterable placeholder="请选择产品类型">
                            <Option v-for="(index,key) in blackList" :value="index.tableId" :key="key">{{ index.remarks }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem style="width: 100%;margin-bottom: 10px">
                        <Select v-model="formItem.province" filterable placeholder="请选择省份">
                            <Option value="四川"  key="1">四川</Option>
                            <Option value="贵州"  key="2">贵州</Option>
                            <Option value="海南"  key="3">海南</Option>
                            <Option value="重庆 " key="4">重庆 </Option>
                        </Select>
                        <!--<Input v-model="formItem.province" placeholder="请输入省份" clearable style="width:100%"></Input>-->
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align: right">
                <Button type="success" :loading="modal_loading" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" style="margin-left: 8px" @click="modalAdd = false">取消</Button>
            </div>
        </Modal>
        <Modal v-model="modalDelete" width="320">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>删除订单</span>
            </p>
            <div style="text-align:center">
                <Input v-model="passWord" type="password" :autosize="true" placeholder="请验证当前用户密码"></Input>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long :loading="modal_loading" @click="deleteItem">确认</Button>
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
                modal1:false,
                modal_loading:false,
                passWord:'',
                modalDelete:false,
                changefilter:{
                    provinceName: '',
                    phone:'',
                    provinceCode:'',
                    remarks: ''
                },
                ruleValidate: {
                    tableId: [
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                    phone: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    province: [
                        { required: true, message: ' ', trigger: 'change' }
                    ]
                },
                modalAdd:false,
                filter: {
                    pageNo: 1,
                    pageSize: 15,
                    phone:'',
                    token:Cookies.get('token')
                },
                totalRecords: 0,
                dataLoading: false,
                columns: [
                    {
                        title: '电话',
                        key: 'phone'
                    },
                    {
                        title: '省份',
                        key: 'province'
                    },
                    {
                        title: '备注',
                        key: 'remarks',
                    },
                    {
                        title: '所在的黑名单',
                        key: 'tableId'
                    }
                    ,
                    {
                        title: '创建时间',
                        key: 'createTime'
                    },
                    {
                        title: '操作',
                        align: 'center',
                        render: (h, params) => {
                            return h('Button', {
                                props: {
                                    icon: 'edit',
                                    type: 'error',
                                    size: 'small'
                                },
                                on: {
                                    click: () => {
                                        this.formItem = params.row
                                        this.formItem = {
                                            tableId: params.row.tableId, // 订单号
                                            phone: params.row.phone, //客服
                                        };
                                        this.passWord = ''
                                        this.modalDelete = true
                                    }
                                }
                            }, '删除')
                        }
                    }
                ],
                datasLimen:[],
                blackList:[],
                formItem:{},
                inWayList:[]
            }
        },
        methods: {
            deleteItem() {
                let _that = this
                if(!this.passWord) {
                    this.$Message.warning('请验证当前账户密码！')
                    return
                }
                this.modal_loading = true
                util.ajax.get(util.baseUrl + '/business/black/delBlackData', {
                    params:_that.formItem
                })
                    .then(function(res){
                        _that.modal_loading = false
                        if(res.data.status == ERR_OK) {
                            _that.$Message.success('删除成功！')
                            _that.modalDelete = false
                            _that.search(_that.filter.pageNo)
                        }else {
                            _that.$Message.error(res.data.msg)
                        }
                    })
                    .catch(function(err){
                        console.log(err)
                    });
            },
            addModel() {
                let _that = this;
                this.formItem = {
                    phone:_that.filter.phone,
                    tableId:'',
                    province:''
                };
                this.modalAdd = true
            },
            handleSubmit (name) {
                let _url = '/business/black/addBlackData';
                let _that = this;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.modal_loading = true;
                        util.ajax.get(util.baseUrl + _url, {
                            params:_that.formItem
                        })
                            .then(function(res){
                                _that.modal_loading = false;
                                console.log(res.data.status );
                                console.log(ERR_OK);
                                console.log(res.data.msg);
                                if(res.data.status == ERR_OK) {
                                    _that.$Message.success(res.data.msg);
                                    console.log(2)
                                    _that.modalAdd = false;
                                    console.log(1)
                                    _that.search(1)
                                }else {
                                    _that.$Message.error(res.data.msg)
                                }
                            })
                            .catch(function(err){
                                console.log(err)
                            });
                    } else {
                        this.$Message.error('请填写完整信息!');
                    }
                })
            },
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
            getTableIdList() {
                let _that = this;
                util.ajax.get(util.baseUrl + '/mass/config/blackList').then(function (res) {
                    if (res.data.status == ERR_OK) {
                        var _arr = []
                        _that.blackList = res.data.data
                        console.log(_that.blackList)
                    } else {
                        _that.$Message.error(res.data.msg)
                    }
                })
            },
            reduceIds() {
                if(this.filter.tableType == "white") {
                    this.datasList = this.datasWhite
                    this.isBlack = false;
                }else if(this.filter.tableType == "black"){
                    this.datasList = this.datasBlack
                    this.isBlack = true;
                }else {
                    this.datasList = this.datas
                }
            },
            getId(value) {
                console.log(value)
                for(var i=0 ;i <this.datas.length ;i ++) {
                    if(this.datas[i].tableTitle == value) {
                        this.instant = Object.assign({},this.datas[i])
                        return
                    }
                }
            },
            GetValue(item){
                var a = JSON.parse(item)
                this.changefilter.provinceName = a.provinceName
                this.changefilter.provinceCode = a.provinceCode
            },
            deleteTa(){
                this.modalAdd = false
            },
            show(){
                this.modalAdd = true
            },
            changeTime(time) {
                util.changeTime.bind(this)(time)
            },
            search(no) {
                var _that = this;
                _that.filter.pageNo = no
                this.filter.pageSize = pageSize;

                if(_that.filter.phone) {
                    this.filter.phone = this.filter.phone.replace(/\s/g, "");
                    this.dataLoading = true
                    util.ajax.get(util.baseUrl + '/business/black/getBlackList', {
                        params: this.filter
                    })
                        .then(function(res){
                            _that.dataLoading = false
                            console.log(res)
                            if(res.data.status == ERR_OK) {
                                _that.datasLimen = res.data.data
                                _that.TotalRecords = res.data.data.total
                            }else {
                                _that.$Message.error(res.data.msg)
                            }
                        })
                        .catch(function(err){
                            console.log(err)
                        });
                }else {
                    _that.$Message.error("请输入查询号码")
                }

            },
            changePage(no) {
                this.search(no)
            }
        },
        created() {
            this.getTableIdList();
            this.getWay("省份")
        }
    }
</script>

<style lang="less">

</style>
