<template>
  <div class="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
    <img
      :src="meal.strMealThumb"
      :alt="meal.strMeal"
      class="w-full h-40 object-cover"
    />
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
        {{ meal.strMeal }}
      </h3>
      <router-link
        :to="`/meal/${meal.idMeal}`"
        class="inline-block mt-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
      >
        View Details
      </router-link>
    </div>
  </div>
</template>

<script setup>
defineProps({
  meal: Object
})
</script>
