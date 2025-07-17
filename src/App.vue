<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <Header />

    <!-- Main grows, pushes footer down -->
    <main class="flex-1">
      <router-view />
    </main>

    <!-- Footer stays at bottom if content is short -->
    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
</script>
