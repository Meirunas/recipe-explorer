<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition duration-300 overflow-hidden"
  >
    <!-- Meal Image -->
    <img
      :src="meal.strMealThumb"
      :alt="meal.strMeal"
      class="w-full h-40 object-cover"
    />

    <!-- Card Content -->
    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">
        {{ meal.strMeal }}
      </h3>

      <!-- Bottom Controls: Button + favourite -->
      <div class="flex items-center justify-between mt-3">
        <router-link
          :to="`/meal/${meal.idMeal}`"
          class="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
        >
          View Details
        </router-link>

        <!-- Toggle Star Button -->
        <button
          @click="toggle"
          class="text-xl transition hover:scale-110"
          title="Toggle favourite"
        >
          <span v-if="isFav">⭐</span>
          <span v-else>☆</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useFavourites } from "@/stores/useFavourites";

const props = defineProps({ meal: Object });
const favourites = useFavourites();

const isFav = computed(() => favourites.isFavourited(props.meal.idMeal));

function toggle() {
  favourites.toggleFavourite(props.meal);
}
</script>
