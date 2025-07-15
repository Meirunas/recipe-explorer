<!-- src/views/Home.vue -->
<template>
  <div class="px-4 py-6 space-y-6">
    <!-- Motivational Banner -->
    <div class="text-center text-green-600 font-semibold">
      Healthy habits start at the plate, make yours count. 
    </div>

    <!-- Controls: Category dropdown + Search bar -->
    <div class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
      <!-- Category Filter -->
      <div class="flex items-center space-x-2">
        <label for="category" class="font-semibold">Category:</label>
        <select
          id="category"
          v-model="selectedCategory"
          @change="onCategoryChange"
          class="px-3 py-2 border rounded focus:ring transition"
        >
          <option value="">None</option>
          <option
            v-for="cat in categories"
            :key="cat.idCategory"
            :value="cat.strCategory"
          >
            {{ cat.strCategory }}
          </option>
        </select>
      </div>

      <!-- Search Input -->
      <div class="flex-1">
        <input
          v-model="searchQuery"
          @input="onSearch"
          type="text"
          placeholder="Search meals..."
          class="w-full px-4 py-2 border rounded focus:ring transition"
        />
      </div>
    </div>

    <!-- Status Messages -->
    <div v-if="loading" class="text-center py-8 text-gray-500 dark:text-gray-400">
      Loading…
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>
    <div v-else-if="!meals.length" class="text-center py-8 text-gray-500 dark:text-gray-400">
      No meals found.
    </div>

    <!-- Results Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <MealCard
        v-for="meal in meals"
        :key="meal.idMeal"
        :meal="meal"
      />
    </div>
  </div>
</template>

<script setup>

import { ref, onMounted } from 'vue'
import debounce from 'lodash-es/debounce'
import MealCard from '@/components/MealCard.vue'
import {
  listCategories,
  searchMeals,
  filterMeals
} from '@/services/api.js'

// Local state
const categories       = ref([])
const selectedCategory = ref('')
const searchQuery      = ref('')
const meals            = ref([])
const loading          = ref(false)
const error            = ref(null)

// Load categories once, then default to Vegan if available
onMounted(async () => {
  try {
    categories.value = await listCategories()
    const veganCat = categories.value.find(c => c.strCategory.toLowerCase() === 'vegan')
    if (veganCat) {
      selectedCategory.value = veganCat.strCategory
      await onCategoryChange()
    }
  } catch {
    /* silently fail */
  }
})

// Fetch meals by category
async function onCategoryChange() {
  clearSearch()
  if (!selectedCategory.value) {
    meals.value = []
    return
  }
  loading.value = true
  error.value   = null
  try {
    meals.value = await filterMeals('category', selectedCategory.value)
  } catch {
    error.value = 'Failed to load by category.'
  } finally {
    loading.value = false
  }
}

// Debounced search by name
const doSearch = debounce(async () => {
  clearCategory()
  if (!searchQuery.value.trim()) {
    meals.value = []
    loading.value = false
    return
  }

  loading.value = true
  error.value   = null
  try {
    meals.value = await searchMeals(searchQuery.value)
  } catch {
    error.value = 'Search failed.'
  } finally {
    loading.value = false
  }
}, 300)

function onSearch() {
  loading.value = true
  doSearch()
}

function clearSearch() {
  searchQuery.value = ''
}

function clearCategory() {
  selectedCategory.value = ''
}
</script>
