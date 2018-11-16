<template>
    <div class="sendMessage">
        <Row>
            <i-col span="10">
                <i-input v-model="message.phones" type="textarea" :rows="8" @input="inInfro" placeholder="请输入需要发送的号码(用,分隔)"></i-input>
                <p style="text-align: right;font-size: 16px;padding-right: 20px;">当前号码数：<span style="color: red;">{{number}}</span>/200</p>
            </i-col>
            <i-col span="2" push="1">
                <br>
                <br>
                <i-button type="error" icon="ios-arrow-left" @click="reset(0)" long size="large">重置号码</i-button>
                <br>
                <br>
                <br>
                <i-button type="warning" icon="ios-arrow-right" @click="reset(1)" long size="large">重置内容</i-button>
            </i-col>
            <i-col span="10" push="2">
                <i-input
                        v-model="message.content"
                        type="textarea" :rows="8"
                        placeholder="请输入短信内容"></i-input>
                <p style="text-align: right;font-size: 16px;padding-right: 20px;">当前字数 ：<span style="color: red;">{{message.content.length}}</span>/140 </p>
            </i-col>
        </Row>
        <br>
        <Row>
            <i-col span="12" push="6">
                <i-button type="primary" icon="email" @click="send" long size="large" :disabled='disabled' :loading="loading">发送</i-button>
            </i-col>
        </Row>
        <br>

        <Modal v-model="modalConfirm" width="360">
            <p slot="header" style="color:#f60;text-align:center">
                <Icon type="information-circled"></Icon>
                <span>确认发送</span>
            </p>
            <div style="text-align:center">
                <p style="margin-bottom: 10px;">总共 {{message.phones.split(',').length}} 个号码</p>
                <Select v-model="proviceName"  filterable style="width: 40%" placeholder="省份">
                   <Option v-for="(item,index) in provinceNameList" :key="index" :value="item">{{item}}</Option>
                </Select>
                <Select v-model="spCode" filterable style="width: 40%" placeholder="spCode">
                    <Option v-for="item in provinceNameUnique" :key="item" :value="item">{{item}}</Option>
                </Select>
                <p style="margin-top: 10px;">确认发送吗？</p>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" long @click="comfirmSend">确认发送</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
  import util from '@/libs/util';
  import {ERR_OK,pageSize} from '@/config/config'
  export default {
    computed: {
      disabled() {
        if(this.message.phones.length && this.message.content.length) {
          return false
        }else {
          return true
        }
      },
      number() {
        if(this.message.phones) {
          return this.message.phones.split(',').length
        }else {
          return 0
        }
      },
      provinceNameUnique() {
        let _that = this;
        _that.spCodeList = [];
        if(_that.proviceName) {
          console.log(this.provinceNames);
            for(let i = 0 ; i < this.provinceNames.length ; i ++) {
              if(this.provinceNames[i].provinceName == _that.proviceName) {
                _that.spCodeList.push(_that.provinceNames[i].spCode)
              }
            }
        }else {
            this.spCodeList=['']
        }
        return  _that.spCodeList;
      }
    },
    data () {
      return {
        spCode:'',
        proviceName:'',
        spCodeList:[],
        isCh:false,
        modalConfirm: false,
        loading: false,
        message: {
          phones: '',
          content: '',
          provinceCode:'',
          spCode:''
        },
        provinceNameList:[],
        provinceNames:[]
      }
    },
    methods: {
      getSpCode() {
        //http://oss.operate.terabyte.com.cn/tool/sp/config/list
        let _that = this;
        util.ajax.get(util.baseUrl + '/tool/sp/config/list')
          .then(function(res){
            console.log(res)
            if(res.data.status == ERR_OK) {
              /*_that.$Notice.success({
                title: '成功',
                desc: '短信发送成功！'
              });*/
            }else {
              _that.$Message.error(res.msg)
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      inInfro(val) {
        let vals = val.split('\n');
        if(!vals[vals.length-1]) {
          vals.pop();
          this.message.phones = vals.join(',');
        }else {
          this.message.phones = val.split('\n').join(",");
        }
      },
      send() {
        let _that = this;
        if(!this.message.phones.length) {
          this.$Message.warning('请输入需要发送的号码!');
          return;
        }
        if(!this.message.content.length) {
          this.$Message.warning('请输入需要发送的内容!');
          return;
        }
        if(this.message.phones.split(',').length > 200) {
          _that.$Notice.error({
            title: '错误报告',
            desc: '电话数超过200',
            duration: 999
          });
          return
        }
        util.ajax.get(util.baseUrl + '/tool/sp/config/list')
          .then(function(res){
            if(res.status == ERR_OK) {
              _that.provinceNames = res.data;
              let name ;//_that.provinceNameList
              name = res.data.map((index) => {
                return index.provinceName
              });
              let container  = function (arr,item) {
                 for(let i = 0 ; i < arr.length ; i ++) {
                   if(arr[i] == item) {
                     return true
                   }
                 }
                 return false
              };
              for (let i = 0 ; i < name.length ; i++ ){
                if(!container(_that.provinceNameList,name[i])) {
                  _that.provinceNameList.push(name[i])
                }
              }
              _that.modalConfirm = true
            }else {
              _that.$Message.error(res.msg)
            }
          })
          .catch(function(err){
            console.log(err);
          });
      },
      comfirmSend() {
        var _that = this;
        this.loading = true;
        if(!this.proviceName || !this.spCode) {
           _that.$Message.error( '请选择省份或spCode');
          return
        }
        this.message.proviceName=this.proviceName;

        let _index = this.provinceNames.findIndex((index) => {
          return index.provinceName == _that.proviceName;
        });
        console.log(_index)
        this.message.proviceCode=this.provinceNames[_index].provinceCode;
        this.message.spCode=this.spCode;
        util.ajax.get(util.baseUrl + '/sms/mt/sendTxt', {
          params: this.message
        })
          .then(function(res){
            _that.modalConfirm = false;
            _that.loading = false;
            if(res.data.status == ERR_OK) {
              _that.$Notice.success({
                title: '发送状态',
                desc: res.data.msg,
                duration: 999
              });
            }else {
             /* _that.$Message.error({
                content: res.data.msg,
                duration: 20,
                closable: true
              })*/
              _that.$Notice.error({
                title: '发送状态',
                desc: res.data.msg,
                duration: 999
              });
            }
          })
          .catch(function(err){
            console.log(err)
            _that.$Message.error(err)
          });
      },
      reset(status) {
        if(status) {
          this.message.content = '';
        }else {
          this.message.phones = '';
        }
      }
    },
    watch:{
      //spCode
      spCode() {
        console.log(this.spCode)
      }
    }
  }
</script>

<style lang="less">

</style>
