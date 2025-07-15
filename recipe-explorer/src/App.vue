<!-- src/App.vue -->
<template>
  <div class="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100">
    <!-- push content down past header -->
    <div class="pt-[64px]">
      <Header />
    </div>

    <!-- main grows to fill space -->
    <main class="flex-grow container mx-auto px-4 py-6">
      <router-view />
    </main>

    <!-- footer sticks to bottom via mt-auto -->
    <Footer class="mt-auto" />
  </div>
</template>

<script setup>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
</script>
