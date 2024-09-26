import Vue from 'vue'
import App from './App.vue'
import router from './router'


//导入iconfont
import './assets/iconfont/iconfont.css'

//导入全局样式表
import './assets/css/global.css'

//按需导入element-ui
import "./plugins/element-ui.js"


//导入tool.js
import './plugins/tool.js'

//引入刚才创建的 axios 实例
import axios from './plugins/axios'
//将axios挂载到Vue原型上，这样所有组件都可以通过this.$http访问
Vue.prototype.$http = axios;



Vue.config.productionTip = false

new Vue({
  router,  // Use the router
  render: h => h(App),
}).$mount('#app')
