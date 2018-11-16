<template>
    <div class="complain_nation">
        <Collapse v-model="collapseName" style="margin: 10px 0">
            <Panel name="1">
                <div style="display:inline-block;float: left;margin-right: 10px" @click.stop>
                   <!-- <Button type="success" icon="plus" @click='addShow'>新增白名单ID</Button>-->
                    <!--<Button type="warning" icon="close" @click='changeShow'>修改白名单ID</Button>-->
                    <Button type="error" icon="close" @click='deleteShow'>异常订单删除</Button>
                </div>
                <div slot="content">
                    <Select v-model="filter.channelType" filterable placeholder="请选择渠道类别" style="width: 200px;">
                        <Option v-for="(index,key) in inWayList" :value="index.dictionaryName" :key="key">{{ index.dictionaryName }}</Option>
                    </Select>
                    <Input v-model="filter.mobileNumber" placeholder="请输入电话号码" clearable style="width: 200px"></Input>
                    <!--<Input v-model="filter.flagType" placeholder="请输入：标志类型" clearable style="width: 200px"></Input>
                    <Input v-model="filter.dataType" placeholder="请输入：数据类型" clearable style="width: 200px"></Input>
                    &lt;!&ndash;<Input v-model="filter.remarks" placeholder="请输入：备注" clearable style="width: 200px"></Input>&ndash;&gt;
                    <Select v-model="filter.isEnable" :clearable="true" placeholder="ID状态" style="  width: 100px;margin-right: 10px">
                        <Option value="0">关闭</Option>
                        <Option value="1">开启</Option>
                    </Select>-->
                    <Button type="primary" icon="ios-search" @click='search(1)' style="float: right">查找</Button>
                </div>
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
                <span>异常订单修改</span>
                <span class="customer" style="position: absolute; right: 8%;;color:#333">
                    客服: {{formItem.customer}}
                </span>
            </p>
            <div>
                <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="100" style="width: 100%;margin: 0 auto">
                    <FormItem prop="channelType" label="渠道类型" style="width:80%">
                        <Input disabled v-model="formItem.channelType" placeholder="错误信息" style="width: 40%"></Input>
                        <Select filterable v-model="channelType" @on-change="getType" placeholder="请选择渠道类别" style="width: 40%">
                            <Option v-for="(index,key) in inWayList" :key="key" :value="index.dictionaryName">{{index.dictionaryName}}</Option>
                        </Select>
                    </FormItem>
                    <FormItem label="错误信息" style="width: 40%">
                        <Input v-model="formItem.errorMsg" placeholder="错误信息"></Input>
                    </FormItem>
                    <FormItem  label="电话号码" style="width: 40%">
                        <Input v-model="formItem.mobileNumber" placeholder="电话号码"></Input>
                    </FormItem>
                    <FormItem  label="订单来源" style="width: 40%">
                        <Input v-model="formItem.orderSource" placeholder="订单来源"></Input>
                    </FormItem>
                    <FormItem  label="通道编码" style="width: 40%">
                        <Input v-model="formItem.passagewayCode" placeholder="通道编码"></Input>
                    </FormItem>
                    <FormItem  label="产品编码" style="width: 40%">
                        <Input v-model="formItem.productCode" placeholder="产品编码"></Input>
                    </FormItem>
                    <FormItem  label="省份编码" style="width: 40%">
                        <Input v-model="formItem.provinceCode" placeholder="省份编码"></Input>
                    </FormItem>
                    <FormItem  label="充值策略数据" style="width: 40%">
                        <Input disabled v-model="formItem.rechargeStrategyData" placeholder="充值策略数据"></Input>
                    </FormItem>
                    <FormItem label="充值策略" style="width: 40%">
                        <Input  v-model="formItem.rechargeStrategy" placeholder="充值策略"></Input>
                    </FormItem>

                    <FormItem  label="流水号" style="width: 40%">
                        <Input disabled v-model="formItem.transId" placeholder="流水号 "></Input>
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
    import Operation from 'iview/src/components/transfer/operation';

    export default {
        components: {Operation},
        data() {
            return {
                channelType:'',
                beforeChanged:"",
                //储存全部的集团编码
                lists:[],
                //用于储存集团编码的省份名称
                names:[],
                //用于储存wscCode
                wscCode:'',
                inWayList:[],
                loading:"",
                if_add: true,
                collapseName: '',
                remark:"",
                // 详情框
                initTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
                ruleValidate: {
                    channelType: [
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
                    channelType:'',//沃视窗编码
                    code:'',
                    // 详情搜索
                    isEnable: '',//是否启用 0关闭 1启用
                    whiteId: '',//白名单id
                    dataType: '',//数据类型
                    name: '',
                    flagType: '',//标志类型
                },
                TotalRecords: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '渠道类型',
                        width: 100,
                        align: 'center',
                        key: 'channelType'
                    },
                    {
                        title: '电话号码',
                        align: 'center',
                        key: 'mobileNumber',
                    },
                    {
                        title: '订单来源',
                        align: 'center',
                        key: 'orderSource'
                    },
                    {
                        title: '通道编码',
                        align: 'center',
                        width: 100,
                        key: 'passagewayCode'
                    },
                    {
                        title: '产品编码',
                        align: 'center',
                        key: 'productCode'
                    },
                    {
                        title: '省份编码',
                        align: 'center',
                        key: 'provinceCode'
                    },
                    {
                        title: '充值策略',
                        width: 150,
                        align: 'center',
                        key: 'rechargeStrategy'
                    },
                    {
                        title: '充值策略数据',
                        width: 100,
                        align: 'center',
                        key: 'rechargeStrategyData'
                    },
                    {
                        title: '流水号',
                        width: 200,
                        align: 'center',
                        key: 'transId'
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
                                            var _that = this;
                                            this.formItem = {}
                                            this.formItem = Object.assign({},params.row,{customer: Cookies.get('user')})
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
            getType() {
              this.formItem.channelType = this.channelType
            },
            //获取渠道类型列表
            getWay() {
              //inWayList--/system/data/dictionary/list
                var _that = this
                let jsonData = new URLSearchParams();
                jsonData.append('dictionaryType',"省份");
                util.ajax.post(util.baseUrl + '/system/data/dictionary/list',jsonData)
                    .then(function(res){
                        _that.dataLoading = false
                        if(res.status == ERR_OK) {
                            _that.inWayList = res.data
                        }else {
                            _that.$Message.error(res)
                        }
                    })
                    .catch(function(err){
                        console.log(err)
                    });
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
                util.ajax.get(util.baseUrl + '/abnormal/orders/list', {
                    params: this.filter
                })
                    .then(function(res){
                        _that.dataLoading = false
                        console.log(res.data)
                        if(res.status == ERR_OK) {
                            _that.datas = res.data
                            _that.TotalRecords = res.data.length
                        }else {
                            _that.$Message.error(res)
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
                }else if(this.checkedDatas.length > 1) {
                    this.$Message.warning('一次只能删除一条订单！');
                    return
                }
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
                var transId=_that.checkedDatas[0].transId
                var userName = Cookies.get('user')
                var passWord = this.passWord
                util.ajax.get(util.baseUrl + '/abnormal/orders/delete', {
                    params: {
                        transId:transId,
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
                var _url = '/abnormal/orders/edit'
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var _that = this
                        this.modal_loading = true
                        util.ajax.get(util.baseUrl + _url, {
                            params: {
                                transId:_that.formItem.transId,
                            }
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
            this.getWay()
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
