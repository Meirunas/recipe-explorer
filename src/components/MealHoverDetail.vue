<!-- MealHoverDetail.vue -->
<template>
  <div
    v-if="meal"
    class="fixed top-20 left-1/2 -translate-x-1/2 max-w-2xl w-[90%] bg-white dark:bg-gray-800 rounded-lg shadow-xl z-[999] p-6 transition-all "
    @mouseenter="cancelClear"
    @mouseleave="clearPreview"
  >
    <h3 class="text-2xl font-bold mb-4">{{ meal.strMeal }}</h3>
    <img
      :src="meal.strMealThumb"
      :alt="meal.strMeal"
      class="w-full max-h-60 object-cover rounded-lg shadow mb-4"
    />

    <div v-if="ingredients.length" class="mb-4">
      <h4 class="text-xl font-semibold mb-2">Ingredients</h4>
      <ul
        class="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1"
      >
        <li v-for="(ing, i) in ingredients" :key="i">{{ ing }}</li>
      </ul>
    </div>

    <div class="max-h-64 overflow-y-auto pr-2">
      <p
        class="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line leading-relaxed"
      >
        {{ meal.strInstructions }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { useMealPreviewStore } from "@/stores/useMealPreview";
const store = useMealPreviewStore();
const { meal, ingredients } = store;

const cancelClear = () => store.cancelClear();
const clearPreview = () => store.clearMealPreviewWithDelay();
</script>
