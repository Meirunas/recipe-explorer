import axios from 'axios'

const client = axios.create({
  baseURL: 'https://www.themealdb.com/api/json/v1/1',
  timeout: 5000,
})


//Start - show categories and display after chosen
export async function listCategories() {
  const { data } = await client.get('/categories.php')
  // returns an array of { idCategory, strCategory, strCategoryThumb, strCategoryDescription }
  return data.categories || []
}

export async function filterMeals(type, value) {
  // type: 'category' | 'area' | 'ingredient'
  const param = type === 'category'   ? 'c'
               : type === 'area'       ? 'a'
               : type === 'ingredient' ? 'i'
               : null

  if (!param || !value) return []
  const { data } = await client.get('/filter.php', { params: { [param]: value } })
  return data.meals || []
}

//End

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
