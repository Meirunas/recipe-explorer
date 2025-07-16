import { createRouter, createWebHistory } from 'vue-router'

const Home       = () => import('@/views/Home.vue')
const MealDetail = () => import('@/views/MealDetail.vue')
const favourites  = () => import('@/views/favourites.vue')  // if you have it

const routes = [
  { path: '/',            name: 'Home',       component: Home },
  { path: '/meal/:id',    name: 'MealDetail', component: MealDetail },
  { path: '/favourites',   name: 'favourites',  component: favourites },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
