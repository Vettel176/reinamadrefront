import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import BasicView from '../views/BasicView.vue'
import ContactView from '../views/ContactView.vue'
import SecurityPoliticsView from '@/components/views/SecurityPoliticsView.vue'


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/auth',
    name: 'auth',
    component: BasicView,
  },
  {
    path: '/contact',
    name: 'contacto',
    component: ContactView,
  },
  {
    path: '/privacy',
    name: 'privacy',
    component: SecurityPoliticsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
