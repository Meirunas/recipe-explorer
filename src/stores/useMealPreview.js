// stores/useMealPreview.js
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMealById } from '@/services/api'

let clearTimeoutId = null

export const useMealPreviewStore = defineStore('mealPreview', () => {
  const meal = ref(null)
  const ingredients = ref([])
  const hoveredId = ref(null)
  const loading = ref(false)

  async function fetchMealPreview(id) {
    clearTimeout(clearTimeoutId) // Cancel pending clear
    hoveredId.value = id
    loading.value = true
    ingredients.value = []

    try {
      const data = await getMealById(id)
      if (hoveredId.value !== id) return
      meal.value = data
      for (let i = 1; i <= 20; i++) {
        const name = data[`strIngredient${i}`]?.trim()
        const measure = data[`strMeasure${i}`]?.trim()
        if (name) ingredients.value.push(`${measure} ${name}`.trim())
      }
    } catch (err) {
      console.error('Preview fetch failed', err)
    } finally {
      loading.value = false
    }
  }

  function clearMealPreviewWithDelay() {
    clearTimeout(clearTimeoutId)
    clearTimeoutId = setTimeout(() => {
      hoveredId.value = null
      meal.value = null
      ingredients.value = []
    }, 200) // slight delay to allow mouse to move
  }

  function cancelClear() {
    clearTimeout(clearTimeoutId)
  }

  return {
    meal,
    ingredients,
    hoveredId,
    loading,
    fetchMealPreview,
    clearMealPreviewWithDelay,
    cancelClear,
  }
})
