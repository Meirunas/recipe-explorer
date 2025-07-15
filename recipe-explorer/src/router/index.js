// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

// Lazy‑loaded page components
const Home      = () => import('@/views/Home.vue')
const Favorites = () => import('@/views/Favorites.vue')

const routes = [
  { path: '/',          name: 'Home',      component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites },
]

export default createRouter({
  history: createWebHistory(),
  routes,
})
