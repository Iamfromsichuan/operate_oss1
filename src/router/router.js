import Main from '@/views/Main.vue';

// 不作为Main组件的子页面展示的页面单独写，如下
export const loginRouter = {
    path: '/login',
    name: 'login',
    meta: {
        title: 'Login - 登录'
    },
    component: resolve => { require(['@/views/login.vue'], resolve); }
};

export const page404 = {
    path: '/*',
    name: 'error-404',
    meta: {
        title: '404-页面不存在'
    },
    component: resolve => { require(['@/views/error-page/404.vue'], resolve); }
};

export const page403 = {
    path: '/403',
    meta: {
        title: '403-权限不足'
    },
    name: 'error-403',
    component: resolve => { require(['@//views/error-page/403.vue'], resolve); }
};

export const page500 = {
    path: '/500',
    meta: {
        title: '500-服务端错误'
    },
    name: 'error-500',
    component: resolve => { require(['@/views/error-page/500.vue'], resolve); }
};

export const preview = {
    path: '/preview',
    name: 'preview',
    component: resolve => { require(['@/views/form/article-publish/preview.vue'], resolve); }
};

export const locking = {
    path: '/locking',
    name: 'locking',
    component: resolve => { require(['@/views/main-components/lockscreen/components/locking-page.vue'], resolve); }
};

// 作为Main组件的子页面展示但是不在左侧菜单显示的路由写在otherRouter里
export const otherRouter = {
    path: '/',
    name: 'otherRouter',
    redirect: '/home',
    component: Main,
    children: [
        { path: 'home', title: {i18n: 'home'}, name: 'home_index', component: resolve => { require(['@/views/home/home.vue'], resolve); } },
        { path: 'ownspace', title: '个人中心', name: 'ownspace_index', component: resolve => { require(['@/views/own-space/own-space.vue'], resolve); } },
        { path: 'order/:order_id', title: '订单详情', name: 'order_info', component: resolve => { require(['@/views/advanced-router/component/order-info.vue'], resolve); } },  // 用于展示动态路由
        { path: 'shopping', title: '购物详情', name: 'shopping', component: resolve => { require(['@/views/advanced-router/component/shopping-info.vue'], resolve); } },  // 用于展示带参路由
        { path: 'message', title: '消息中心', name: 'message_index', component: resolve => { require(['@/views/message/message.vue'], resolve); } },
        { path: 'test', title: '测试页面', name: 'test_index', component: resolve => { require(['@/views/test.vue'], resolve); } },
        { path: 'model', title: '模板页面', name: 'model_index', component: resolve => { require(['@/views/model/model.vue'], resolve); } }
    ]
};

