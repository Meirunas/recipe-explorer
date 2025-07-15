<!-- src/components/Header.vue -->
<template>
  <header
    class="fixed top-0 left-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm z-50"
  >
    <div class="max-w-screen-xl mx-auto px-6 py-4 flex items-center">
      <!-- App title -->
<router-link
  to="/"
  class="flex items-center space-x-3 text-2xl font-bold text-gray-800 dark:text-gray-100"
>
  <img
    :src="recipeBook"
    alt="Recipe Explorer Logo"
    class="h-10 w-10"
  />
  <span>Recipe Explorer</span>
</router-link>


      <!-- Inline nav on sm+ -->
      <nav class="hidden sm:flex flex-1 justify-end space-x-8">
        <router-link
          to="/"
          class="text-lg text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
          :class="{
            'text-gray-900 dark:text-white font-semibold':
              route.name === 'Home',
          }"
        >
          Home
        </router-link>
        <router-link
          to="/favorites"
          class="text-lg text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition"
          :class="{
            'text-gray-900 dark:text-white font-semibold':
              route.name === 'Favorites',
          }"
        >
          Favorites
        </router-link>
      </nav>

      <!-- Hamburger on mobile -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="sm:hidden ml-auto p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition"
        aria-label="Toggle menu"
      >
        <svg
          v-if="!mobileOpen"
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-800 dark:text-gray-100"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
        <svg
          v-else
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6 text-gray-800 dark:text-gray-100"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile menu -->
    <div
      v-if="mobileOpen"
      class="sm:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700"
    >
      <nav class="flex flex-col px-6 py-4 space-y-2">
        <router-link
          to="/"
          class="block text-lg text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition px-2 py-1 rounded"
          :class="{
            'bg-gray-100 dark:bg-gray-800 font-semibold': route.name === 'Home',
          }"
          @click="mobileOpen = false"
        >
          Home
        </router-link>
        <router-link
          to="/favorites"
          class="block text-lg text-gray-700 dark:text-gray-200 hover:text-gray-900 dark:hover:text-white transition px-2 py-1 rounded"
          :class="{
            'bg-gray-100 dark:bg-gray-800 font-semibold':
              route.name === 'Favorites',
          }"
          @click="mobileOpen = false"
        >
          Favorites
        </router-link>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const mobileOpen = ref(false);

// import your asset — Vite will resolve it to a URL
import recipeBook from "@/assets/recipe-book.png";
</script>

<style scoped>
/* nothing else needed—Tailwind handles responsiveness */
</style>
