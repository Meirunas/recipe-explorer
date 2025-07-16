<template>
  <header :class="['fixed top-0 left-0 w-full shadow-sm z-50']">
    <div
      class="relative max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between"
    >
      <router-link
        to="/"
        class="flex items-center space-x-3 text-2xl font-bold"
      >
        <img :src="recipeBook" alt="Recipe Explorer Logo" class="h-10 w-10" />
        <span>Recipe Explorer</span>
      </router-link>

      <!-- Centered nav (desktop only) -->
      <nav
        class="hidden sm:flex absolute left-1/2 -translate-x-1/2 space-x-8 items-center"
      >
        <router-link
          to="/"
          class="font-medium hover:underline"
          :class="{ underline: route.name === 'Home' }"
        >
          Home
        </router-link>
        <router-link
          to="/favourites"
          class="font-medium hover:underline"
          :class="{ underline: route.name === 'favourites' }"
        >
          Favourites
        </router-link>
      </nav>

      <!-- Desktop Toggle Button -->
      <button
        @click="toggleColor"
        class="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-white text-gray-800 text-sm font-medium rounded-full shadow hover:bg-gray-100 transition absolute right-[50px] top-4"
      >
        <span class="text-lg">{{ isLight ? "🌞" : "🌙" }}</span>
      </button>

      <!-- Mobile hamburger -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="sm:hidden p-2 rounded bg-white text-gray-800"
      >
        ☰
      </button>
    </div>

    <!-- Mobile nav -->
    <div
      v-if="mobileOpen"
      class="sm:hidden px-6 py-4 bg-white text-gray-800 space-y-3"
    >
      <router-link to="/" class="block font-medium" @click="mobileOpen = false">
        Home
      </router-link>
      <router-link
        to="/favourites"
        class="block font-medium"
        @click="mobileOpen = false"
      >
        Favourites
      </router-link>

      <!-- Mobile Toggle Button -->
      <button
        @click="toggleColor"
        class="w-full flex items-center justify-center gap-2 mt-3 px-3 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-full hover:bg-gray-300 transition"
      >
        <span class="text-lg">{{ isLight ? "🌞" : "🌙" }}</span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useAppColor } from "@/composables/useAppColor";
import recipeBook from "/recipe-book.png";

const { isLight, toggleColor } = useAppColor();
const route = useRoute();
const mobileOpen = ref(false);
</script>

<style scoped></style>
