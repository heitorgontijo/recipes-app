export default async (type = 'meals') => {
  const URL_API = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

  try {
    const response = await fetch(URL_API); return response.json();
  } catch { return {}; }
};
