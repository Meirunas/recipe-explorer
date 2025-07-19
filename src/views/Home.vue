<template>
  <div class="px-4 py-6 space-y-6">
    <!-- Motivational Banner -->
    <div class="text-center text-green-600 font-semibold">
      Healthy habits start at the plate, make yours count.
    </div>

    <!-- Controls -->
    <div
      class="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0"
    >
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

    <!-- Messages -->
    <div
      v-if="loading"
      class="text-center py-8 text-gray-500 dark:text-gray-400"
    >
      Loading…
    </div>
    <div v-else-if="error" class="text-center py-8 text-red-500">
      {{ error }}
    </div>
    <div
      v-else-if="!meals.length && searchQuery"
      class="text-center py-8 text-gray-500 dark:text-gray-400"
    >
      No meals found.
    </div>
    <div
      v-else-if="!meals.length && !searchQuery"
      class="text-center py-8 text-gray-400 dark:text-gray-500"
    >
      Start by selecting a category or searching for a meal.
    </div>

    <!-- Grid + Preview -->
    <div class="relative">
      <div
        class="flex flex-wrap justify-center gap-6 px-6"
      >
        <MealCard
          v-for="meal in meals"
          :key="meal.idMeal"
          :meal="meal"
          @preview="preview.fetchMealPreview(meal.idMeal)"
          @leave="preview.clearMealPreviewWithDelay"
        />
      </div>
      <transition name="fade-slide">
        <MealHoverDetail v-if="preview.meal" />
      </transition>
    </div>
  </div>
</template>

<script setup>
import { useMealPreviewStore } from "@/stores/useMealPreview";
const preview = useMealPreviewStore();
import { ref, onMounted, computed } from "vue";
import debounce from "lodash-es/debounce";
import { storeToRefs } from "pinia";
import MealCard from "@/components/MealCard.vue";
import MealHoverDetail from "@/components/MealHoverDetail.vue";
import { listCategories, filterMeals } from "@/services/api.js";
import { useMeals } from "@/stores/useMeals";

const { meal } = storeToRefs(preview);

const mealsStore = useMeals();
const categories = ref([]);

const selectedCategory = computed({
  get: () => mealsStore.selectedCategory,
  set: (val) => (mealsStore.selectedCategory = val),
});

const searchQuery = computed({
  get: () => mealsStore.query,
  set: (val) => (mealsStore.query = val),
});

const meals = computed(() => mealsStore.meals);
const loading = computed(() => mealsStore.loading);
const error = computed(() => mealsStore.error);

onMounted(async () => {
  try {
    categories.value = await listCategories();
    if (!meals.value.length && !searchQuery.value) {
      const veganCat = categories.value.find(
        (c) => c.strCategory.toLowerCase() === "vegan"
      );
      if (veganCat) {
        selectedCategory.value = veganCat.strCategory;
        await onCategoryChange();
      }
    }
  } catch (err) {
    console.error("Error loading categories:", err);
    mealsStore.error = "Unable to load meal categories. Please try again.";
  }
});

async function onCategoryChange() {
  searchQuery.value = "";
  if (!selectedCategory.value) {
    mealsStore.meals = [];
    return;
  }

  mealsStore.loading = true;
  mealsStore.error = null;

  try {
    const data = await filterMeals("category", selectedCategory.value);
    mealsStore.meals = data;
  } catch {
    mealsStore.error = "Failed to load by category.";
  } finally {
    mealsStore.loading = false;
  }
}

const doSearch = debounce(() => {
  const trimmed = searchQuery.value.trim();
  if (!trimmed) return;

  selectedCategory.value = "";
  mealsStore.query = trimmed;
}, 300);

function onSearch() {
  const trimmed = searchQuery.value.trim();
  if (!trimmed) {
    mealsStore.query = "";
    mealsStore.meals = [];
    mealsStore.loading = false;
    return;
  }

  mealsStore.loading = true;
  doSearch();
}
</script>
