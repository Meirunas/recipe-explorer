import { createRouter, createWebHistory } from "vue-router";

const Home = () => import("@/views/Home.vue");
const MealDetail = () => import("@/views/MealDetail.vue");
const Favourites = () => import("@/views/Favourites.vue");

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/meal/:id", name: "MealDetail", component: MealDetail },
  { path: "/favourites", name: "favourites", component: Favourites },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
