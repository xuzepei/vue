import {createApp } from 'vue'
import App from './App.vue'

//Vue3.0 Filters are deprecated.
//Vue.filter("reverse", (value, argument)=> { value.split("").reverse().join(argument); })

const app = createApp(App)
app.mount('#app')
