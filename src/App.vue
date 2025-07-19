<template>
  <div class="flex flex-col min-h-screen bg-gray-50 text-gray-900">
    <Header />

    <main class="flex-1">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<script setup>
import Header from "@/components/layouts/Header.vue";
import Footer from "@/components/layouts/Footer.vue";
</script>
