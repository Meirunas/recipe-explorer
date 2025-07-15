<template>
  <div class="px-4 py-6 max-w-3xl mx-auto">
    <div v-if="store.loading" class="text-center py-8 text-gray-500 dark:text-gray-400">
      Loading recipe…
    </div>
    <div v-else-if="store.error" class="text-center py-8 text-red-500">
      {{ store.error }}
    </div>
    <div v-else-if="store.meal" class="space-y-6">
      <h1 class="text-3xl font-bold">{{ store.meal.strMeal }}</h1>
      <img
        :src="store.meal.strMealThumb"
        :alt="store.meal.strMeal"
        class="w-full rounded-lg shadow"
      />
      <section>
        <h2 class="text-2xl font-semibold">Ingredients</h2>
        <ul class="list-disc list-inside">
          <li v-for="ing in store.ingredients" :key="ing">{{ ing }}</li>
        </ul>
      </section>
      <section>
        <h2 class="text-2xl font-semibold">Instructions</h2>
        <p class="whitespace-pre-line">{{ store.meal.strInstructions }}</p>
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
