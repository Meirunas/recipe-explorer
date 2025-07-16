<template>
  <div class="px-4 py-6 space-y-6">
    <h1 class="text-3xl font-bold text-center">Favorites</h1>

    <div v-if="favorites.favorites.length === 0" class="text-center text-gray-500">
      You haven't added any favorite meals yet.
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <MealCard
        v-for="meal in favorites.favorites"
        :key="meal.idMeal"
        :meal="meal"
      />
    </div>
  </div>
</template>

<script setup>
import { useFavoritesStore } from '@/stores/useFavoritesStore'
import MealCard from '@/components/MealCard.vue'

const favorites = useFavoritesStore()
</script>

