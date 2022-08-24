import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import fetchRecipeDetails from '../services/fetchRecipeDetails';

function RecipeInProgress() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const [startedRecipe, setStartedRecipe] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const { id } = useParams();
  const recipeType = history.location.pathname.match(/foods\//i) ? 'meals' : 'cocktails';

  const updateState = () => {
    const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const ingredientes = getInProgressRecipes[recipeType][id];
    if (ingredientes) setIngredientsChecked(ingredientes);
  };

  const saveCheck = (ingredient) => {
    const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(getInProgressRecipes[recipeType][id]);
    if (getInProgressRecipes[recipeType][id]) {
      let arrayIngredients = getInProgressRecipes[recipeType][id];
      const result = arrayIngredients.some((i) => i === ingredient);
      if (result) {
        arrayIngredients = arrayIngredients.filter((i) => i !== ingredient);
      } else {
        arrayIngredients.push(ingredient);
      }
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...getInProgressRecipes,
        [recipeType]: {
          ...getInProgressRecipes[recipeType],
          [id]: arrayIngredients,
        },
      }));
      return updateState();
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...getInProgressRecipes,
      [recipeType]: {
        ...getInProgressRecipes[recipeType],
        [id]: [ingredient],
      },
    }));
    updateState();
  };

  useEffect(() => {
    const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getInProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    updateState();
  }, []);

  useEffect(() => {
    const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (getInProgressRecipes === null) {
      localStorage.setItem('inProgressRecipes', JSON.stringify({
        cocktails: {},
        meals: {},
      }));
    }
    const type = recipeType === 'cocktails' ? 'drinks' : 'meals';
    fetchRecipeDetails(id, type)
      .then((data) => {
        console.log(type);
        const recipe = data[type] ? data[type][0] : {};

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
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingredient }
        >
          {ingredient}
          <input
            id={ ingredient }
            type="checkbox"
            onChange={ () => saveCheck(ingredient) }
            checked={ ingredientsChecked.includes(ingredient) }
          />
        </label>
      )) }

      <p data-testid="instructions">{startedRecipe.strInstructions}</p>
      <buttom data-testid="finish-recipe-btn" type="buttom">Finalizar Receita</buttom>
    </>
  );
}

export default RecipeInProgress;
