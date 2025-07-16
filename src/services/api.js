import axios from "axios";

function getClient() {
  return axios.create({
    baseURL: "https://www.themealdb.com/api/json/v1/1",
    timeout: 5000,
  });
}

export async function listCategories() {
  const client = getClient();
  const { data } = await client.get("/categories.php");
  return data.categories || [];
}

export async function filterMeals(type, value) {
  const client = getClient();
  const param =
    type === "category"
      ? "c"
      : type === "area"
      ? "a"
      : type === "ingredient"
      ? "i"
      : null;

  if (!param || !value) return [];
  const { data } = await client.get("/filter.php", {
    params: { [param]: value },
  });
  return data.meals || [];
}

export async function searchMeals(query) {
  if (!query.trim()) return [];
  const client = getClient();
  const { data } = await client.get("/search.php", { params: { s: query } });
  return data.meals || [];
}

export async function getMealById(id) {
  if (!id) return null;
  const client = getClient();
  const { data } = await client.get("/lookup.php", { params: { i: id } });
  return data.meals?.[0] ?? null;
}
