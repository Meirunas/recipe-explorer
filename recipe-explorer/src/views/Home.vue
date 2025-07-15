<template>
  <div class="px-4 py-6">
    <!-- Healthy tip banner -->
    <div class="mb-4 text-center text-green-600 font-semibold">
      Healthy habits start at the plate—make yours count.
    </div>

    <!-- Search Bar -->
    <div class="mb-6">
      <input
        v-model="store.query"
        type="text"
        placeholder="Search meals…"
        class="w-full max-w-lg px-4 py-2 border rounded focus:ring transition"
      />
    </div>

    <!-- Loading / Error / Empty States -->
    <div v-if="store.loading" class="text-center py-8 text-gray-500 dark:text-gray-400">
      Loading…
    </div>
    <div v-else-if="store.error" class="text-center py-8 text-red-500">
      {{ store.error }}
    </div>
    <div v-else-if="!store.meals.length" class="text-center py-8 text-gray-500 dark:text-gray-400">
      No meals found.
    </div>

    <!-- Results Grid: 3 columns on md+ -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <MealCard
        v-for="meal in store.meals"
        :key="meal.idMeal"
        :meal="meal"
      />
    </div>
  </div>
</template>

<script setup>
import { useMealsStore } from '@/stores/meals'
import MealCard from '@/components/MealCard.vue'

const store = useMealsStore()
</script>
