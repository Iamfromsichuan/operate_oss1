<template>
    <div class="messageList">
        <Row>
            <Col span="3">
                <Input icon="ios-person-outline" placeholder="电话号码" style="width: 90%" v-model="filter.phone"></Input>
            </Col>
            <Col span="3">
                <Select clearable v-model="CodeAndName" filterable placeholder="请选择省份名称">
                    <Option v-for="item in items" :value="item.provinceName+';'+item.provinceCode" :key="item.provinceName">{{ item.provinceName }}</Option>
                </Select>
            </Col>
            <Col span="12" offset="1">
                <Button type="primary" icon="ios-search" @click="search(1)">查找</Button>
                <Button type="success" icon="ios-person-add" @click="show">添加</Button><Icon type="ios-add-circle-outline" />
                <Button type="primary" icon="ios-search" @click="cacheSearch1">缓存查找</Button>
                <Tooltip content="24小时电话号短信次数查询">
                    <Button type="warning" icon="ios-search" @click="cacheSearch24">次数查询</Button>
                </Tooltip>
                <Tooltip content="删除电话号缓存次数">
                    <Button type="error" icon="ios-trash-outline" @click="deleteCache">删除次数</Button>
                </Tooltip>

            </Col>
        </Row>
        <br>
        <Modal v-model="modalAdd" width="660" :mask-closable="false" class-name="vertical-center-modal modalAdd">
            <p slot="header" style="color:#f60;text-align:center;">
                <Icon type="information-circled"></Icon>
                <span>增加黑名单</span>
            </p>
            <div>
                <Form ref="formValidate" :model="changefilter" :rules="ruleValidate" :label-width="120" style="width: 100%;margin: 0 auto">
                    <FormItem label="电话号码" prop="phone" style="width: 60%">
                        <Input v-model="changefilter.phone" placeholder="电话号码"></Input>
                    </FormItem>
                    <!--<FormItem label="省份编码    " prop="provinceCode" style="width: 60%">-->
                        <!--<Input v-model="changefilter.provinceCode" placeholder="省份编码"></Input>-->
                    <!--</FormItem>-->

                    <FormItem label="省份名称" prop="provinceName" style="width: 60%">
                        <!--<Input v-model="changefilter.provinceName" placeholder="省份名称，如：四川"></Input>-->
                        <Select clearable v-model="slecetValue" @on-change="GetValue" filterable placeholder="请选择省份名称">
                            <Option v-for="item in items" :value="JSON.stringify(item)" :key="item.provinceName">{{ item.provinceName }}</Option>
                        </Select>
                    </FormItem>


                    <FormItem label="备注" prop="remarks" style="width: 60%">
                        <Input v-model="changefilter.remarks" placeholder="备注"></Input>
                    </FormItem>

                </Form>
            </div>
            <div slot="footer" style="text-align: right">
                <Button type="success" :loading="modal_loading" @click="handleSubmit">提交</Button>
                <Button type="ghost" style="margin-left: 8px" @click="deleteTa">取消</Button>
            </div>
        </Modal>
        <Table v-if="t1" :columns="columns" :data="datas" :loading="dataLoading"></Table>
        <Table v-else :columns="columns2" :data="datas2" :loading="dataLoading"></Table>
        <br>
        <Page :total="totalRecords" :current="filter.pageNo" @on-change='changePage' :page-size="filter.pageSize"></Page>
        <br>
        <Modal v-model="modal1" >
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>查询目标的缓存状态：</span>
            </p>
            <p style="text-align: center">{{responseCode}}</p>
        </Modal>
        <Modal v-model="modal1Delete" >
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="ios-information-circle"></Icon>
                <span>删除号码的缓存次数：</span>
            </p>
            <p style="text-align: center">确定删除{{filter.phone}}的缓存次数吗？</p>
            <div slot="footer" style="text-align: right">
                <Button type="success" :loading="modal_loading" @click="deleteSubmit">提交</Button>
                <Button type="ghost" style="margin-left: 8px" @click="deleteThen">取消</Button>
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
            modal1Delete:false,
            t1:true,
            columns2:[
                {
                    title: '号码',
                    key: 'msg',
                },
                {
                    title: '缓存次数',
                    key: 'data'
                },
            ],
            datas2:[],
            responseCode:'',
            CodeAndName:"",
            myreg:/^[1][3,4,5,7,8][0-9]{9}$/,
            modal1:false,
            slecetValue:'',
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
            changefilter:{
                provinceName: '',
                phone:'',
                provinceCode:'',
                remarks: ''
            },
            modalAdd:false,
            items:[],
            filter: {
                provinceName: '',
                phone:'',
                provinceCode:'',
                pageNo:1,
                pageSize: pageSize
            },
            totalRecords: 0,
            dataLoading: false,
            columns: [
                {
                    title: '号码',
                    key: 'phone',
                },
                {
                    title: '省份编码',
                    key: 'provinceCode'
                },
                {
                    title: '省份名称',
                    key: 'provinceName'
                },
                {
                    title: '备注',
                    key: 'remarks'
                }
            ],
            datas: []
        }
    },
    methods: {
        deleteThen() {
            this.modal1Delete = false
        },
        deleteSubmit() {
            var _that = this
            util.ajax.get(util.baseUrl + '/contact/sgipPhoneBlack/deletePhoneNum',{
                params:{
                    phone:_that.filter.phone
                }
            })
                .then(function(res){
                    console.log(res.data)
                    _that.t1 = false;
                    _that.dataLoading = false
                    _that.modal1Delete = false
                    _that.cacheSearch();
                })
                .catch(function(err){
                    console.log(err);
                });
        },
        deleteCache() {
            if(!this.filter.phone) {
                this.$Message.error("请先输入将要删除的号码")
            }else {
                this.modal1Delete = true
            }
        },
        cacheSearch24(){
            if(!this.filter.phone) {
                this.$Message.error("请输入需要查询的号码")
            }else {
                this.t1 = false;
                this.cacheSearch();
            }
        },
        cacheSearch1() {
            this.t1 = true
            this.cacheSearch()
        },
        cacheSearch(){
            var _that = this
            var  _url;
            if(_that.t1) {
                _url = "/contact/sgipPhoneBlack/ridis"
                _that.filter.provinceName = _that.CodeAndName.split(";")[0];
                _that.filter.provinceCode = _that.CodeAndName.split(";")[1];
                if(!this.filter.phone){
                    _that.$Message.error("查询号码不可为空")
                }else if(!this.myreg.test(this.filter.phone)) {
                    _that.$Message.error("请输入正确的11位数字号码")
                }else if(!this.CodeAndName){//!this.filter.provinceName
                    _that.$Message.error("查询省份名称不可为空")//_that.$Message.error("查询省份名称不可为空")
                }else {
                    a();
                }
            }else {
                _url = "/contact/sgipPhoneBlack/phoneRidis"
                if(!this.filter.phone){
                    _that.$Message.error("查询号码不可为空")
                }else {
                    a();
                }
            }

            function a() {
                _that.dataLoading = true
                util.ajax.get(util.baseUrl + _url,{
                    params: _that.filter
                })
                    .then(function(res){
                        _that.dataLoading = false
                        if(_that.t1) {
                            _that.responseCode = res.data.msg;
                            _that.modal1 = true;
                        }else {
                            _that.datas2 = []
                            _that.datas2.push(res.data)
                        }
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
            this.t1 = true
            var _that = this
            this.filter.pageNo = no
            this.filter.provinceName = this.CodeAndName.split(";")[0];
            this.dataLoading = true
            util.ajax.get(util.baseUrl + '/contact/sgipPhoneBlack/list', {
                params: this.filter
            })
                .then(function(res){
                    if(res.data.status == ERR_OK) {
                        _that.datas = res.data.data.list
                        _that.totalRecords = res.data.data.total
                        _that.dataLoading = false
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
            window.location.href = util.baseUrl + '/sccu/sms/export?token='+Cookies.get('token') + util.parseParam(this.filter)
        }
    },
    created() {
        this.getProvinceName();
    }
}
</script>

<style lang="less">

</style>
