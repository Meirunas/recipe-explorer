import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { searchMeals } from '@/services/api.js'

export const useMealsStore = defineStore('meals', () => {
  const query   = ref('')
  const meals   = ref([])
  const loading = ref(false)
  const error   = ref(null)

  let timer = null
  watch(query, (q) => {
    clearTimeout(timer)
    if (!q.trim()) {
      meals.value = []
      loading.value = false
      error.value = null
      return
    }
    loading.value = true
    error.value = null
    timer = setTimeout(async () => {
      try {
        meals.value = await searchMeals(q)
      } catch {
        error.value = 'Failed to fetch meals.'
      } finally {
        loading.value = false
      }
    }, 300)
  })

  return { query, meals, loading, error }
})
