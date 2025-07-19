<template>
  <div
    class="w-80 h-100 bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
  >
    <!-- Image -->
    <div class="h-50 overflow-hidden">
      <img
        :src="meal.strMealThumb"
        :alt="meal.strMeal"
        class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
      />
    </div>

    <!-- Content -->
    <div class="flex flex-col justify-between flex-grow p-4">
      <h3
        class="text-gray-800 dark:text-white text-base font-semibold leading-tight truncate"
        :title="meal.strMeal"
      >
        {{ meal.strMeal }}
      </h3>

      <div class="flex items-center justify-between mt-4">
        <button
          @mouseenter="$emit('preview', meal.idMeal)"
          @mouseleave="$emit('leave')"
          class="bg-green-500 hover:bg-green-600 text-white text-sm font-medium px-3 py-1 rounded transition"
        >
          View more
        </button>

        <button
          @click="toggleFav"
          :aria-label="isFav ? 'Remove from favourites' : 'Add to favourites'"
          class="text-xl hover:scale-110 transition-transform duration-200"
        >
          {{ isFav ? '⭐' : '☆' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useFavourites } from '@/stores/useFavourites'

const props = defineProps({ meal: Object })
const emit = defineEmits(['preview', 'leave'])

const favourites = useFavourites()
const isFav = computed(() => favourites.isFavourited(props.meal.idMeal))
const toggleFav = () => favourites.toggleFavourite(props.meal)
</script>
