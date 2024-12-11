import Vue from 'vue'
import axios from 'axios';

//配置axios
// axios.defaults.baseURL = "https://www.wanandroid.com/user/"
// Vue.prototype.$http = axios;

// 创建 axios 实例
const instance = axios.create({
   //baseURL: 'https://dl.freqtek.com:18791/dsd', // 设置默认的 baseURL
   baseURL: 'https://cn.freqtek.com/dsd', // 设置默认的 baseURL
    timeout: 20000, // 请求超时时间20s
});

export default instance;

//将axios挂载到Vue原型上，这样所有组件都可以通过this.$http访问
Vue.prototype.$http = instance;