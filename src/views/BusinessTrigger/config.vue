<template>
    <div class="complain_nation">
        <Collapse v-model="collapseName" style="margin: 10px 0">
            <Panel name="1">
                <div style="display:inline-block;float: left;margin-right: 10px" @click.stop>
                    <Button type="success" icon="plus" @click='addShow'>新增黑白名单表</Button>
                    <!--<Button type="warning" icon="close" @click='changeShow'>修改白名单ID</Button>-->
                    <Button type="error" icon="close" @click='deleteShow'>删除黑白名单表</Button>
                </div>
                <div slot="content">
                    <Input v-model="filter.tableName" placeholder="请输入：表名" clearable style="width: 200px"></Input>
                    <Input v-model="filter.tableType" placeholder="请输入：黑白名单类型" clearable style="width: 200px"></Input>
                    <Input v-model="filter.tableTitle" placeholder="请输入：表标题" clearable style="width: 200px"></Input>
                    <Button type="primary" icon="ios-search" @click='search(1)' style="float: right">查找</Button>
                </div>
                <!--<div style="display:inline-block;float: right;margin-right: 10px;width: 150px" @click.stop>
                    <Input icon="search" placeholder="电话号码" style="width: 90%" v-model='filter.mobileNumber' @on-click="search(1)" :clearable="true"></Input>
                </div>-->
            </Panel>
        </Collapse>
        <Table
                :columns="columns"
                :data="datas"
                :loading="dataLoading"
                @on-selection-change='selectItem'
                size="small"></Table>

        <br>
        <br>
        <div class="page">
            <Page :total="TotalRecords" :current="filter.pageNo" @on-change='changePage' :page-size="filter.pageSize" show-elevator show-sizer placement="top" :page-size-opts="pageConfig" @on-page-size-change="changePageSize" style="display: inline-block;vertical-align: middle;"></Page>
            <div class="records" style="display: inline-block;height: 32px;line-height: 32px;margin-left: 5%;">
                当前共<span style="color: #f00;font-weight: bold;"> {{TotalRecords}} </span>条记录，已选定<span style="color: #f00;font-weight: bold;"> {{checkedDatas.length}} </span>条记录
            </div>
        </div>
        <!-- 添加退费 -->
        <Modal v-model="modalAdd" width="660" :mask-closable="false" class-name="vertical-center-modal modalAdd">
            <p slot="header" style="color:#f60;text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>{{if_add ? '新增表' : '修改表配置'}}</span>
                <span class="customer" style="position: absolute; right: 8%;;color:#333">
                    客服: {{formItem.customer}}
                </span>
            </p>
            <div>
            <Form ref="formValidate" :model="formItem" :rules="if_add?ruleValidate:{}" :label-width="120" style="width: 100%;margin: 0 auto">
                <FormItem v-show="if_add" prop="tableName" label="表名" style="width: 60%">
                    <Input  v-model="formItem.tableName" placeholder="表名"></Input>
                </FormItem>
                <FormItem v-show="!if_add" label="表名" style="width: 60%">
                    <Input disabled v-model="formItem.tableName" placeholder="表名"></Input>
                </FormItem>
                <FormItem v-show="if_add"  prop="tableType" label="tableType">
                    <Select filterable v-model="formItem.tableType" @on-change="showWscCode" :clearable="true" placeholder="表类型" style="width: 100px">
                        <Option value="黑名单">黑名单</Option>
                        <Option value="白名单">白名单</Option>
                    </Select>
                </FormItem>
                <FormItem v-show="!if_add"  label="tableType" :placeholder="formItem.tableType">
                    <Select filterable v-model="formItem.tableType" @on-change="showWscCode" :clearable="true" placeholder="表类型" style="width: 100px">
                        <Option value="黑名单">黑名单</Option>
                        <Option value="白名单">白名单</Option>
                    </Select>
                </FormItem>

                <FormItem v-show="if_add"  prop="tableTitle" label="表标题" style="width: 60%">
                    <Input v-model="formItem.tableTitle" placeholder="表标题"></Input>
                </FormItem>
                <FormItem v-show="!if_add" label="表标题" style="width: 60%">
                    <Input v-model="formItem.tableTitle" placeholder="表标题"></Input>
                </FormItem>


                <FormItem label="表字段"  style="width: 100%">
                    <!--:disabled="!if_add"   if_add -->
                    <div class="vol" style="display: inline-block;" v-for="(item,index) in InputList">
                        <Input style="width: 120px;" :disabled="true"  icon="ios-trash-outline" v-bind:value="item"  @on-click="cancle(index)"  placeholder="表字段"></Input>
                    </div>
                    <div>
                        <Input style="width: 40%" v-model="byte" clearable  placeholder="请输入表中所需字段"></Input><Button icon="plus" @click="addInput"></Button>
                    </div>
                </FormItem>

                <FormItem label="备注"  style="width: 60%">
                    <!--:disabled="true" -->
                    <Input  v-model="formItem.remarks" placeholder="备注"></Input>
                </FormItem>
            </Form>
        </div>
            <div slot="footer" style="text-align: right">
                <Button type="success" :loading="modal_loading" @click="handleSubmit('formValidate')">提交</Button>
                <Button type="ghost" style="margin-left: 8px" @click="modalAdd = false">取消</Button>
            </div>
        </Modal>

        <!-- 删除 -->
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
    import util from '@/libs/util';
    import Cookies from 'js-cookie';
    import {ERR_OK,pageSize} from '@/config/config'

    export default {
        data() {
            return {
                byte:"",
                InputList:[],//表中有多个字段
                beforeChanged:"",
                //储存全部的集团编码
                lists:[],
                //用于储存集团编码的省份名称
                names:[],
                //用于储存wscCode
                wscCode:'',
                loading:"",
                if_add: true,
                collapseName: '1',
                remark:"",
                // 详情框
                initTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
                ruleValidate: {
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
                cityList: [],
                modalDelete: false,
                passWord: '',
                // 添加退款相关
                modalAdd: false,
                modal_loading: false,
                formItem: {},
                // 退款列表相关
                dataLoading: false,
                filter: {
                    pageNo: 1,
                    pageSize: pageSize,
                    id:'',//沃视窗编码
                    tableName:'',
                    // 详情搜索
                    tableType: '',//是否启用 0关闭 1启用
                    tableTitle: '',//白名单id
                    tableField: '',//数据类型
                    remarks: ''
                },
                TotalRecords: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '表名',
                        align: 'center',
                        key: 'tableName',
                    },
                    {
                        title: '黑白名单类型',
                        align: 'center',
                        key: 'tableType'
                    },
                    {
                        title: '表标题',
                        align: 'center',
                        key: 'tableTitle'
                    },
                    {
                        title: '表字段',
                        align: 'center',
                        key: 'tableField'
                    },
                    {
                        title: '备注',
                        align: 'center',
                        key: 'remarks'
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
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click:()=>{
                                            var _that = this
                                            this.if_add = false
                                            let count = params.index
                                            this.beforeChanged = _that.datas[count]
                                            this.InputList = params.row.tableField.split(",");
                                            this.formItem = Object.assign({},params.row)
                                            this.modalAdd = true
                                        }
                                    }
                                }, '修改'),
                            ]);
                        }
                    }
                ],
                datas: [],
                orderNos: '',
                checkedDatas: [],
                pageConfig: [8, 10, 15, 18, 20, 300]
            }
        },
        methods: {
            cancle(index) {
                  this.InputList.splice(index,1)
            },
            addInput() {
                /*
                *
                * 这里需要写个正则，传入得是字符串  下划线
                *
                * */
                var regx = /^[a-zA-Z]*$/
                if(!this.byte) {
                    this.$Message.error("请输入需要添加的字段")
                }else {
                    this.InputList.push(this.byte)
                    console.log(this.InputList)
                    this.byte = null;
                }
                /* else if(!regx.test(this.byte)) {
                    this.$Message.error("只能输入英文字母")
                }*/
            },
            showWscCode(value){
                var _that = this
                var a
                for(var i=0;i<_that.lists.length;i++){
                    if(_that.lists[i].name == value){
                        _that.filter.wscCode = _that.lists[i].wscCode
                        //
                        _that.formItem.wscCode = _that.lists[i].wscCode
                    }
                }
                /*_that.wscCode = _that.lists[a]*/
                //filter   快排得 搜索条件

            },
            changeValue(value ){
                this.remark = value
            },
            changeComplainTime(time) {
                this.filter.complainStartTime = time[0] ? `${time[0]} 00:00:00` : ''
                this.filter.complainEndTime = time[1] ? `${time[1]} 23:59:59` : ''
            },
            changeOrderTime(time) {
                this.filter.orderStartTime = time[0] ? `${time[0]} 00:00:00` : ''
                this.filter.orderEndTime = time[1] ? `${time[1]} 23:59:59` : ''
            },
            search(no) {
                var _that = this;
                this.filter.pageNo = no
                this.dataLoading = true
                this.orderNos = ''
                this.checkedDatas = []
                util.ajax.get(util.baseUrl + '/black/white/config/list', {
                    params: this.filter
                })
                    .then(function(res){
                        _that.wscCode =''
                        _that.dataLoading = false
                        if(res.data.status == ERR_OK) {
                            for(let i=0;i<res.data.data.list.length;i++ ){
                                if(res.data.data.list[i].isEnable == 0){
                                    res.data.data.list[i].isEnable="关闭"
                                }else if(res.data.data.list[i].isEnable == 1){
                                    res.data.data.list[i].isEnable="开启"
                                }
                                if(res.data.data.list[i].flagType == 'NO'){
                                    res.data.data.list[i].flagType = "未配置"
                                }
                            }
                            _that.wscCodes=[]
                            _that.filter.wscCode=''
                            _that.datas = res.data.data.list
                            for(let i=0;i<_that.datas.length;i++){
                                _that.wscCodes.push(_that.datas[i].wscCode)
                            }
                            _that.TotalRecords = res.data.data.total
                        }else {
                            _that.$Message.error(res.data.msg)
                        }
                    })
                    .catch(function(err){
                        console.log(err)
                    });
            },
            selectItem(arr) {
                this.checkedDatas = arr;
                var _arr = []
                if(arr.length) {
                    arr.map(item => {
                        _arr.push(item.orderNo)
                    })
                    this.orderNos = _arr.join(',')
                } else {
                    this.orderNos = ''
                }
            },
            changePageSize(pageSize) {
                this.filter.pageSize = pageSize
                this.search(1)
            },
            changePage(no) {
                this.search(no)
            },
            deleteShow() {
                if(!this.checkedDatas.length) {
                    this.$Message.warning('请选择需要删除的订单！');
                    return
                }
                // if(this.checkedDatas.length > 1) {
                //     this.$Message.warning('一次只能删除一条订单！');
                //     return
                // }
                this.passWord = ''
                this.modalDelete = true
            },
            deleteItem() {
                var _that = this
                if(!this.passWord) {
                    this.$Message.warning('请验证当前账户密码！')
                    return
                }
                this.modal_loading = true
                var ids=[]
                if(_that.checkedDatas.length>0){
                    for(let i=0;i<_that.checkedDatas.length;i++){
                        ids.push(_that.checkedDatas[i].id)
                    }
                }
                //将id用逗号 隔开
                ids = ids+","
                //将最后一个逗号去除
                ids = ids.substring(0,ids.length-1)
                var userName = Cookies.get('user')
                var passWord = this.passWord
                util.ajax.get(util.baseUrl + '/black/white/config/delete', {
                    params: {
                        ids:ids,
                        userName:userName,
                        passWord:passWord
                    }
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
            /*exportOut() {
                let _url = `${util.baseUrl}/qgcu/refund/exportExcel?token=${Cookies.get('token')}${util.parseParam(this.filter)}`
                window.location.href = _url
            },*/
            addShow() {
                this.InputList = [];
                this.formItem = {
                    customer: Cookies.get('user'), //客服
                    id: '', // 业务类型
                    tableName: "",  //是否启用 0关闭 1 启用
                    tableType: '', // 沃视窗编码
                    tableTitle: '', //
                    tableField: '', // 省份编码 主键
                    remarks: '' // 回单文本
                }
                this.if_add = true
                this.modalAdd = true
                console.log(this.formItem)
            },
            selectComplainTime(time) {
                this.formItem.complainTime = time
            },
            selectOrderTime(time) {
                this.formItem.orderTime = time
            },
            handleSubmit (name) {
                var _url = this.if_add ? '/black/white/config/add' : '/black/white/config/edit'
                var _that = this
                this.$refs[name].validate((valid) => {
                    console.log(valid)
                    if (valid) {
                        if(this.InputList.length == 0) {
                            _that.$Message.error("请至少添加一个字段")
                        }else if(!_that.formItem.tableType) {
                            _that.$Message.error("请选择表的类型")
                        }else if(!_that.formItem.tableTitle) {
                            _that.$Message.error("请输入表名")
                        }else {
                            if(this.InputList.length > 0) {
                                for(var z = 0 ;z < this.InputList.length ; z++) {
                                    if(z == 0) {
                                        _that.formItem.tableField =  this.InputList[0];
                                    }else {
                                        _that.formItem.tableField = _that.formItem.tableField + ','+ this.InputList[z]
                                    }
                                }
                                this.modal_loading = true
                                util.ajax.get(util.baseUrl + _url, {
                                    params:_that.formItem
                                })
                                    .then(function(res){
                                        _that.modal_loading = false
                                        if(res.data.status == ERR_OK) {
                                            _that.$Message.success(res.data.msg)
                                            _that.modalAdd = false
                                            _that.filter.wscCode = ''
                                            _that.search(1)
                                        }else {
                                            _that.$Message.error(res.data.msg)
                                        }
                                    })
                                    .catch(function(err){
                                        console.log(err)
                                    });
                            }else {
                                _that.$Message.error("请至少添加一个表字段")
                            }
                        }
                    } else {
                        this.$Message.error('请填写完整信息!');
                    }
                })
            },
            downloadFile(fileName) {
                window.location.href = `${util.baseUrl}/xjcu/refund/downFile.do?fileName=${fileName}`
            }
        },
        created() {
            this.search(1)
            var _that = this
            util.ajax.get(util.baseUrl + '/kdcu/online/provinceMap/list',{
                params:{
                    isAll:5
                }
            }).then(res=>{
                _that.lists = res.data.data.list
                for(let i=0;i<_that.lists.length;i++){
                    _that.names.push(_that.lists[i].name)
                }
            })
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
