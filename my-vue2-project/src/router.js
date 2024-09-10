import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import MyHelloWorld from './components/MyHelloWorld.vue'

Vue.use(Router)

export default new Router({
    mode: 'history', // Use 'history' mode to avoid hash in URLs
    routes: [
        // { path: '/', redirect: '/login' },
        { path: '/', name: 'Home', component: MyHelloWorld },
        { path: '/login', name: 'Login', component: Login }
    ]
})