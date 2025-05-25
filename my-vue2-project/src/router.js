import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import MyHelloWorld from '@/components/MyHelloWorld.vue'
import PortraitMatting from '@/components/PortraitMatting.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Dashboard from '@/components/Dashboard.vue'
import Cases from '@/components/Cases.vue'

Vue.use(Router)

const router = new Router({
    mode: 'history', // Use 'history' mode to avoid hash in URLs
    routes: [
        // { path: '/login', component: LoginTest },
        // { path: '/', redirect: '/login' },
        {
            path: '/', name: 'Home', component: Home, meta: {
                requireAuth: true //need to login
            }, children: [{
                path: '/hello',
                component: HelloWorld
            }, {
                path: '/dashboard',
                component: Dashboard
            }, {
                path: '/cases',
                component: Cases
                }], //redirect: '/dashboard'
        },
        { path: '/login', name: 'Login', component: Login },
        { path: '/demo', name: 'MyHelloWorld', component: MyHelloWorld },
        { path: '/protrait_matting', name: 'PortraitMatting', component: PortraitMatting }
    ]
})

//路由守卫
router.beforeEach((to, from, next) => {

    console.log("Check if it is logged in...")

    let isLoggedIn = true
    const accessToken = window.sessionStorage.getItem("AccessToken")
    if (!accessToken) {
        isLoggedIn = false
        console.log("isLoggedIn: " + isLoggedIn)
    } else {
        console.log("accessToken: " + accessToken)
    }

    //要求登录的
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!isLoggedIn) {
            //未登录，则需要跳转到登录页
            next({
                path: "/login",
                //query: { redirect: to.fullPath }
            })
        } else {
            //已登录，则继续访问
            next()
        }
    } else {
        //不需要登录的页面，直接访问
        next()
    }
})


export default router