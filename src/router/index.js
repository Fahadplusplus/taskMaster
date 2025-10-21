import { createRouter, createWebHistory } from 'vue-router'
import NotFound from '@/views/NotFound.vue'
import SignUp from '@/components/SignUp.vue'
import LogIn from '@/components/LogIn.vue'
import home from '@/components/home.vue'
import navbar from '@/components/navbar.vue'
import Setting from '@/components/Setting.vue'
import modal from '@/components/modal.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'login',component: LogIn,},
    { path: '/SignUp', name: 'signup',component: SignUp,},
    { path: '/home', name: 'home',component: home,},
    { path: '/navbar', name: 'navbar',component: navbar,},
    { path: '/Setting', name: 'setting',component: Setting,},
    { path: '/modal', name: 'modal',component: modal,},
    

   { path: '/:pathMatch(.*)*', name: 'notfound', component: NotFound },
  ],
})

export default router
