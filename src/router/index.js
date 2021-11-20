import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import User from '../pages/Users.vue'
import NotFound from '../pages/404.vue'

const routes = [
   {
      path: '/',
      name: 'Home',
      component: Home
   },
   {
      path: '/users',
      name: 'users',
      component: User
   },
   {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
   }
]

const router = createRouter({
   history: createWebHashHistory(),
   routes
})

export default router
