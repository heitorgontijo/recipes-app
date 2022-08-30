import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import fetchRecipeDetails from '../services/fetchRecipeDetails';
import getStorage from '../storage/getStorage';
import setInProgress from '../storage/setInProgress';
import setDoneRecipe from '../storage/setDoneRecipe';

import FavoriteAndShare from '../components/FavoriteAndShare';
import * as Styled from './RecipeInProgress.styles';

function RecipeInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);

  const RECIPE_TYPE = pathname.match(/foods\//i) ? 'meals' : 'drinks';
  const RECIPE_IDENTIFIER = RECIPE_TYPE === 'meals' ? 'meals' : 'cocktails';

  const updateCheckedItems = () => {
    const storedRecipesInProgress = getStorage(
      'inProgressRecipes', { cocktails: {}, meals: {} },
    );
    setIngredientsChecked(storedRecipesInProgress[RECIPE_IDENTIFIER][id] || []);
  };

  useEffect(() => {
    fetchRecipeDetails(id, RECIPE_TYPE)
      .then((data) => {
        const recipeData = data[RECIPE_TYPE][0];

        const ingredientKeys = Object.keys(recipeData)
          .filter((key) => key.match(/strIngredient/i) && recipeData[key]);

        const measureKeys = Object.keys(recipeData)
          .filter((key) => key.match(/strMeasure/i) && recipeData[key]);

        setRecipe(recipeData);
        setIngredients(ingredientKeys.map((key, index) => (
          `${recipeData[key]} ${recipeData[measureKeys[index]] || ''}`
        )));
      });

    updateCheckedItems();
  }, []);

  const ingredientCheck = (ingredient) => {
    setInProgress(id, ingredient, RECIPE_IDENTIFIER); updateCheckedItems();
  };

  const finishRecipe = () => {
    const recipeDetailsToStore = {
      id,
      type: RECIPE_TYPE === 'meals' ? 'food' : 'drink',
      nationality: recipe.strArea || '',
      category: recipe.strCategory || '',
      alcoholicOrNot: recipe.strAlcoholic || '',
      name: recipe.strMeal || recipe.strDrink,
      image: recipe.strMealThumb || recipe.strDrinkThumb,
      doneDate: new Date().toLocaleDateString(),
      tags: recipe.strTags?.split(',') || [],
    };

    setDoneRecipe(recipeDetailsToStore);
    history.push('/done-recipes');
  };

  return (
    <Styled.RecipeInProgress>
      <Styled.ImageTemplate
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />

      <Styled.TitleContainer>
        <div>
          <h2 data-testid="recipe-title">{ recipe.strMeal || recipe.strDrink }</h2>
          <p data-testid="recipe-category">{recipe.strCategory}</p>
        </div>

        <FavoriteAndShare
          recipe={ recipe }
          link={ window.location.href.replace('/in-progress', '') }
        />
      </Styled.TitleContainer>

      <Styled.IngredientsContainer>
        <h3>Ingredients</h3>

        <Styled.IngredientsList>
          { ingredients.map((ingredient, index) => (
            <Styled.IngredientItem
              isChecked={ ingredientsChecked.includes(ingredient) }
              key={ index }
            >
              <label data-testid={ `${index}-ingredient-step` } htmlFor={ ingredient }>
                <input
                  id={ ingredient }
                  type="checkbox"
                  onChange={ () => ingredientCheck(ingredient) }
                  checked={ ingredientsChecked.includes(ingredient) }
                />

                { ingredient }
              </label>
            </Styled.IngredientItem>
          )) }
        </Styled.IngredientsList>
      </Styled.IngredientsContainer>

      <Styled.InstructionsContainer>
        <h3>Instructions</h3>
        <p data-testid="instructions">{ recipe.strInstructions }</p>
      </Styled.InstructionsContainer>

      <Styled.FinishButton
        disabled={ ingredients.length !== ingredientsChecked.length }
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ finishRecipe }
      >
        Finish Recipe
      </Styled.FinishButton>
    </Styled.RecipeInProgress>
  );
}

export default RecipeInProgress;
