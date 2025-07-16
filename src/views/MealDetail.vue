<template>
  <div class="px-4 py-6 max-w-3xl mx-auto space-y-6">
    <!-- Back Button -->
    <router-link
      to="/"
      class="inline-block mb-4 text-green-600 hover:underline"
    >
      ← Back to Home
    </router-link>

    <!-- Loading & Error -->
    <div
      v-if="store.loading"
      class="text-center py-8 text-gray-500 dark:text-gray-400"
    >
      Loading recipe…
    </div>
    <div v-else-if="store.error" class="text-center py-8 text-red-500">
      {{ store.error }}
    </div>

    <!-- Recipe Detail -->
    <div v-else-if="store.meal" class="space-y-6">
      <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">
        {{ store.meal.strMeal }}
      </h1>

      <!-- Image with Favorite Toggle -->
      <div class="relative">
        <img
          :src="store.meal.strMealThumb"
          :alt="store.meal.strMeal"
          class="w-full rounded-lg shadow"
        />

        <!-- Favorite Toggle Button -->
        <button
          @click="toggle"
          class="absolute top-3 right-3 z-10 bg-white bg-opacity-80 rounded-full px-3 py-1 text-xl transition hover:scale-110 shadow select-none"
          title="Toggle Favorite"
        >
          <span :class="[isFav ? 'text-yellow-400' : 'text-gray-400']">
            {{ isFav ? "⭐" : "☆" }}
          </span>
        </button>
      </div>

      <!-- Ingredients Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Ingredients
        </h2>
        <ul class="list-disc list-inside text-gray-700 dark:text-gray-300">
          <li v-for="ing in store.ingredients" :key="ing">{{ ing }}</li>
        </ul>
      </section>

      <!-- Instructions Section -->
      <section>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          Instructions
        </h2>
        <p
          class="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300"
        >
          {{ store.meal.strInstructions }}
        </p>
      </section>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useMealDetailStore } from "@/stores/mealDetail";
import { useFavoritesStore } from "@/stores/useFavoritesStore";

const route = useRoute();
const store = useMealDetailStore();
const favorites = useFavoritesStore();

onMounted(() => {
  store.fetchMeal(route.params.id);
});

// ⭐ Favorite logic
const isFav = computed(() =>
  store.meal ? favorites.isFavorited(store.meal.idMeal) : false
);

function toggle() {
  if (store.meal) {
    favorites.toggleFavorite(store.meal);
  }
}
</script>
