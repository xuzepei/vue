import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Home from '@/components/Home.vue'
import MyHelloWorld from '@/components/MyHelloWorld.vue'
import PortraitMatting from '@/components/PortraitMatting.vue'
import HelloWorld from '@/components/HelloWorld.vue'
import Dashboard from '@/components/Dashboard.vue'
import Cases from '@/components/Cases.vue'
import Keys from '@/plugins/keys.js';
import { loginToolShared } from './plugins/LoginTool'
import { userShared } from './plugins/User'

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

// Token已经刷新过
let tokenRefreshed = false

//路由守卫
router.beforeEach(async (to, from, next) => {

    console.log("Check if it is logged in...")

    let isLoggedIn = true
    const accessToken = localStorage.getItem(Keys.access_token) //window.sessionStorage.getItem("AccessToken")
    if (!accessToken) {
        isLoggedIn = false
    } else {
        console.log("accessToken: " + accessToken)
    }

    console.log("isLoggedIn: " + isLoggedIn)

    //要求登录的
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (!isLoggedIn) {
            //未登录，则需要跳转到登录页
            if (to.path !== '/login') {
                console.log("router: " + "未登录，则需要跳转到登录页")
                return next('/login')
            } else {
                console.log("router: " + "已经在登录页，直接放行")
                return next() // 已经在登录页，直接放行
            }
        } else {

            // 如果是登录成功刚跳转来的，不刷新 Token
            if (from.path === '/login' && !tokenRefreshed) {
                tokenRefreshed = true
                console.log("router: " + "如果是登录成功刚跳转来的，不刷新 Token")
                return next()
            }

            // 其他情况：未刷新过 Token 则刷新
            if (!tokenRefreshed) {
                console.log("router: " + "其他情况：未刷新过 Token 则刷新")
                try {
                    const tokenInfo = await loginToolShared.refreshTokenAsync()
                    userShared.upateTokenInfoByRefreshing(tokenInfo)

                    tokenRefreshed = true
                    return next() // 继续导航
                } catch (e) {
                    console.error("Token refresh failed:", e)
                    return next('/login')
                }
            }

            return next()
        }
    }

    return next()
})


export default router