<template>
  <div class="px-4 py-6 space-y-6">
    <h1 class="text-3xl font-bold text-center">Favourites</h1>

    <div
      v-if="favourites.favourites.length === 0"
      class="text-center text-gray-500"
    >
      You haven't added any favourite meals yet.
    </div>

    <div v-else class="flex flex-wrap justify-center gap-6 px-6">
      <MealCard
        v-for="meal in favourites.favourites"
        :key="meal.idMeal"
        :meal="meal"
      />
    </div>
  </div>
</template>

<script setup>
import { useFavourites } from "@/stores/useFavourites";
import MealCard from "@/components/MealCard.vue";

const favourites = useFavourites();
</script>
