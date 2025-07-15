import axios from 'axios'

const client = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  timeout: 5000,
})

export async function searchMeals(query) {
  if (!query.trim()) return []
  const { data } = await client.get('/search.php', { params: { s: query } })
  return data.meals || []
}

export async function getMealById(id) {
  if (!id) return null
  const { data } = await client.get('/lookup.php', { params: { i: id } })
  return data.meals?.[0] ?? null
}
