export default async (id, type) => {
  const URL_API = type === 'meals'
    ? `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    : `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  try {
    const response = await fetch(URL_API); return response.json();
  } catch { return {}; }
};
