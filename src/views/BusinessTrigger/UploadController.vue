<template>
    <div class="messageList">
        <Row>
            <Col span="3">
                <Select @on-change="reduceIds" clearable v-model="filter.tableType" filterable placeholder="黑白名单类型">
                    <Option value="black" >黑名单</Option>
                    <Option value="white" >白名单</Option>
                </Select>
            </Col>
            <Col span="3">
                <Select clearable @on-change="getId" v-model="filter.tableTitle" filterable placeholder="黑白名单表名">
                    <Option v-for="(index,key) in datasList" :value="index.tableTitle" :key="key">{{ index.tableTitle}}</Option>
                </Select>
            </Col>
            <Col span="3">
                <Select clearable v-model="filter.operationType" filterable placeholder="上传类型">
                    <Option v-if="isBlack" value="1" key="1">新增 </Option>
                    <Option v-if="isBlack" value="2" key="2">删除 </Option>
                    <Option v-if="!isBlack" value="3" key="3">添加</Option>
                    <Option v-if="!isBlack" value="4" key="4">初始化</Option>
                    <Option v-if="!isBlack" value="5" key="5">同步</Option>
                </Select>
            </Col>
            <Col span="7" offset="1">
                <Button type="primary" icon="ios-search" @click="search(1)">查找</Button>
                <Button type="success" icon="ios-cloud-upload-outline" @click="upLoad">上传文件</Button>
                <Button type="error" icon="ios-cloud-download" @click="download">导出模板</Button>
            </Col>
        </Row>
        <br>
        <Table :columns="columns" :data="datasLimen" :loading="dataLoading"></Table>
        <br>
        <Page :total="totalRecords" :current="filter.pageNo" @on-change='changePage' :page-size="filter.pageSize"></Page>
        <br>
        <Modal v-model="modal1" >
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>上传文件----{{filter.tableTitle}}</span>
            </p>
            备注:(请先填写备注，文件在拖入或者点击导入后，会直接上传)<Input v-model="filter.remarks" placeholder="此处可输入备注" style="margin-bottom: 20px;"/>
            <Upload
                    multiple
                    type="drag"
                    action="http://oss.operate.terabyte.com.cn/upload/uploadFile"
                    :with-credentials="true"
                    :data="filter"
            >

                <div style="padding: 20px 0">
                    <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                    <p>点击虚线内或者将文件拖入虚线内上传</p>
                </div>
            </Upload>
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
                isBlack : false,
                responseCode:'',
                CodeAndName:"",
                myreg:/^[1][3,4,5,7,8][0-9]{9}$/,
                modal1:false,
                slecetValue:'',
                modal_loading:false,
                changefilter:{
                    provinceName: '',
                    phone:'',
                    provinceCode:'',
                    remarks: ''
                },
                ruleValidate: {
                    id: [
                        { required: true, message: ' ', trigger: 'blur' },
                    ],
                    tableName: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    tableType: [
                        { required: true, message: ' ', trigger: 'change' }
                    ],
                    tableTitle: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ]
                },
                modalAdd:false,
                items:[],
                instant:{},
                filter: {
                    pageNo: 1,
                    pageSize: 15,
                    id:'',//沃视窗编码
                    tableName:'',
                    // 详情搜索
                    tableType: '',//是否启用 0关闭 1启用
                    tableTitle: '',//白名单id
                    tableField: '',//数据类型
                    operationType:"",
                    remarks: '',
                    token:Cookies.get('token')
                },
                totalRecords: 0,
                dataLoading: false,
                columns: [
                    {
                        title: '表名',
                        key: 'tableName'
                    },
                    {
                        title: '表标题',
                        key: 'tableTitle'
                    },
                    {
                        title: '上传类型',
                        key: 'operationType',
                        width:100,
                        render: (h, params) => {
                            return h('span',{} , params.row.operationType ==1?"新增 ":params.row.operationType ==2?"删除 ": params.row.operationType ==3?"添加": params.row.operationType ==4?"初始化": params.row.operationType ==5?"同步":"")
                        }
                    },
                    {
                        title: '上传文件名',
                        key: 'fileName'
                    }
                    ,
                    {
                        title: '上传文件重命名',
                        key: 'newName'
                    }
                    ,
                    {
                        title: '上传状态',
                        key: 'result',
                        width:100,
                        render: (h, params) => {
                            return h('span',{} , params.row.result ==0?"待处理 ":params.row.result ==1?"成功  ": params.row.result ==2?"失败":params.row.result ==-1?"处理中":"")
                        }
                    }
                    ,
                    {
                        title: '上传返回报文',
                        key: 'resultData',
                        render: (h, params) => {
                            if(params.row.result==2) {
                                return h('Poptip', {
                                    props: {
                                        trigger: "hover",
                                        width: '400',
                                        content: params.row.resultData
                                    }
                                }, [
                                    h('Button', {
                                        props: {
                                            icon: 'edit',
                                            size: 'small',
                                            type: params.row.returnText ? 'ghost' : 'warning'
                                        }
                                    })
                                ])
                            }else {
                                return h('span',{} , params.row.result ==0?"待处理 ":params.row.result ==1?"成功  ": params.row.result ==2?"失败":params.row.result ==-1?"处理中":"")
                            }
                        }
                    }
                    ,
                    {
                        title: '表字段',
                        key: 'tableField'
                    }
                    ,
                    {
                        title: '备注',
                        key: 'remarks'
                    }
                    ,
                    {
                        title: '创建时间',
                        key: 'createTime'
                    }
                ],
                datasList:[],
                datas: [],//查询到的所有的黑白名单表名
                datasWhite: [],//选择白名单选项之后，让黑白名单表中只显示此数据（全白名单数据）
                datasBlack: [],//选择黑名单选项之后，让黑白名单表中只显示此数据（全黑名单数据）
                datasLimen:[]
            }
        },
        methods: {
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
            upLoad() {
                if(!this.filter.tableTitle) {
                    this.$Message.error("请选择需要上传的表名")
                }else if(!this.filter.operationType) {
                    this.$Message.error("请选择需要上传的类型")
                }else {
                    this.filter.id = this.instant.id;
                    this.filter.fileName = this.instant.fileName;
                    this.filter.tableField = this.instant.tableField;
                    this.filter.tableName = this.instant.tableName;
                    this.modal1 = true
                }
            },
            cacheSearch(){
                var _that = this
                _that.filter.provinceName = _that.CodeAndName.split(";")[0];
                _that.filter.provinceCode = _that.CodeAndName.split(";")[1];
                if(!this.filter.phone){
                    _that.$Message.error("查询号码不可为空")
                }else if(!this.myreg.test(this.filter.phone)) {
                    _that.$Message.error("请输入正确的11位数字号码")
                }else if(!this.CodeAndName){//!this.filter.provinceName
                    _that.$Message.error("查询省份名称不可为空")//_that.$Message.error("查询省份名称不可为空")
                }else {
                    this.dataLoading = true
                    util.ajax.get(util.baseUrl + '/contact/sgipPhoneBlack/ridis',{
                        params: this.filter
                    })
                        .then(function(res){
                            _that.dataLoading = false;
                            console.log(res.data.msg)
                            _that.responseCode = res.data.msg;
                            _that.modal1 = true;

                        })
                        .catch(function(err){
                            console.log(err);
                        })
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
            handleSubmit(name){
                var _that = this
                _that.dataLoading = false
                util.ajax.get(util.baseUrl + '/contact/sgipPhoneBlack/add',{
                    params:_that.changefilter
                })
                    .then(function(res){
                        _that.dataLoading = false
                        _that.modalAdd = false
                        _that.search(1)

                    })
                    .catch(function(err){
                        console.log(err);
                    });
            },
            show(){
                this.modalAdd = true
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
            },
            changeTime(time) {
                util.changeTime.bind(this)(time)
            },
            search(no) {
                var _that = this;
                _that.filter.pageNo = no
                this.filter.pageSize = pageSize;
                this.dataLoading = true
                this.orderNos = ''
                this.checkedDatas = []
                util.ajax.get(util.baseUrl + '/upload/list', {
                    params: this.filter
                })
                    .then(function(res){
                        _that.wscCode =''
                        _that.dataLoading = false
                        if(res.data.status == ERR_OK) {
                            _that.datasLimen = res.data.data.list
                            _that.TotalRecords = res.data.data.total
                        }else {
                            _that.$Message.error(res.data.msg)
                        }
                    })
                    .catch(function(err){
                        console.log(err)
                    });
            },
            searchListNmae(no) {
                var _that = this;
                this.filter.pageNo = no
                _that.filter.pageSize = 100
                this.dataLoading = true
                this.orderNos = ''
                this.checkedDatas = []
                console.log(_that.filter.pageSize)
                util.ajax.get(util.baseUrl + '/black/white/config/list', {
                    params: this.filter
                })
                    .then(function(res){
                        _that.filter.pageSize = pageSize;
                        _that.wscCode =''
                        _that.dataLoading = false
                        if(res.data.status == ERR_OK) {
                            _that.datas = res.data.data.list
                            _that.TotalRecords = res.data.data.total
                            for(let i =0 ;i < _that.datas.length ;i++) {
                                if(_that.datas[i].tableType == "白名单" ||_that.datas[i].tableType == "white" ) {
                                    _that.datasWhite.push(_that.datas[i])
                                }else {
                                    _that.datasBlack.push(_that.datas[i])
                                }
                            }
                            _that.search(1)
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
                if(!this.filter.tableTitle) {
                    this.$Message.error("请选择需要下载的表名")
                }else {
                    for(var i = 0; i < this.datas.length ; i++) {
                        if(this.datas[i].tableTitle == this.filter.tableTitle) {
                            this.filter.id = this.datas[i].id;
                            break;
                        }
                    }
                    window.location.href = util.baseUrl + '/upload/downloadTemplate?token='+Cookies.get('token') +"&id="+this.filter.id
                }
            }
        },
        created() {
            this.searchListNmae(1);
            this.getProvinceName();
        }
    }
</script>

<style lang="less">

</style>
