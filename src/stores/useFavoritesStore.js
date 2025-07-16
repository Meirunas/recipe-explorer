import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useFavoritesStore = defineStore('favorites', () => {
  const favorites = ref([])

  // ✅ Load from localStorage (SSR-safe)
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('favorites')
    if (saved) {
      favorites.value = JSON.parse(saved)
    }
  }

  function toggleFavorite(meal) {
    const exists = favorites.value.find(m => m.idMeal === meal.idMeal)
    if (exists) {
      favorites.value = favorites.value.filter(m => m.idMeal !== meal.idMeal)
    } else {
      favorites.value.push(meal)
    }
  }

  function isFavorited(mealId) {
    return favorites.value.some(m => m.idMeal === mealId)
  }

  // ✅ Save to localStorage
  watch(favorites, (newVal) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('favorites', JSON.stringify(newVal))
    }
  }, { deep: true })

  return { favorites, toggleFavorite, isFavorited }
})
