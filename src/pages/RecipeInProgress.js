import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchRecipeDetails from '../services/fetchRecipeDetails';

function RecipeInProgress() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const [startedRecipe, setStartedRecipe] = useState([]);

  useEffect(() => {
    const recipeType = history.location.pathname.match(/foods\//i) ? 'meals' : 'drinks';
    const idPath = history.location.pathname.split('/')[2];
    fetchRecipeDetails(idPath, recipeType)
      .then((data) => {
        const recipe = data[recipeType] ? data[recipeType][0] : {};

        const ingredientKeys = Object.keys(recipe)
          .filter((key) => key.match(/strIngredient/i) && recipe[key]);

        const measureKeys = Object.keys(recipe)
          .filter((key) => key.match(/strMeasure/i) && recipe[key]);

        setStartedRecipe(recipe);
        setIngredients(ingredientKeys
          .map((key, index) => `${recipe[key]} ${recipe[measureKeys[index]] || ''}`));
      });
  }, []);

  //   if (!startedRecipe) return <h1>Carregando...</h1>;
  return (
    <>
      <h1 data-testid="recipe-title">
        {startedRecipe.strMeal
       || startedRecipe.strDrink}
      </h1>
      <img
        data-testid="recipe-photo"
        src={ startedRecipe.strMealThumb
      || startedRecipe.strDrinkThumb }
        alt={ startedRecipe.strMeal
            || startedRecipe.strDrink }
      />
      <buttom data-testid="share-btn" type="buttom">Compartilhar</buttom>
      <buttom data-testid="favorite-btn" type="buttom">Favoritar</buttom>
      <p data-testid="recipe-category">
        {' '}
        {startedRecipe.strCategory}
      </p>
      { ingredients.map((ingredient, index) => (
        <h1 key={ index } data-testid={ `${index}-ingredient-step` }>
          {ingredient}
        </h1>
      )) }

      <p data-testid="instructions">{startedRecipe.strInstructions}</p>
      <buttom data-testid="finish-recipe-btn" type="buttom">Finalizar Receita</buttom>
    </>
  );
}

export default RecipeInProgress;
