<template>
    <div class="messageList">
        <Row>
            <Col span="4">
                <Select clearable v-model="filter.provinceName" placeholder="请选择省份" filterable>
                    <Option v-for="item in cityList" :value="item.provinceName" :key="item.provinceName">{{ item.provinceName }}</Option>
                </Select>
            </Col>
            <Col offset="1" span="7">
                <Button type="primary" icon="ios-search" @click="search(1)">查找</Button>
            </Col>
        </Row>
        <br>
        <Modal v-model="modalAdd" width="660" :mask-closable="false" class-name="vertical-center-modal modalAdd">
            <p slot="header" style="color:#f60;text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>修改</span>
            </p>
            <div>
                <Form ref="formValidate" :model="checkedItem" :rules="ruleValidate" :label-width="120" style="width: 100%;margin: 0 auto">
                    <FormItem label="省份编码    " prop="wscCode" style="width: 60%">
                        <Input disabled v-model="checkedItem.provinceCode" placeholder="省份编码"></Input>
                    </FormItem>

                    <FormItem label="省份名称" prop="name" style="width: 60%">
                        <Input disabled v-model="checkedItem.provinceName" placeholder="省份名称，如：四川"></Input>
                    </FormItem>
                    <FormItem label="sp号码" prop="name" style="width: 60%">
                        <Input disabled v-model="checkedItem.spNumber" placeholder="sp号码"></Input>
                    </FormItem>
                    <FormItem label="主键ID" prop="code" style="width: 60%">
                        <Input disabled v-model="checkedItem.id" placeholder="省份编码,如：101"></Input>
                    </FormItem>

                    <FormItem label="24小时收到上限" style="width: 60%">
                        <Input v-model="count" placeholder="请输入上限"></Input>
                    </FormItem>
                    <FormItem label="发送时段" style="width: 80%">
                        <Input disabled v-model="checkedItem.timeInterval" placeholder="请输入发送时段" style="width: 40%"></Input>
                        <TimePicker confirm type="timerange" format="HH:mm" placement="bottom-end"  @on-change="handleChange" @on-ok="changeTimeInterval"></TimePicker>
                    </FormItem>
                    <FormItem label="备注" style="width: 60%">
                        <Input v-model="remarks" placeholder="请输入备注"></Input>
                    </FormItem>
                </Form>
            </div>
            <div slot="footer" style="text-align: right">
                <Button type="success" :loading="modal_loading" @click="handleSubmit">提交</Button>
                <Button type="ghost" style="margin-left: 8px" @click="deleteTa">取消</Button>
            </div>
        </Modal>

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
                count:'',
                remarks:'',
                changedTime:[],
                modal_loading:false,
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
                checkedItem:{},
                if_add:false,
                modalAdd:false,
                cityList: [],
                filter: {
                    provinceName: '',
                    pageNo:1,
                    pageSize: pageSize
                },
                changefilter : {
                    provinceCode:'',
                    id:'',
                    spNumber:'',
                    provinceName:'',
                    remarks:'',
                    count:'',
                    timeInterval:''
                },
                totalRecords: 0,
                dataLoading: false,
                columns: [
                    {
                        title: '省份编码',
                        key: 'provinceCode',
                        align:"center"
                    },
                    {
                        title: 'sp号码',
                        key: 'spNumber',
                        align:"center"
                    },
                    {
                        title: '省份名称',
                        key: 'provinceName',
                        align:"center"
                    },
                    {
                        title: '备注',
                        key: 'remarks',
                        align:"center"
                    },
                    {
                        title: '用户间隔24小时收到的上限',
                        key: 'count',
                        align:"center",
                        width:400
                    },
                    {
                        title: '发送时段',
                        key: 'timeInterval',
                        align:"center"
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
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            console.log(params.row)
                                            this.checkedItem = params.row
                                            this.modalAdd = true
                                            this.count = this.checkedItem.count
                                            this.remarks = this.checkedItem.remarks
                                        }
                                    }
                                }, '修改')
                            ]);
                        }
                    }
                ],
                datas: []
            }
        },
        methods: {
            deleteTa(){
                this.modalAdd = false
            },
            handleSubmit(){
                var _that = this
                _that.changefilter = util.copyNeed(_that.changefilter,_that.checkedItem)//从目标数据中 只拷贝我们有的属性
                _that.changefilter.count = _that.count
                _that.changefilter.remarks = _that.remarks
                var a = _that.changefilter.timeInterval.split("-");
                var b,c;
                var old = _that.changefilter
                b = _that.toGetTime(a[0])
                c = _that.toGetTime(a[1])
                _that.changefilter.timeInterval = b + "-" + c;
                var re = /^[0-9]+.?[0-9]*$/; //判断字符串是否为数字
                if (re.test(_that.changefilter.count)){
                    util.ajax.get(util.baseUrl + '/contact/sgipSpConfig/sgipSpConfigEdit', {
                        params: this.changefilter
                    })
                        .then(function(res){
                            console.log(res);
                            if(res.data.status == ERR_OK) {
                                _that.modalAdd = false
                                _that.$Message.success(res.data.msg)
                            }
                            _that.search(1);
                        })
                        .catch(function(err){
                            _that.modalAdd = false
                            _that.$Message.error(res.data.msg)
                            _that.search(1);

                        });
                }else {
                    _that.$Message.error("请输入数字")
                    return
                }
            },
            changeTimeInterval () {
                this.checkedItem.timeInterval = this.changedTime
            },
            handleChange(time) {
                this.changedTime = time[0] + "-" +time[1];
            },
            toGetTime(str){
                str = str.split(":")
                str = parseInt(str[0])*60 + parseInt(str[1])
                return str
            },
            changeAcTime(number){
                if(number < 10) {//小于10分钟   就是  00：0x
                    number = '00:0' + number
                }else if(number >= 10 && number < 60){//大于十 小于60  就是00：xx
                    number = '00:' + number
                }else if(number >= 60 && parseInt(number/60) <10 && number%60 < 10){//小时数小于10  分钟数小于十  0
                    number =  '0' + parseInt(number/60)+':0'+ number%60
                }else if(number >= 60 && parseInt(number/60) <10 && number%60 >= 10) {//小时数小于10  分钟数 大于10 0x:xx
                    number =  '0' + parseInt(number/60)+':'+ number%60
                }else if(number >= 60 &&parseInt(number/60) >=10 && number%60 < 10){//小时数大于10   分钟数小于10  xx:0x
                    number = parseInt(number/60)+':0'+ number%60
                }else if(parseInt(number/60) >= 60 &&parseInt(number/60) >=10 && number%60 >= 10){//小时数大于十   分钟数大于10  xx:xx
                    number =   parseInt(number/60) +':'+ number%60
                }
                return number
            },
            search(no) {
                var _that = this
                this.filter.pageNo = no
                this.dataLoading = true
                util.ajax.get(util.baseUrl + '/contact/sgipSpConfig/sgipSpConfigList', {
                    params: this.filter
                })
                    .then(function(res){
                        if(res.data.status == ERR_OK) {
                            var list = res.data.data.list
                            console.log(res)
                            var a ,b;
                            for(let i=0;i<list.length;i++){
                                if(list[i].timeInterval){
                                    a = _that.changeAcTime(parseInt(list[i].timeInterval.split("-")[0]))
                                    b = _that.changeAcTime(parseInt(list[i].timeInterval.split("-")[1]))
                                    list[i].timeInterval = a + "-" + b
                                }
                            }
                            _that.datas = list
                            _that.totalRecords = res.data.data.total
                            _that.dataLoading = false

                        }else {
                            _that.$Message.error(res.data.msg)
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
            getProvinceName(){
                var _that = this
                util.ajax.get(util.baseUrl + '/contact/sgipSpConfig/provinceCodeList')
                    .then(function(res){
                        console.log(res)
                        _that.cityList = res.data
                        _that.dataLoading = false
                    })
                    .catch(function(err){
                        console.log(err);
                    });
            }
        },
        mounted() {
            this.getProvinceName();
            this.dataLoading = true
        }
    }
</script>

<style lang="less">

</style>
