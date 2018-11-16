<template>
    <div class="complain_nation">
        <Collapse v-model="collapseName" style="margin: 10px 0">
            <Panel name="1">
                <div style="display:inline-block;float: left;margin-right: 10px" @click.stop>
                    <Button type="success" icon="plus" @click='addShow'>新增编码</Button>
                    <!--<Button type="error" icon="close" @click='changeShow'>修改编码</Button>-->
                   <!-- <Button type="info" icon="ios-cloud-download" @click='exportOut'>导出</Button>-->
                </div>
                <div slot="content">
                    <!--<Select v-model="filter.businessType" :clearable="true" placeholder="业务类型" style="width: 100px;margin-right: 10px">-->
                        <!--<Option value="低消">低消</Option>-->
                        <!--<Option value="月包">月包</Option>-->
                        <!--<Option value="内容包">内容包</Option>-->
                        <!--<Option value="其他">其他</Option>-->
                    <!--</Select>-->
                    <!--<Select v-model="filter.refundSource" :clearable="true" placeholder="来源" style="width: 100px;margin-right: 10px">-->
                        <!--<Option value="短信">短信</Option>-->
                        <!--<Option value="视窗">视窗</Option>-->
                        <!--<Option value="其他">其他</Option>-->
                    <!--</Select>-->
                    <Input v-model="filter.wscCode" placeholder="请输入沃视窗编码" clearable style="width: 200px"></Input>
                    <Input v-model="filter.code" placeholder="请输入省份编码主键" clearable style="width: 200px"></Input>
                    <Input v-model="filter.name" placeholder="请输入省份名称" clearable style="width: 200px"></Input>
                    <Input v-model="filter.remarks" placeholder="备注" clearable style="width: 200px"></Input>

                    <!--<Select v-model="filter.name" :clearable="true" filterable placeholder="省份" style="width: 100px;margin-right: 10px">-->
                        <!--<Option v-for="item in cityList" :value="item.key" v-text="item.value" key="item"></Option>-->
                    <!--</Select>-->
                    <!--<datePicker type="daterange" placement="bottom-start" placeholder="投诉日期" style="width: 200px;margin-right: 10px" @on-change="changeComplainTime"></datePicker>
                    <datePicker type="daterange" placement="bottom-start" placeholder="订购日期" style="width: 200px" @on-change="changeOrderTime"></datePicker>-->
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
            <Page
                    :total="TotalRecords"
                    :current="filter.pageNo"
                    @on-change='changePage'
                    :page-size="filter.pageSize"
                    show-elevator show-sizer placement="top"
                    :page-size-opts="pageConfig"
                    @on-page-size-change="changePageSize"
                    style="display: inline-block;vertical-align: middle;"></Page>
            <div class="records" style="display: inline-block;height: 32px;line-height: 32px;margin-left: 5%;">
                当前共<span style="color: #f00;font-weight: bold;"> {{TotalRecords}} </span>条记录，已选定<span style="color: #f00;font-weight: bold;"> {{checkedDatas.length}} </span>条记录
            </div>
        </div>

        <!-- 添加退费 -->
        <Modal v-model="modalAdd" width="660" :mask-closable="false" class-name="vertical-center-modal modalAdd">
            <p slot="header" style="color:#f60;text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>{{if_add ? '新增' : '修改'}}编码</span>
                <span class="customer" style="position: absolute; right: 8%;;color:#333">
                    客服: {{formItem.customer}}
                </span>
            </p>
            <div>
                <Form ref="formValidate" :model="formItem" :rules="ruleValidate" :label-width="120" style="width: 100%;margin: 0 auto">
                    <FormItem label="沃视窗编码    " prop="wscCode" style="width: 60%">
                        <Input v-model="formItem.wscCode" placeholder="沃视窗编码,如：NM"></Input>
                    </FormItem>
                    <FormItem label="省份编码主键" prop="code" style="width: 60%">
                        <Input v-model="formItem.code" placeholder="省份编码,如：101"></Input>
                        <!--<Select v-model="formItem.province" :clearable="true" filterable>-->
                            <!--<Option v-for="item in cityList" :value="item.key" v-text="item.value" key="item"></Option>-->
                        <!--</Select>-->
                    </FormItem>
                    <FormItem label="省 份 名 称" prop="name" style="width: 60%">
                        <Input v-model="formItem.name" placeholder="省份名称，如：四川"></Input>
                    </FormItem>

                    <FormItem label="备注" style="width: 60%">
                        <Input v-model="formItem.remarks" placeholder="请输入备注"></Input>
                    </FormItem>
                    <FormItem label="是否启用" style="width: 60%">
                        <Input v-show="!if_add" :disabled="true" v-model="formItem.isEnable==0?'关闭':'开启'" placeholder="请输入备注" style="width: 100px"></Input>
                        <Select v-model="formItem.isEnable" style="width: 100px">
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
                loading:"",
                value14: 'Hello World',
                if_add: true,
                collapseName: '',
                // 详情框
                initTime: `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()}`,
                ruleValidate: {
                    wscCode: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    code: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    isEnable: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    province: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    businessType: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    refundSource: [
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
                    // 快速搜索
                    email: '',
                    wscCode:'',
                    code:'',
                    refundBusinessStatus: '',
                    internalRefundStatus: '',
                    oneRefundStatus: '',
                    twoRefundStatus: '',
                    // 详情搜索
                    complainStartTime: '',
                    complainEndTime: '',
                    orderStartTime: '',
                    orderEndTime: '',
                    endTime: '',
                    mobileNumber: '',
                    name: '',
                    businessType: '',
                    refundSource: '',
                    remarks:''
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
                        title: '省份编码主键',
                        align: 'center',
                        key: 'code'
                    },
                    {
                        title: '省份',
                        align: 'center',
                        key: 'name'
                    },
                    {
                        title: '编码状态',
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
                        width: 150,
                        align: 'center',
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
                                            util.changeState.call(this,"开启",params)
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
                                            console.log(1)
                                            util.changeState.call(this,"关闭",params)
                                        }
                                    }
                                }, '关闭'),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small'
                                    },

                                    on: {
                                        click: () => {
                                            this.modalAdd = true
                                            this.if_add = false
                                            this.formItem = {
                                                customer: Cookies.get('user'), //客服
                                                mobileNumber: '', //电话号
                                                province: params.row.province, // 省份
                                                businessType: '月包', // 业务类型
                                                isEnable: params.row.isEnable,  //是否启用 0关闭 1 启用
                                                wscCode: params.row.wscCode, // 沃视窗编码
                                                name: params.row.name, // 退费来源
                                                code: params.row.code, // 省份编码 主键
                                                returnText: '用户否认订购行为。', // 回单文本
                                                remarks: params.row.remarks, // 备注
                                            }
                                            if(params.row.isEnable == "关闭"){
                                                this.formItem.isEnable = 0
                                            }else if(params.row.isEnable == "开启"){
                                                this.formItem.isEnable = 1
                                            }
                                        }
                                    }
                                }, '修改')
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
            /*getCity() {
                var _that = this;
                util.ajax.get(util.baseUrl + '/qgcu/tool/getProvince')
                    .then(function(res){
                        if(res.data.status == ERR_OK) {
                            res.data.data.map(item => {
                                _that.cityList.push({
                                    key: item,
                                    value: item
                                })
                            })
                        }else {
                            _that.$Message.error(res.data.msg)
                        }
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            },*/
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
                util.ajax.get(util.baseUrl + '/kdcu/online/provinceMap/list', {
                    params: this.filter
                })
                    .then(function(res){
                        _that.dataLoading = false
                        // console.log(res.data.data.list)
                        if(res.data.status == ERR_OK) {
                            for(let i=0;i<res.data.data.list.length;i++ ){
                                if(res.data.data.list[i].isEnable == 0){
                                    res.data.data.list[i].isEnable="关闭"
                                }else if(res.data.data.list[i].isEnable == 1){
                                    res.data.data.list[i].isEnable="开启"
                                }
                            }
                            _that.datas = res.data.data.list

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
                if(this.checkedDatas.length > 1) {
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
                util.ajax.get(util.baseUrl + '/qgcu/refund/delete', {
                    params: {
                        orderNo: _that.checkedDatas[0].orderNo,
                        userName: Cookies.get('user'),
                        passWord: _that.passWord
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
                    mobileNumber: '', //电话号
                    province: '', // 省份
                    businessType: '月包', // 业务类型
                    isEnable: 1,  //是否启用 0关闭 1 启用
                    wscCode: '', // 沃视窗编码
                    name: '', // 退费来源
                    code: '', // 省份编码 主键
                    returnText: '用户否认订购行为。', // 回单文本
                    remarks: '', // 备注
                }
            },
            changeShow() {
                this.modalAdd = true
                this.if_add = false
                this.formItem = {
                    customer: Cookies.get('user'), //客服
                    mobileNumber: '', //电话号
                    province: '', // 省份
                    businessType: '月包', // 业务类型
                    isEnable: 1,  //是否启用 0关闭 1 启用
                    wscCode: '', // 沃视窗编码
                    name: '', // 退费来源
                    code: '', // 省份编码 主键
                    returnText: '用户否认订购行为。', // 回单文本
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
                var _that = this
                var _url = this.if_add ? '/kdcu/online/provinceMap/add' : '/kdcu/online/provinceMap/edit'
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.modal_loading = true
                        util.ajax.get(util.baseUrl + _url, {
                            params: _that.formItem
                        })
                            .then(function(res){
                                _that.modal_loading = false
                                if(res.data.status == ERR_OK) {
                                    _that.$Message.success(`${_that.if_add ?'添加':'修改'}成功!`)
                                    _that.modalAdd = false
                                    _that.search(1)
                                }else {
                                    _that.$Message.error(res.data.msg)
                                }
                            })
                            .catch(function(err){
                                console.log(err)
                            });
                    } else {
                        this.$Message.error('请填写完整退款信息!');
                    }
                })
            },
            downloadFile(fileName) {
                window.location.href = `${util.baseUrl}/xjcu/refund/downFile.do?fileName=${fileName}`
            }
        },
        created() {
            this.search(1)
            // this.getCity()
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