// 作为Main组件的子页面展示并且在左侧菜单显示的路由写在appRouter里
export const appRouter = [
    {
        path: '/xjcu',
        icon: 'ios-analytics',
        title: '新疆联通',
        name: 'xjcu',
        // access: 0,
        component: Main,
        children: [
            { path: 'presented', title: '送费', icon: 'android-send', name: 'presented_index', /* access: 0, */ component: resolve => { require(['@/views/xjcu/presented.vue'], resolve); } }
        ]
    },
    {
        path: '/gzcu',
        icon: 'ios-analytics',
        title: '贵州联通',
        name: 'gzcu',
        // access: 0,
        component: Main,
        children: [
            { path: 'messageList', title: '短信列表', icon: 'android-list', name: 'messageList_index', /* access: 0, */ component: resolve => { require(['@/views/gzcu/messageList.vue'], resolve); } },
            { path: 'sendMessage', title: '发送短信', icon: 'android-open', name: 'sendMessage_index', /* access: 0, */ component: resolve => { require(['@/views/gzcu/sendMessage.vue'], resolve); } },
            // { path: 'messageUp', title: '短信上行', icon: 'paper-airplane', name: 'messageUp_index', /*access: 0,*/ component: resolve => { require(['@/views/gzcu/messageUp.vue'], resolve); } },
            { path: 'sendCsvMessage', title: '批发短信', icon: 'email', name: 'sendCsvMessage_index', /* access: 0, */ component: resolve => { require(['@/views/gzcu/sendCsvMessage.vue'], resolve); } }
        ]
    },
    {
        path: '/hncu',
        icon: 'ios-analytics',
        title: '海南联通',
        name: 'hncu',
        // access: 0,
        component: Main,
        children: [
            { path: 'messageListHN', title: '短信列表', icon: 'android-list', name: 'messageListHN_index', /* access: 0, */ component: resolve => { require(['@/views/hncu/messageListHN.vue'], resolve); } },
            { path: 'sendMessageHN', title: '发送短信', icon: 'android-open', name: 'sendMessageHN_index', /* access: 0, */ component: resolve => { require(['@/views/hncu/sendMessageHN.vue'], resolve); } },
            // { path: 'messageUpHN', title: '短信上行', icon: 'paper-airplane', name: 'messageUpHN_index', /*access: 0,*/ component: resolve => { require(['@/views/hncu/messageUpHN.vue'], resolve); } },
            { path: 'sendCsvMessageHN', title: '批发短信', icon: 'email', name: 'sendCsvMessageHN_index', /* access: 0, */ component: resolve => { require(['@/views/hncu/sendCsvMessageHN.vue'], resolve); } },
            { path: 'productInformationHN', title: '产品信息', icon: 'email', name: 'productInformationHN_index', /* access: 0, */ component: resolve => { require(['@/views/hncu/productInformation.vue'], resolve); } }
        ]
    },
    {
        path: '/cqcu',
        icon: 'ios-analytics',
        title: '重庆联通',
        name: 'cqcu',
        // access: 0,
        component: Main,
        children: [
            { path: 'messageListCQ', title: '短信列表', icon: 'android-list', name: 'messageListCQ_index', /* access: 0, */ component: resolve => { require(['@/views/cqcu/messageListCQ.vue'], resolve); } },
            { path: 'sendMessageCQ', title: '发送短信', icon: 'android-open', name: 'sendMessageCQ_index', /* access: 0, */ component: resolve => { require(['@/views/cqcu/sendMessageCQ.vue'], resolve); } },
            // { path: 'messageUpCQ', title: '短信上行', icon: 'paper-airplane', name: 'messageUpSC_index', /*access: 0,*/ component: resolve => { require(['@/views/cqcu/messageUpCQ.vue'], resolve); } },
            { path: 'sendCsvMessageCQ', title: '批发短信', icon: 'email', name: 'sendCsvMessageCQ_index', /* access: 0, */ component: resolve => { require(['@/views/cqcu/sendCsvMessageCQ.vue'], resolve); } }
        ]
    },
    {
        path: '/sccu',
        icon: 'ios-analytics',
        title: '四川联通',
        name: 'sccu',
        // access: 0,
        component: Main,
        children: [
            { path: 'messageListSC', title: '短信列表', icon: 'android-list', name: 'messageListSC_index', /* access: 0, */ component: resolve => { require(['@/views/sccu/messageListSC.vue'], resolve); } },
            { path: 'sendMessageSC', title: '发送短信', icon: 'android-open', name: 'sendMessageSC_index', /* access: 0, */ component: resolve => { require(['@/views/sccu/sendMessageSC.vue'], resolve); } },
            // { path: 'messageUpSC', title: '短信上行', icon: 'paper-airplane', name: 'messageUpSC_index', /*access: 0,*/ component: resolve => { require(['@/views/sccu/messageUpSC.vue'], resolve); } },
            { path: 'sendCsvMessageSC', title: '批发短信', icon: 'email', name: 'sendCsvMessageSC_index', /* access: 0, */ component: resolve => { require(['@/views/sccu/sendCsvMessageSC.vue'], resolve); } }
        ]
    },
    {
        path: '/system',
        icon: 'gear-a',
        title: '系统设置',
        name: 'system',
        access: 0,
        component: Main,
        children: [
            { path: 'menu', title: '系统功能', icon: 'ios-cog', name: 'menu_index', access: 0, component: resolve => { require(['@/views/system/menu.vue'], resolve); } },
            { path: 'role', title: '角色管理', icon: 'person-stalker', name: 'role_index', access: 0, component: resolve => { require(['@/views/system/role.vue'], resolve); } },
            { path: 'user', title: '用户管理', icon: 'person-add', name: 'user_index', access: 1, component: resolve => { require(['@/views/system/user.vue'], resolve); } },
            { path: 'globalAttributes', title: '全局参数', icon: 'person-add', name: 'global_index', access: 0, component: resolve => { require(['@/views/system/globalAttributes.vue'], resolve); } },
            { path: 'globalAttributes1', title: '全局参数', icon: 'person-add', name: 'global_index1', access: 0, component: resolve => { require(['@/views/system/globalAttributes1.vue'], resolve); } }
        ]
    },
    {
        path: '/parameterConfig',
        icon: 'gear-b',
        title: '参数配置',
        name: 'parameterConfig',
        // access: 0,
        component: Main,
        children: [
            { path: 'parameterConfig', title: '参数配置', icon: 'gear-b', name: 'parameterConfig_index', /* access: 0, */ component: resolve => { require(['@/views/parameterConfig/parameterConfig.vue'], resolve); } }
        ]
    },
    {
        path: '/complain',
        icon: 'alert',
        title: '客服投诉',
        name: 'complain',
        // access: 0,
        component: Main,
        children: [
            { path: 'complain_xj', title: '新疆联通', icon: 'alert-circled', name: 'complain_xj_index', /* access: 0, */ component: resolve => { require(['@/views/complain/complain_xj.vue'], resolve); } },
            { path: 'complain_nation', title: '各省投诉', icon: 'nuclear', name: 'complain_nation_index', /* access: 0, */ component: resolve => { require(['@/views/complain/complain_nation.vue'], resolve); } }
        ]
    },
    {
        path: '/masstexting',
        icon: 'email',
        title: '群发短信',
        name: 'masstexting',
        // access: 0,
        component: Main,
        children: [
            { path: 'masstexting', title: '群发短信', icon: 'email', name: 'masstexting_index', /* access: 0, */ component: resolve => { require(['@/views/masstexting/masstexting.vue'], resolve); } }
        ]
    },
    {
        // ---集团手厅-----路由
        path: '/phonehall',
        icon: 'cloud',
        title: '集团手厅',
        name: 'phonehall',
        // access: 0,
        component: Main,
        children: [
            { path: 'phonehall', title: '集团编码', icon: 'email', name: 'phonehall_code', /* access: 0, */ component: resolve => { require(['@/views/phonehall/phonehall_code.vue'], resolve); } }, // 需要看一下这种异步加载组建方式
            { path: 'whitelist', title: '白名单ID', icon: 'email', name: 'whitelist', /* access: 0, */ component: resolve => { require(['@/views/phonehall/whitelist.vue'], resolve); }}
        ]
    },
    {
        // ---集团手厅-----路由
        path: '/shortMessageModule',
        icon: 'cloud',
        title: '短信模块',
        name: 'shortMessageModule',
        // access: 0,
        component: Main,
        children: [
            { path: 'sgIp', title: 'SP配置', icon: 'email', name: 'sgIp', /* access: 0, */ component: resolve => { require(['@/views/shortMessageModule/sgIp.vue'], resolve); } }, // 需要看一下这种异步加载组建方式
            { path: 'blackList', title: '底层黑名单', icon: 'email', name: 'blackList', /* access: 0, */ component: resolve => { require(['@/views/shortMessageModule/blackList.vue'], resolve); }},
            { path: 'shortMessageUp', title: '短信上行', icon: 'email', name: 'shortMessageUp', /* access: 0, */ component: resolve => { require(['@/views/shortMessageModule/shortMessageUp.vue'], resolve); }},
            { path: 'shortMessageList', title: '短信列表', icon: 'email', name: 'shortMessageList', /* access: 0, */ component: resolve => { require(['@/views/shortMessageModule/shortMessageList.vue'], resolve); }},
        ]
    },
    {
        // -业务触发模块
        path: '/BusinessTrigger',
        icon: 'cloud',
        title: '业务触发',
        name: 'BusinessTrigger',
        // access: 0,
        component: Main,
        children: [
            { path: 'config', title: '黑白名单表配置', icon: 'email', name: 'config', /* access: 0, */ component: resolve => { require(['@/views/BusinessTrigger/config.vue'], resolve); } }, // 需要看一下这种异步加载组建方式
            { path: 'UploadController', title: '文件上传', icon: 'email', name: 'UploadController', /* access: 0, */ component: resolve => { require(['@/views/BusinessTrigger/UploadController.vue'], resolve); }},
            { path: 'businessConfig', title: '业务黑名单表配置', icon: 'email', name: 'businessConfig', /* access: 0, */ component: resolve => { require(['@/views/BusinessTrigger/businessConfig.vue'], resolve); }}
        ]
    },
    {
        // -业务触发模块
        path: '/Orders',
        icon: 'cloud',
        title: '订单模块',
        name: 'Orders',
        // access: 0,
        component: Main,
        children: [
            { path: 'exceptionOrder', title: '异常订单', icon: 'email', name: 'exceptionOrder', /* access: 0, */ component: resolve => { require(['@/views/Orders/exceptionOrder.vue'], resolve); } }, // 需要看一下这种异步加载组建方式
            { path: 'order', title: '订单', icon: 'email', name: 'order', /* access: 0, */ component: resolve => { require(['@/views/Orders/order.vue'], resolve); }},
            { path: 'inWay', title: '渠道产品', icon: 'email', name: 'inWay', /* access: 0, */ component: resolve => { require(['@/views/Orders/inWay.vue'], resolve); }},
            { path: 'productShort', title: '产品短信', icon: 'email', name: 'productShort', /* access: 0, */ component: resolve => { require(['@/views/Orders/productShort.vue'], resolve); }},
            { path: 'turnOver', title: '交付订单', icon: 'email', name: 'turnOver', /* access: 0, */ component: resolve => { require(['@/views/Orders/turnOver.vue'], resolve); }},
        ]
    }
    // {
    //     //---活动-----路由    //做错了  不是这个服务器的网页
    //     path: '/activityManage',
    //     icon: 'cloud',
    //     title: '后台数据',
    //     name: 'activityManage',
    //     // access: 0,
    //     component: Main,
    //     children: [
    //         { path: 'activityManageTlf', title: '吐鲁番后台数据', icon: 'email', name: 'activityManage_xj_tlf', /*access: 0,*/ component: resolve => { require(['@/views/activityManage/activityManage.vue'], resolve); } },//需要看一下这种异步加载组建方式
    //     ]
    // }
    // {
    //     path: '/component',
    //     icon: 'social-buffer',
    //     name: 'component',
    //     title: '组件',
    //     component: Main,
    //     children: [
    //         {
    //             path: 'text-editor',
    //             icon: 'compose',
    //             name: 'text-editor',
    //             title: '富文本编辑器',
    //             component: resolve => { require(['@/views/my-components/text-editor/text-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'md-editor',
    //             icon: 'pound',
    //             name: 'md-editor',
    //             title: 'Markdown编辑器',
    //             component: resolve => { require(['@/views/my-components/markdown-editor/markdown-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'image-editor',
    //             icon: 'crop',
    //             name: 'image-editor',
    //             title: '图片预览编辑',
    //             component: resolve => { require(['@/views/my-components/image-editor/image-editor.vue'], resolve); }
    //         },
    //         {
    //             path: 'draggable-list',
    //             icon: 'arrow-move',
    //             name: 'draggable-list',
    //             title: '可拖拽列表',
    //             component: resolve => { require(['@/views/my-components/draggable-list/draggable-list.vue'], resolve); }
    //         },
    //         {
    //             path: 'area-linkage',
    //             icon: 'ios-more',
    //             name: 'area-linkage',
    //             title: '城市级联',
    //             component: resolve => { require(['@/views/my-components/area-linkage/area-linkage.vue'], resolve); }
    //         },
    //         {
    //             path: 'file-upload',
    //             icon: 'android-upload',
    //             name: 'file-upload',
    //             title: '文件上传',
    //             component: resolve => { require(['@/views/my-components/file-upload/file-upload.vue'], resolve); }
    //         },
    //         {
    //             path: 'count-to',
    //             icon: 'arrow-graph-up-right',
    //             name: 'count-to',
    //             title: '数字渐变',
    //             component: resolve => { require(['@/views/my-components/count-to/count-to.vue'], resolve); }
    //         }
    //     ]
    // }
];

// 所有上面定义的路由都要写在下面的routers里
export const routers = [
    loginRouter,
    otherRouter,
    preview,
    locking,
    ...appRouter,
    page500,
    page403,
    page404
];
