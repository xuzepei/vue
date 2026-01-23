import axios from 'axios';

// 创建 axios 实例
const instance = axios.create({
  baseURL: 'https://dl.freqtek.com:18791/dsd',
  timeout: 20000,
});

// 你可以在这里添加拦截器 (request/response interceptors)

export default instance; // 直接导出实例
