import axios from 'axios';
import Cookies from 'js-cookie';
import env from '../../build/env';
import semver from 'semver';
import packjson from '../../package.json';
import {ERR_OK} from '../config/config';
import store from '../store';

let util = {
    title: ''
};
util.title = function (title) {
    title = title || '后台管理系统';
    window.document.title = title;
};
// http://10.0.128.133:10003 Z
// http://10.0.128.102:10003 W
// http://10.0.128.125:10003 Y
// http://10.0.128.125:10003

const ajaxUrl = env === 'development'
    ? 'http://oss.operate.terabyte.com.cn'// 'http://10.0.128.133:10003'//http://10.0.128.111:10003//http://oss.operate.terabyte.com.cn//http://10.0.128.137:10003
    : env === 'production'
    ? 'http://oss.operate.terabyte.com.cn'
    : 'http://oss.operate.terabyte.com.cn';
util.baseUrl = ajaxUrl;
util.ajax = axios.create({
    baseURL: ajaxUrl,
    timeout: 30000
});

util.ajax.interceptors.request.use(config => {
    // 获取token

    const token = Cookies.get('token') || '';
    if (token) {
        // 将token设置到headers中
        config.headers.Authorization = token;
        if (config.method === 'post') {
            config.headers['Content-type'] = 'application/x-www-form-urlencoded';
        };
    }
    return config;
},
error => {
    return Promise.reject(error);
});

util.ajax.interceptors.response.use(function (response) {
    // console.log(response)
    if (response.status === 200) {
        let status = response.data.status;
        switch (status) {
            case 500:
                // alert('系统异常，请刷新重试！')
                break;
            case 403:
                alert('权限不足！');
                break;
            case 405:
                store.commit('logout');
                window.location.reload();
        }
        return Promise.resolve(response);
    } else {
        return Promise.reject(response);
    }
});

util.inOf = function (arr, targetArr) {
    let res = true;
    arr.map(item => {
        if (targetArr.indexOf(item) < 0) {
            res = false;
        }
    });
    return res;
};

util.oneOf = function (ele, targetArr) {
    if (targetArr.indexOf(ele) >= 0) {
        return true;
    } else {
        return false;
    }
};
// 异步请求失败  将所有属性值归空
util.init = function (obj) {
    for (let i in obj) {
        obj[i] = '';
    }
};
// 从目标数据 中 只拷贝 我们需要的属性值
util.copyNeed = function (need, orcal) {
    for (var i in need) { // i是need的属性值  也就是我们需要的属性
        if (i in orcal) { // orcal中有i属性才拷贝  不存在  打印
            need[i] = orcal[i];
        } else {
            console.log(`${orcal}的${i}属性不存在`);
        }
    }
    return need;
};
util.showThisRoute = function (itAccess, currentAccess) {
    if (typeof itAccess === 'object' && Array.isArray(itAccess)) {
        return util.oneOf(currentAccess, itAccess);
    } else {
        return itAccess === currentAccess;
    }
};

util.getRouterObjByName = function (routers, name) {
    if (!name || !routers || !routers.length) {
        return null;
    }
    // debugger;
    let routerObj = null;
    for (let item of routers) {
        if (item.name === name) {
            return item;
        }
        routerObj = util.getRouterObjByName(item.children, name);
        if (routerObj) {
            return routerObj;
        }
    }
    return null;
};

util.handleTitle = function (vm, item) {
    if (typeof item.title === 'object') {
        return vm.$t(item.title.i18n);
    } else {
        return item.title;
    }
};

