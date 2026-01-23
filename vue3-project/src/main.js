import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

//导入全局样式表
import '@/assets/styles/index.less'

//显示代码组件
import 'highlight.js/styles/stackoverflow-light.css'
import hljsVuePlugin from "@highlightjs/vue-plugin"

//引入ElementPlus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入工具类
import Tool from '@/utils/tool'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(hljsVuePlugin)
app.use(ElementPlus)

app.config.globalProperties.$tool = Tool

app.mount('#app')
