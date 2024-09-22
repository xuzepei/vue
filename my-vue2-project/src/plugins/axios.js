import Vue from 'vue'
import axios from 'axios';

//配置axios
axios.defaults.baseURL = "http://www.liulongbin.top:8888/api/private/v1/"
Vue.prototype.$http = axios;

// 创建 axios 实例
// const instance = axios.create({
//     baseURL: 'https://api.example.com', // 设置默认的 baseURL
//     timeout: 20000, // 请求超时时间20s
// });