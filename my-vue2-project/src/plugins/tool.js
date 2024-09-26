import Vue from 'vue'

// 定义全局方法

//判断是否为开发环境
Vue.prototype.$isDev = function () {
    return process.env.NODE_ENV === 'development';
};


//判断是否能点击，防抖
var gDebounceTimeout = null;
Vue.prototype.$isClickable = function () {
    if (gDebounceTimeout) {
        return false;
    }

    // 设置 3 秒防抖时间
    gDebounceTimeout = setTimeout(() => {
        gDebounceTimeout = null;  // 清除定时器
    }, 3000);

    return true;
};
