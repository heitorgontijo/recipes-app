export default async (value = '', filter = 'name', type = 'meals') => {
  let URL_API = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/'
    : 'https://www.thecocktaildb.com/api/json/v1/1/';

  switch (filter) {
  case 'ingredient': URL_API += `filter.php?i=${value}`; break;
  case 'first-letter': URL_API += `search.php?f=${value}`; break;
  case 'category': URL_API += `filter.php?c=${value}`; break;
  default: URL_API += `search.php?s=${value}`; break;
  }

  try {
    const response = await fetch(URL_API); return response.json();
  } catch { return {}; }
};