util.setCurrentPath = function (vm, name) {
    let title = '';
    let isOtherRouter = false;
    vm.$store.state.app.routers.forEach(item => {
        if (item.children.length === 1) {
            if (item.children[0].name === name) {
                title = util.handleTitle(vm, item);
                if (item.name === 'otherRouter') {
                    isOtherRouter = true;
                }
            }
        } else {
            item.children.forEach(child => {
                if (child.name === name) {
                    title = util.handleTitle(vm, child);
                    if (item.name === 'otherRouter') {
                        isOtherRouter = true;
                    }
                }
            });
        }
    });
    let currentPathArr = [];
    if (name === 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '',
                name: 'home_index'
            }
        ];
    } else if ((name.indexOf('_index') >= 0 || isOtherRouter) && name !== 'home_index') {
        currentPathArr = [
            {
                title: util.handleTitle(vm, util.getRouterObjByName(vm.$store.state.app.routers, 'home_index')),
                path: '/home',
                name: 'home_index'
            },
            {
                title: title,
                path: '',
                name: name
            }
        ];
    } else {
        let currentPathObj = vm.$store.state.app.routers.filter(item => {
            if (item.children.length <= 1) {
                return item.children[0].name === name;
            } else {
                let i = 0;
                let childArr = item.children;
                let len = childArr.length;
                while (i < len) {
                    if (childArr[i].name === name) {
                        return true;
                    }
                    i++;
                }
                return false;
            }
        })[0];
        if (currentPathObj.children.length <= 1 && currentPathObj.name === 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '',
                    name: 'home_index'
                }
            ];
        } else if (currentPathObj.children.length <= 1 && currentPathObj.name !== 'home') {
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: name
                }
            ];
        } else {
            let childObj = currentPathObj.children.filter((child) => {
                return child.name === name;
            })[0];
            currentPathArr = [
                {
                    title: '首页',
                    path: '/home',
                    name: 'home_index'
                },
                {
                    title: currentPathObj.title,
                    path: '',
                    name: currentPathObj.name
                },
                {
                    title: childObj.title,
                    path: currentPathObj.path + '/' + childObj.path,
                    name: name
                }
            ];
        }
    }
    vm.$store.commit('setCurrentPath', currentPathArr);

    return currentPathArr;
};

util.openNewPage = function (vm, name, argu, query) {
    let pageOpenedList = vm.$store.state.app.pageOpenedList;
    let openedPageLen = pageOpenedList.length;
    let i = 0;
    let tagHasOpened = false;
    while (i < openedPageLen) {
        if (name === pageOpenedList[i].name) {  // 页面已经打开
            vm.$store.commit('pageOpenedList', {
                index: i,
                argu: argu,
                query: query
            });
            tagHasOpened = true;
            break;
        }
        i++;
    }
    if (!tagHasOpened) {
        let tag = vm.$store.state.app.tagsList.filter((item) => {
            if (item.children) {
                return name === item.children[0].name;
            } else {
                return name === item.name;
            }
        });
        tag = tag[0];
        if (tag) {
            tag = tag.children ? tag.children[0] : tag;
            if (argu) {
                tag.argu = argu;
            }
            if (query) {
                tag.query = query;
            }
            vm.$store.commit('increateTag', tag);
        }
    }
    vm.$store.commit('setCurrentPageName', name);
};

// 在---集团手厅---有一个----------开启关闭编码-------状态   关闭编码状态   多次重复使用，抽出来防止代码重叠
util.changeState = function (wantGetState, params, vm) { // vm用来传入一个控制信息，判别 下面 code值得来源
    var _that = this;
    var url;
    var code;
    var ids;
    if (vm) {
        ids = vm;
        url = '/kdcu/online_retailers/listid/isEnableEdit';
    } else {
        code = params.row.code;
        url = '/kdcu/online/provinceMap/isEnableEdit';
    }
    if (wantGetState == '开启') { //
        // 表示 想开启当前集团编码
        if (_that.datas[params.index].isEnable == '开启') {
            _that.$Message.error('已开启，请勿重复提交');
        } else {
            util.ajax.get(util.baseUrl + url, {
                params: {
                    codes: code,
                    isEnable: 1,
                    ids: ids
                }
            }).then(res => {
                if (res.data.msg.indexOf('成功') >= 0) {
                    this.datas[params.index].isEnable = '开启';
                }
            });
        }
    } else if (wantGetState == '关闭') {
        if (_that.datas[params.index].isEnable == '关闭') {
            _that.$Message.error('已关闭，请勿重复提交');
        } else {
            util.ajax.get(util.baseUrl + url, {
                params: {
                    codes: code,
                    isEnable: 0,
                    ids: ids
                }
            }).then(res => {
                if (res.data.msg.indexOf('成功') >= 0) {
                    _that.datas[params.index].isEnable = '关闭';
                }
            });
        }
    }
};
util.toDefaultPage = function (routers, name, route, next) {
    let len = routers.length;
    let i = 0;
    let notHandle = true;
    while (i < len) {
        if (routers[i].name === name && routers[i].children && routers[i].redirect === undefined) {
            route.replace({
                name: routers[i].children[0].name
            });
            notHandle = false;
            next();
            break;
        }
        i++;
    }
    if (notHandle) {
        next();
    }
};

