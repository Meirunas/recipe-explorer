<!-- MealCard.vue -->
<template>
  <div class="relative group min-h-[250px]">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow transition overflow-hidden">
      <img :src="meal.strMealThumb" :alt="meal.strMeal" class="w-full h-40 object-cover" />
      <div class="p-4 space-y-2">
        <h3 class="text-lg font-semibold text-gray-800">
          {{ meal.strMeal }}
        </h3>

        <!-- View More -->
        <button
          @mouseenter="$emit('preview', meal.idMeal)"
          @mouseleave="$emit('leave')"
          class="px-3 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-sm"
        >
          View more
        </button>

        <button @click="toggleFav" class="text-xl hover:scale-110 block">
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
