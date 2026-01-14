import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'

//导入全局样式表
import '@/assets/styles/index.less'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
