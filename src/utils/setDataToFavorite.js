export default (recipe) => ({
  id: recipe.idMeal || recipe.idDrink,
  type: recipe.idMeal ? 'food' : 'drink',
  nationality: recipe.strArea || '',
  category: recipe.strCategory || '',
  alcoholicOrNot: recipe.strAlcoholic || '',
  name: recipe.strMeal || recipe.strDrink,
  image: recipe.strMealThumb || recipe.strDrinkThumb,
});
