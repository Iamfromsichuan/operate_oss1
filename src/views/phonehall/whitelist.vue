<template>
    <div class="complain_nation">
        <Collapse v-model="collapseName" style="margin: 10px 0">
            <Panel name="1">
                <div style="display:inline-block;float: left;margin-right: 10px" @click.stop>
                    <Button type="success" icon="plus" @click='addShow'>新增白名单ID</Button>
                    <!--<Button type="warning" icon="close" @click='changeShow'>修改白名单ID</Button>-->
                    <Button type="error" icon="close" @click='deleteShow'>删除白名单ID</Button>
                </div>
                <div slot="content">
                   <!-- <Select v-model="wscCode" @on-change="showWscCode" :clearable="true" placeholder="省份名称" style="width: 100px;margin-right: 10px">
                        <Option v-for="(index,key) in names" :key="key" :value="index">{{index}}</Option>
                    </Select>-->
                    <Select v-model="wscCode" filterable placeholder="请选择查看省份" style="width: 500px;">
                        <Option v-for="(index,key) in names" :value="index" :key="key">{{ index }}</Option>
                    </Select>
                    <Input v-model="filter.whiteId" placeholder="请输入：白名单id" clearable style="width: 200px"></Input>
                    <Input v-model="filter.flagType" placeholder="请输入：标志类型" clearable style="width: 200px"></Input>
                    <Input v-model="filter.dataType" placeholder="请输入：数据类型" clearable style="width: 200px"></Input>
                    <!--<Input v-model="filter.remarks" placeholder="请输入：备注" clearable style="width: 200px"></Input>-->
                    <Select v-model="filter.isEnable" :clearable="true" placeholder="ID状态" style="  width: 100px;margin-right: 10px">
                        <Option value="0">关闭</Option>
                        <Option value="1">开启</Option>
                    </Select>
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
                <span>{{if_add ? '新增' : '修改'}}白名单ID</span>
                <span class="customer" style="position: absolute; right: 8%;;color:#333">
                    客服: {{formItem.customer}}
                </span>
            </p>
            <div>
                <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="120" style="width: 100%;margin: 0 auto">
                    <FormItem label="省份名称" prop="wscCode" style="width:60%">
                        <!--<Input v-model="formItem.wscCode" placeholder="沃视窗编码,如：NM"></Input>-->
                        <Input v-show="!if_add" v-model="formItem.wscCode"  :disabled="true" style="width: 100px"></Input>
                        <Select filterable v-model="wscCode" @on-change="showWscCode" :clearable="true" placeholder="请选择省份" style="width: 100px">
                            <Option v-for="(index,key) in names" :key="key" :value="index">{{index}}</Option>
                        </Select>

                    </FormItem>
                    <FormItem label="白名单ID" prop="whiteId" style="width: 60%">
                        <Input v-model="formItem.whiteId" placeholder="白名单ID,如：101"></Input>
                    </FormItem>
                    <FormItem v-show="if_add" label="标志类型" style="width: 60%">
                        <Cascader  @on-change="changeValue" :data="datalen" trigger="click"></Cascader>
                    </FormItem>
                    <FormItem v-show="!if_add" label="数据类型" style="width: 60%">
                        <Input v-model="formItem.dataType" placeholder="数据类型,如：101"></Input>
                    </FormItem>
                    <FormItem v-show="!if_add" label="标志类型" style="width: 60%">
                        <Input v-model="formItem.flagType" placeholder="数据类型,如：101"></Input>
                    </FormItem>
                        <FormItem v-show="!if_add" label="备注" style="width: 60%">
                        <Input v-model="formItem.remarks" placeholder="数据类型,如：101"></Input>
                    </FormItem>
                    <FormItem label="是否启用"  style="width: 60%">
                        <Input v-show="!if_add" v-model="formItem.isEnable==0?'关闭':'开启'"  :disabled="true" style="width: 100px"></Input>
                        <Select  v-model="formItem.isEnable" :clearable="true" style="width: 100px" placeholder="请选择状态">
                            <Option value="0">关闭</Option>
                            <Option value="1">启用</Option>
                        </Select>
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
                beforeChanged:"",
                //储存全部的集团编码
                lists:[],
                //用于储存集团编码的省份名称
                names:[],
                //用于储存wscCode
                wscCode:'',
                datalen:[
                    {//1
                        value: '21亲情号',
                        label: '21亲情号',
                        children: [
                            {//2
                                value: 'qin123456',
                                label: 'qin123456'
                            }
                        ]
                    },
                    {//1
                        value: '新入网群',
                        label: '新入网群',
                        children: [
                            {//2
                                value: 'new12345',
                                label: 'new12345',
                            }
                        ]
                    },
                    {//1
                        value: '沉默用户',
                        label: '沉默用户',
                        children: [
                            {//2
                                value: 'old123456',
                                label: 'old123456',
                            }
                        ]
                    },
                    {//1
                        value: '生日',
                        label: '生日',
                        children: [
                            {//2
                                value: 'bir12345',
                                label: 'bir12345',
                                children:[
                                    {//3
                                        value: '生日新入网用户',
                                        label: '生日新入网用户'
                                    },
                                    {//3
                                        value: '生日沉默用户',
                                        label: '生日沉默用户',
                                    },
                                    {//3
                                        value: '生日其他用户',
                                        label: '生日其他用户',
                                    }
                                ]
                            }
                        ]
                    },
                    {//1
                        value: '周年',
                        label: '周年',
                        children: [
                            {//2
                                value: 'ann12345',
                                label: 'ann12345',
                                children:[
                                    {//3
                                        value: '周年新入网用户',
                                        label: '周年新入网用户',
                                    },
                                    {//3
                                        value: '周年沉默用户',
                                        label: '周年沉默用户',
                                    },
                                    {//3
                                        value: '周年送祝福用户',
                                        label: '周年送祝福用户',
                                    }
                                ]
                            }
                        ]
                    },
                ],
                loading:"",
                if_add: true,
                collapseName: '',
                remark:"",
                // 详情框
                initTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
                ruleValidate: {
                    wscCode: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    isEnable: [
                        { required: true, message: ' ', trigger: 'change' }
                    ],
                    flagType: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    whiteId: [
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
                    wscCode:'',//沃视窗编码
                    code:'',
                    // 详情搜索
                    isEnable: '',//是否启用 0关闭 1启用
                    whiteId: '',//白名单id
                    dataType: '',//数据类型
                    name: '',
                    flagType: '',//标志类型
                    remarks:''//是否启用 0关闭 1启用
                },
                TotalRecords: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '沃视窗编码',
                        align: 'center',
                        key: 'wscCode'
                    },
                    {
                        title: '白名单ID',
                        align: 'center',
                        key: 'whiteId',
                    },
                    {
                        title: '标志类型',
                        align: 'center',
                        key: 'flagType'
                    },
                    {
                        title: '数据类型',
                        align: 'center',
                        key: 'dataType'
                    },
                    {
                        title: '白名单ID状态',
                        align: 'center',
                        key: 'isEnable'
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
                        width: 150,
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
                                            let vm = params.row.id
                                            util.changeState.call(this,"开启",params,vm)
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
                                            let vm = params.row.id
                                            util.changeState.call(this,"关闭",params,vm)
                                        }
                                    }
                                }, '关闭'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },
                                    on: {
                                        click:()=>{
                                            var _that = this
                                            this.if_add = false
                                            //当前选择得内容处于 请求列表得下标
                                            let count = params.index //(this.filter.pageNo-1)*pageSize+
                                            this.beforeChanged = _that.datas[count]
                                            console.log(_that.datas)
                                            //修改之前得数据内容
                                            var remarks = this.beforeChanged.remarks.split("-")
                                            if(remarks.length>0){
                                                var cont = remarks.length
                                                remarks = remarks[cont-1]
                                            }else {
                                                remarks = this.beforeChanged.remarks
                                            }
                                            // beforeChanged = _that.datas[count]

                                            this.modalAdd = true
                                            this.formItem = {
                                                customer: Cookies.get('user'), //客服
                                                mobileNumber: '', //电话号
                                                province: '', // 省份
                                                flagType: this.beforeChanged.flagType, // 标志类型
                                                isEnable:this.beforeChanged.isEnable,  //是否启用 0关闭 1 启用
                                                wscCode: this.beforeChanged.wscCode, // 沃视窗编码
                                                name: "", // 退费来源
                                                dataType:this.beforeChanged.dataType,
                                                whiteId: this.beforeChanged.whiteId, // 白名单id
                                                returnText: '用户否认订购行为。', // 回单文本
                                                remarks: remarks, // 备注
                                                id:this.beforeChanged.id,//id
                                            }
                                            if(this.beforeChanged.isEnable == "关闭"){
                                                this.formItem.isEnable = 0
                                            }else if(this.beforeChanged.isEnable == "开启"){
                                                this.formItem.isEnable = 1
                                            }
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
                util.ajax.get(util.baseUrl + '/kdcu/online_retailers/listid/list', {
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
                util.ajax.get(util.baseUrl + '/kdcu/online_retailers/listid/delete', {
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
                this.modalAdd = true
                this.if_add = true
                this.formItem = {
                    customer: Cookies.get('user'), //客服
                    dataType: '', // 业务类型
                    isEnable: "",  //是否启用 0关闭 1 启用
                    wscCode: '', // 沃视窗编码
                    id: '', //
                    flagType: '', // 省份编码 主键
                    whiteId: '', // 回单文本
                    remarks: '', // 备注
                }
            },
            selectComplainTime(time) {
                this.formItem.complainTime = time
            },
            selectOrderTime(time) {
                this.formItem.orderTime = time
            },
            handleSubmit (name) {
                var _url = this.if_add ? '/kdcu/online_retailers/listid/add' : '/kdcu/online_retailers/listid/edit'
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var a = this.remark.length
                        var _that = this
                        if(this.if_add){
                            if(a>3){
                                _that.formItem.flagType = '1'
                                _that.formItem.remarks = _that.remark[a-1]
                                _that.formItem.dataType = _that.remark[0]
                            }else {
                                _that.formItem.flagType = 'NO'
                                _that.formItem.remarks = _that.remark[0]
                                _that.formItem.dataType = _that.remark[1]
                            }
                        }
                        if(_that.formItem.flagType == "未配置"){
                            _that.formItem.flagType = "NO"
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
