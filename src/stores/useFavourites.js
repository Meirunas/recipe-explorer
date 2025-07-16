import { defineStore } from "pinia";
import { ref, watch } from "vue";

export const useFavourites = defineStore("favourites", () => {
  const favourites = ref([]);

  // Load from localStorage (SSR-safe)
  if (typeof window !== "undefined") {
    const saved = localStorage.getItem("favourites");
    if (saved) {
      favourites.value = JSON.parse(saved);
    }
  }

  function toggleFavourite(meal) {
    const exists = favourites.value.find((m) => m.idMeal === meal.idMeal);
    if (exists) {
      favourites.value = favourites.value.filter(
        (m) => m.idMeal !== meal.idMeal
      );
    } else {
      favourites.value.push(meal);
    }
  }

  function isFavourited(mealId) {
    return favourites.value.some((m) => m.idMeal === mealId);
  }

  // ✅ Save to localStorage
  watch(
    favourites,
    (newVal) => {
      if (typeof window !== "undefined") {
        localStorage.setItem("favourites", JSON.stringify(newVal));
      }
    },
    { deep: true }
  );

  return { favourites, toggleFavourite, isFavourited };
});
