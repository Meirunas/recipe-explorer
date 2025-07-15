<!-- src/views/MealDetail.vue -->
<template>
  <div class="px-4 py-6 max-w-3xl mx-auto space-y-6">
    <!-- Back Button -->
    <router-link
      to="/"
      class="inline-block mb-4 text-green-600 hover:underline"
    >
      ← Back to Home
    </router-link>

    <!-- Loading & Error -->
    <div v-if="store.loading" class="text-center py-8 text-gray-500 dark:text-gray-400">
      Loading recipe…
    </div>
    <div v-else-if="store.error" class="text-center py-8 text-red-500">
      {{ store.error }}
    </div>

    <!-- Recipe Detail -->
    <div v-else-if="store.meal" class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {{ store.meal.strMeal }}
      </h1>

      <img
        :src="store.meal.strMealThumb"
        :alt="store.meal.strMeal"
        class="w-full rounded-lg shadow"
      />

      <section>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Ingredients
        </h2>
        <ul class="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li v-for="ing in store.ingredients" :key="ing">{{ ing }}</li>
        </ul>
      </section>

      <section>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Instructions
        </h2>
        <p class="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
          {{ store.meal.strInstructions }}
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useMealDetailStore } from '@/stores/mealDetail'

const route = useRoute()
const store = useMealDetailStore()

onMounted(() => {
  store.fetchMeal(route.params.id)
})
</script>
