const fetchRecipeDetails = async (idParam) => {
  try {
    const responseMeals = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idParam}`);
    const responseDrinks = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idParam}`);
    const dataMeal = await responseMeals.json();
    const dataDrink = await responseDrinks.json();
    if (dataDrink.drinks === null) { return dataMeal; } return dataDrink;
  } catch (error) {
    console.log(error);
  }
};

export default fetchRecipeDetails;
