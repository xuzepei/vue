import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import BasicsPage from '@/pages/BasicsPage.vue'
import TutorialPage from '@/pages/TutorialPage.vue'
import PracticePage from '@/pages/PracticePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/basics', name:"BasicsPage", component: BasicsPage },
    { path: '/tutorial', name:"TutorialPage", component: TutorialPage },
    { path: '/practice', name:"PracticePage", component: PracticePage },
  ],
})

export default router
