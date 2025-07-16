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
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <MealCard
        v-for="meal in meals"
        :key="meal.idMeal"
        :meal="meal"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import debounce from 'lodash-es/debounce'
import MealCard from '@/components/MealCard.vue'
import {
  listCategories,
  filterMeals
} from '@/services/api.js'
import { useMeals } from '@/stores/useMeals'

const mealsStore = useMeals()

const categories = ref([])
const selectedCategory = computed({
  get: () => mealsStore.selectedCategory,
  set: (val) => mealsStore.selectedCategory = val
})


// Use computed properties bound to the store
const searchQuery = computed({
  get: () => mealsStore.query,
  set: (val) => mealsStore.query = val
})
const meals = computed(() => mealsStore.meals)
const loading = computed(() => mealsStore.loading)
const error = computed(() => mealsStore.error)

onMounted(async () => {
  try {
    categories.value = await listCategories()

    // Only set default if meals not already loaded
    if (!meals.value.length && !searchQuery.value) {
      const veganCat = categories.value.find(c => c.strCategory.toLowerCase() === 'vegan')
      if (veganCat) {
        selectedCategory.value = veganCat.strCategory
        await onCategoryChange()
      }
    }
  } catch {
    // silent fail
  }
})

// Fetch meals by category
async function onCategoryChange() {
  searchQuery.value = ''
  if (!selectedCategory.value) {
    mealsStore.meals = []
    return
  }

  mealsStore.loading = true
  mealsStore.error = null

  try {
    const data = await filterMeals('category', selectedCategory.value)
    mealsStore.meals = data
  } catch {
    mealsStore.error = 'Failed to load by category.'
  } finally {
    mealsStore.loading = false
  }
}

// Trigger store search logic
const doSearch = debounce(() => {
  selectedCategory.value = ''
  mealsStore.query = searchQuery.value
}, 300)

function onSearch() {
  mealsStore.loading = true
  doSearch()
}
</script>

<style scoped>
/* Tailwind handles all styling */
</style>
