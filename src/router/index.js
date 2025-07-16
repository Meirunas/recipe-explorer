import { createRouter, createWebHistory } from 'vue-router'

const Home       = () => import('@/views/Home.vue')
const MealDetail = () => import('@/views/MealDetail.vue')
const Favorites  = () => import('@/views/Favorites.vue')  // if you have it

const routes = [
  { path: '/',            name: 'Home',       component: Home },
  { path: '/meal/:id',    name: 'MealDetail', component: MealDetail },
  { path: '/favorites',   name: 'Favorites',  component: Favorites },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