util.fullscreenEvent = function (vm) {
    vm.$store.commit('initCachepage');
    // 权限菜单过滤相关
    vm.$store.commit('updateMenulist');
    // 全屏相关
};

util.checkUpdate = function (vm) {
    axios.get('https://api.github.com/repos/iview/iview-admin/releases/latest').then(res => {
        let version = res.data.tag_name;
        vm.$Notice.config({
            duration: 0
        });
        if (semver.lt(packjson.version, version)) {
            vm.$Notice.info({
                title: 'iview-admin更新啦',
                desc: '<p>iView-admin更新到了' + version + '了，去看看有哪些变化吧</p><a style="font-size:13px;" href="https://github.com/iview/iview-admin/releases" target="_blank">前往github查看</a>'
            });
        }
    });
};

// 拼接字符串
util.parseParam = function (param) {
    var paramStr = '';
    for (var key in param) {
    // 只遍历对象自身的属性，而不包含继承于原型链上的属性。
        if (param.hasOwnProperty(key)) {
            paramStr += `&${key}=${param[key]}`;
        }
    }
    return paramStr;
};

// 对象深拷贝
util.deepCopy = function (source) {
    var result = {};
    for (var key in source) {
        result[key] = typeof source[key] === 'object' ? deepCoyp(source[key]) : source[key];
    }
    return result;
};

// 对请求结果进行校验
util.validate = function (res) {
    if (res.status == ERR_OK) {
        return true;
    } else if (res.status == 405) {
        // 未登陆
        this.$store.cosmmit('logout', this);
        this.$store.commit('clearOpenedSubmenu');
        this.$router.push({
            name: 'login'
        });
        // 退出登录
        this.$store.commit('logout', this);
        this.$store.commit('clearOpenedSubmenu');
        this.$router.push({
            name: 'login'
        });
        return false;
    }
};
// 海南和贵州短信列表中的时间限制  多次调用
util.changeTime = function (time) {
    if (time.length) {
        var time0 = time[0].split('-');
        var time1 = time[1].split('-');
        if (time0[0] != time1[0] || time0[1] != time1[1]) {
            this.$Message.error('只可查询单月信息，不可跨月');
            this.initTime = [`${new Date().getFullYear()}-${new Date().getMonth() + 1}-01 00:00:00`, `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${new Date().getDate()} 23:59:59`];
        } else {
            // 用于将选择的最后一个时间的时分秒变成23：59：59   如果是00：00：00不能查到月末的那一天
            var b = time[1].split(' ');
            b[1] = ' 23:59:59';
            time[1] = b[0] + b[1];
            this.initTime = time;
            this.filter.startTime = time[0];
            this.filter.endTime = time[1];
        }
    } else {
        this.filter.startTime = '';
        this.filter.endTime = '';
    }
};

export default util;

function getBaseUrl () {
    // 获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp
    var curWwwPath = window.document.location.href;
    // 获取主机地址之后的目录，如： uimcardprj/share/meun.jsp
    var pathName = window.document.location.pathname;
    var pos = curWwwPath.indexOf(pathName);
    // 获取主机地址，如： http://localhost:8083
    var localhostPaht = curWwwPath.substring(0, pos);
    // 获取带"/"的项目名，如：/uimcardprj
    var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPaht + projectName);
}
