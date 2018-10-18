<template>
    <div class="complain_nation complain_nation_cs">
        <Collapse v-model="collapseName" style="margin: 10px 0">
            <Panel name="1">
                <div style="display:inline-block;float: left;margin-right: 10px" @click.stop>
                    <Button type="success" icon="plus" @click='addShow'>新增产品短信</Button>
                    <Button type="error" icon="close" @click='deleteShow'>删除产品短信</Button>
                    <Button type="primary" icon="ios-cloud-download" @click='exportOut'>导出</Button>
                </div>
                <div slot="content">
                    <Select v-model="filter.provinceCode" @on-change="filterProductCode" clearable filterable placeholder="请选择通道" style="width: 200px;">
                        <Option v-for="(index,key) in provenCodes" :value="index.dictionaryCode" :key="key">{{ index.dictionaryName }}</Option>
                    </Select>

                    <Select v-model="filter.productCode" clearable filterable placeholder="请选择产品名称" style="width: 350px;">
                        <Option v-for="(index,key) in checkedProducstCode" :value="index.productCode" :key="key">{{ index.productName }}</Option>
                    </Select>
                    <Select v-model="filter.channelType" clearable filterable placeholder="请选择渠道类型" style="width: 200px;">
                        <Option v-for="(index,key) in fromWays" :value="index.dictionaryCode" :key="key">{{ index.dictionaryCode }}</Option>
                    </Select>

                    <Select v-model="filter.smsType" clearable filterable placeholder="请选择短信类型" style="width: 200px;">
                        <Option v-for="(index,key) in shortType" :value="index.dictionaryName" :key="key">{{ index.dictionaryName }}</Option>
                    </Select>

                    <Select v-model="filter.spCode" clearable filterable placeholder="请选择短信通道编码" style="width: 200px;">
                        <Option v-for="(index,key) in shortWay" :value="index.dictionaryCode" :key="key">{{ index.dictionaryName }}</Option>
                    </Select>
                    <!--<Select v-model="filter.provinceCode" filterable placeholder="请选择产品类型" style="width: 200px;">
                        <Option v-for="(index,key) in shortWay" :value="index.dictionaryCode" :key="key">{{ index.dictionaryName }}</Option>
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
        <Modal v-model="modalAdd" width="400" :mask-closable="false" class-name="vertical-center-modal modalAdd">
            <p slot="header" style="color:#f60;text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>{{if_add ? '新增' : '修改'}}产品短信</span>
                <span class="customer" style="position: absolute; right: 8%;;color:#333">
                    客服: {{formItem.customer}}
                </span>
            </p>
            <div>
                <Form ref="formValidate" :model="formItem" :rules="ruleValidate" style="width: 100%;margin: 0 auto">
                    <FormItem prop="productCode" v-show="if_add" style="width:100%;margin-bottom: 10px">
                        <Select v-model="formItem.productCode" filterable placeholder="请选择产品类型">
                            <Option v-for="(index,key) in producstCode" :value="index.productCode" :key="key">{{ index.productName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="productCode" v-show="!if_add" style="width:100%;margin-bottom: 10px">
                        <Input disabled placeholder="请选择产品类型" style="width: 100%" v-model="formItem.productCode"></Input>
                    </FormItem>


                    <FormItem prop="channelType" v-show="if_add" style="width: 100%;margin-bottom: 10px">
                        <Select v-model="formItem.channelType" filterable placeholder="请选择渠道类型">
                            <Option v-for="(index,key) in fromWays" :value="index.dictionaryCode" :key="key">{{ index.dictionaryCode }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="channelType" v-show="!if_add" style="width:100%;margin-bottom: 10px">
                        <Input disabled placeholder="请选择渠道类型" style="width: 100%" v-model="formItem.channelType"></Input>
                    </FormItem>



                    <FormItem v-show="if_add" style="width: 100%;margin-bottom: 10px">
                        <Select v-model="formItem.provinceCode" filterable placeholder="请选择省份">
                            <Option v-for="(index,key) in provenCodes" :value="index.dictionaryCode" :key="key">{{ index.dictionaryName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem prop="provinceCode" v-show="!if_add" style="width:100%;margin-bottom: 10px">
                        <Input disabled placeholder="请选择省份" style="width: 100%" v-model="formItem.provinceCode"></Input>
                    </FormItem>


                    <FormItem v-show="if_add"  style="width: 100%;margin-bottom: 10px">
                        <Select v-model="formItem.smsType" filterable placeholder="请选择短信类型">
                            <Option v-for="(index,key) in shortType" :value="index.dictionaryName" :key="key">{{ index.dictionaryName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem v-show="!if_add" style="width:100%;margin-bottom: 10px">
                        <Input disabled placeholder="请选择短信类型" style="width: 100%" v-model="formItem.smsType"></Input>
                    </FormItem>

                    <FormItem v-show="if_add" style="width: 100%;margin-bottom: 10px">
                        <Select v-model="formItem.spCode" filterable placeholder="请选择短信通道编码">
                            <Option v-for="(index,key) in shortWay" :value="index.dictionaryCode" :key="key">{{ index.dictionaryName }}</Option>
                        </Select>
                    </FormItem>
                    <FormItem  v-show="!if_add" style="width:100%;margin-bottom: 10px">
                        <Input disabled placeholder="请选择短信通道编码" style="width: 100%" v-model="formItem.spCode"></Input>
                    </FormItem>


                    <FormItem style="width: 100%;margin-bottom: 10px" >
                        <span>短信内容：</span><br/>
                        <Input v-model="formItem.content" type="textarea" :rows="4" placeholder="请输入短信内容" />
                    </FormItem>
                    <FormItem style="width: 100%;margin-bottom: 10px" >
                        <span>备注：</span><br/>
                        <Input v-model="formItem.remarks" type="textarea" :rows="1" placeholder="请输入备注" />
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
                producstCode:[],//产品编码集合
                checkedProducstCode:[],
                fromWays:[],//渠道类型集合
                provenCodes:[],//省份类型集合
                shortType:[],//短信类型集合
                shortWay:[],//短信通道编码集合
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
                filter: {
                    pageNo: 1,
                    pageSize: pageSize,
                    provinceCode:'',//省份编码
                    productCode:'',//产品编码
                    // 详情搜索
                    channelType: '',//渠道类型
                    smsType: '',//短信类型
                    content: '',//短信内容
                    spCode: '',//短信通道编码
                    remarks:''//备注
                },
                ruleValidate: {
                    provinceCode: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    productCode: [
                        { required: true, message: ' ', trigger: 'change' }
                    ],
                    channelType: [
                        { required: true, message: ' ', trigger: 'blur' }
                    ],
                    smsType: [
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
                TotalRecords: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '省份编码',
                        align: 'center',
                        key: 'provinceCode',
                        render: (h, params) => {
                            let _name = ''
                            for(let i = 0 ; i < this.provenCodes.length ; i ++) {
                                if(params.row.provinceCode == this.provenCodes[i].dictionaryCode) {
                                    _name = this.provenCodes[i].dictionaryName
                                }
                            }
                            return h('div', [
                                h('Span', {}, _name),
                            ]);
                        }
                    },
                    {
                        title: '产品类型',
                        align: 'center',
                        key: 'productCode',
                        render: (h, params) => {
                            /*
                            * 手动将 编码转换成名称 方便营销人员辨识
                            * */
                            let _name = ''//productName/productCode
                            for(let i = 0 ; i < this.producstCode.length ; i ++) {
                                if(params.row.productCode == this.producstCode[i].productCode) {
                                    _name = this.producstCode[i].productName
                                }
                            }
                            return h('div', [
                                h('Span', {}, _name),
                            ]);
                        }
                    },
                    {
                        title: '渠道类型',
                        align: 'center',
                        key: 'channelType'
                    },
                    {
                        title: '短信类型',
                        align: 'center',
                        key: 'smsType'
                    },
                    {
                        title: '短信内容',
                        align: 'center',
                        key: 'content',
                        width:400
                    },
                    {
                        title: '短信通道',
                        align: 'center',
                        key: 'spCode'
                    },
                    {
                        title: '备注',
                        align: 'center',
                        key: 'remarks'
                    },
                    {
                        title: '操作',
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
            filterProductCode(val) {
              this.checkedProducstCode=[];
              for(let i =0 ;i < this.producstCode.length ; i ++ ) {
                 if( this.producstCode[i].passagewayCode === val) {
                   this.checkedProducstCode.push(this.producstCode[i])
                 }
              }
              console.log(this.checkedProducstCode.length)
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
                util.ajax.get(util.baseUrl + '/core/product/sms/list', {
                    params: this.filter
                })
                    .then(function(res){
                        _that.wscCode =''
                        _that.dataLoading = false
                        if(res.status == ERR_OK) {
                            _that.datas = res.data.data.list
                            _that.TotalRecords = res.data.data.total
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
                util.ajax.get(util.baseUrl + '/core/product/sms/delete', {
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
            exportOut() {
                let url = `${util.baseUrl}/core/product/sms/export?token=${Cookies.get('token')}${util.parseParam(this.filter)}`
                window.location.href = url
            },
            addShow() {
                this.modalAdd = true
                this.if_add = true
                this.formItem = {
                    customer: Cookies.get('user'), //客服
                    provinceCode: '', // 业务类型
                    productCode: "",  //是否启用 0关闭 1 启用
                    channelType: '', // 沃视窗编码
                    smsType: '', //
                    content: '', // 省份编码 主键
                    remarks: '', // 回单文本
                    spCode: '', // 备注
                }
            },
            selectComplainTime(time) {
                this.formItem.complainTime = time
            },
            selectOrderTime(time) {
                this.formItem.orderTime = time
            },
            handleSubmit (name) {
                var _url = this.if_add ? '/core/product/sms/add' : '/core/product/sms/edit'
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        var _that = this
                        this.modal_loading = true
                        util.ajax.get(util.baseUrl + _url, {
                            params:_that.formItem
                        })
                            .then(function(res){
                                _that.modal_loading = false
                                if(res.data.status == ERR_OK) {
                                    _that.$Message.success(res.data.msg)
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
                        this.$Message.error('请填写完整信息!');
                    }
                })
            },
            downloadFile(fileName) {
                window.location.href = `${util.baseUrl}/xjcu/refund/downFile.do?fileName=${fileName}`
            },
            getProvinceName(name,obj){
                let _that = this
                util.ajax.get(util.baseUrl + '/system/data/dictionary/list',{
                    params:{
                        dictionaryType:name
                    }
                })
                    .then(function(res){
                        _that[obj] = res.data
                        _that.dataLoading = false
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            },
            search2() {
                var _that = this
                var filter = {
                    pageNo:1,
                    pageSize:100
                }
                this.dataLoading = true
                util.ajax.get(util.baseUrl + '/core/channel/products/list', {
                    params: filter
                })
                    .then(function(res){
                        if(res.status == ERR_OK) {
                           console.log(res)
                            _that.producstCode = res.data.data.list;
                            /*_that.totalRecords = res.data.length*/
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
            this.getProvinceName("短信通道编码","shortWay")
            this.getProvinceName("短信类型","shortType")
            this.getProvinceName("省份","provenCodes")
            this.getProvinceName("渠道类型","fromWays")
            this.search2()
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
    .complain_nation_cs .ivu-poptip-inner{
        white-space: normal!important;
        font-size: 14px;
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
