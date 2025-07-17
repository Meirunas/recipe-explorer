import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/Home.vue");
const Favourites = () => import("@/views/Favourites.vue");

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/favourites", name: "favourites", component: Favourites },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
