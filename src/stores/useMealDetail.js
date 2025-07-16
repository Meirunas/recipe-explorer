import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getMealById } from '@/services/api.js'

export const useMealDetailStore = defineStore('mealDetail', () => {
  const meal        = ref(null)
  const ingredients = ref([])
  const loading     = ref(false)
  const error       = ref(null)

  async function fetchMeal(id) {
    loading.value = true
    error.value   = null
    meal.value    = null
    ingredients.value = []

    try {
      const data = await getMealById(id)
      if (!data) {
        error.value = 'Recipe not found.'
        return
      }
      meal.value = data
      for (let i = 1; i <= 20; i++) {
        const name    = data[`strIngredient${i}`]?.trim()
        const measure = data[`strMeasure${i}`]?.trim()
        if (name) ingredients.value.push(`${measure} ${name}`.trim())
      }
    } catch {
      error.value = 'Failed to load recipe.'
    } finally {
      loading.value = false
    }
  }

  return { meal, ingredients, loading, error, fetchMeal }
})
