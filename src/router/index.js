import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '*',
    name: 'Forbidden',
    component: () => import('@/views/404/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
