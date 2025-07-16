<!-- src/components/Footer.vue -->
<template>
  <footer >
    <div
      class="max-w-screen-xl mx-auto px-6 py-4 flex flex-col md:flex-row items-center md:justify-between space-y-2 md:space-y-0"
    >
      <p class="text-sm">
        © 2025 Recipe Explorer. All rights reserved.
      </p>
      <p class="text-sm">
        Powered by
        <a
          href="https://www.themealdb.com"
          target="_blank"
          rel="noopener noreferrer"
          class="underline hover:text-gray-800 dark:hover:text-gray-200 transition"
        >
          TheMealDB API
        </a>
      </p>
    </div>
  </footer>
</template>

<script setup>
// no script needed
</script>

<style scoped>
/* all styling via Tailwind utilities */
</style>
