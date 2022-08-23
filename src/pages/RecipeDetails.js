import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import fetchRecipeDetails from '../services/fetchRecipeDetails';
import fetchMealsOrDrinks from '../services/fetchMealsOrDrinks';

function RecipeDetails() {
  const { location: { pathname } } = useHistory();
  const { id } = useParams();

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const recipeType = pathname.match(/foods\//i) ? 'meals' : 'drinks';

    fetchRecipeDetails(id, recipeType)
      .then((data) => {
        const recipe = data[recipeType] ? data[recipeType][0] : {};

        const ingredientKeys = Object.keys(recipe)
          .filter((key) => key.match(/strIngredient/i) && recipe[key]);

        const measureKeys = Object.keys(recipe)
          .filter((key) => key.match(/strMeasure/i) && recipe[key]);

        setRecipeDetails(recipe);
        setIngredients(ingredientKeys
          .map((key, index) => `${recipe[key]} ${recipe[measureKeys[index]] || ''}`));
      });

    const MAX_RECOMMENDATIONS_LENGTH = 6;
    const recommendationType = recipeType === 'meals' ? 'drinks' : 'meals';

    fetchMealsOrDrinks('', 'name', recommendationType)
      .then((data) => {
        const items = data[recommendationType];
        if (items) {
          setRecommendations(items
            .filter((_item, index) => index < MAX_RECOMMENDATIONS_LENGTH));
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      { recipeDetails && (
        <div>
          <h1>RecipeDetails</h1>

          <img
            width="200px"
            src={ recipeDetails.strMealThumb || recipeDetails.strDrinkThumb }
            alt="drink"
            data-testid="recipe-photo"
          />

          <h2 data-testid="recipe-title">
            { recipeDetails.strMeal || recipeDetails.strDrink }
          </h2>

          <p data-testid="recipe-category">
            { recipeDetails.strAlcoholic || recipeDetails.strCategory }
          </p>

          { ingredients.map((ingredient, index) => (
            <h1 key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
              {ingredient}
            </h1>
          )) }

          <p data-testid="instructions">
            { recipeDetails.strInstructions }
          </p>

          { recipeDetails.strYoutube
            && <iframe
              id="player"
              type="text/html"
              width="640"
              height="360"
              title={ recipeDetails.strMeal }
              src={ `https://www.youtube.com/embed/${recipeDetails.strYoutube.split('=')[1]}` }
              frameBorder="0"
              data-testid="video"
            /> }

          { recommendations.map((recommendation, index) => (
            <div key={ index } data-testid={ `${index}-recomendation-card` }>
              <p data-testid={ `${index}-recomendation-title` }>
                { recommendation.strMeal || recommendation.strDrink }
              </p>
            </div>
          )) }
        </div>
      ) }

      <button data-testid="start-recipe-btn" type="button">Start recipe</button>
    </div>
  );
}

export default RecipeDetails;
