import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';

import fetchRecipeDetails from '../services/fetchRecipeDetails';

import AppContext from '../context/AppContext';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  const { favoriteRecipe } = useContext(AppContext);

  const [recipe, setRecipe] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const [shareRecipe, setShareRecipe] = useState(false);
  const [recipeIsFavorite, setRecipeIsFavorite] = useState(false);

  const RECIPE_TYPE = pathname.match(/foods\//i) ? 'meals' : 'drinks';
  const RECIPE_IDENTIFIER = RECIPE_TYPE === 'meals' ? 'meals' : 'cocktails';

  const updateCheckedItems = () => {
    const storedRecipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (storedRecipesInProgress) {
      const ingredientsCheckedInStorage = storedRecipesInProgress[RECIPE_IDENTIFIER][id];
      if (ingredientsCheckedInStorage) setIngredientsChecked(ingredientsCheckedInStorage);
    }
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ingredientCheck = (ingredient) => {
    const storedRecipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    let ingredientsCheckedInStorage;

    if (storedRecipesInProgress[RECIPE_IDENTIFIER][id]) {
      ingredientsCheckedInStorage = storedRecipesInProgress[RECIPE_IDENTIFIER][id];
      const includesThisIngredient = ingredientsCheckedInStorage
        .some((checkedItem) => checkedItem === ingredient);

      if (includesThisIngredient) {
        ingredientsCheckedInStorage = ingredientsCheckedInStorage
          .filter((checkedItem) => checkedItem !== ingredient);
      } else ingredientsCheckedInStorage.push(ingredient);
    }

    localStorage.setItem('inProgressRecipes', JSON.stringify({
      ...storedRecipesInProgress,
      [RECIPE_IDENTIFIER]: {
        ...storedRecipesInProgress[RECIPE_IDENTIFIER],
        [id]: ingredientsCheckedInStorage || [ingredient],
      },
    }));

    updateCheckedItems();
  };

  useEffect(() => {
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (storedFavoriteRecipes) {
      setRecipeIsFavorite(storedFavoriteRecipes.some((favorite) => (favorite.id === id)));
    }

    updateCheckedItems();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavorite = () => {
    const type = RECIPE_TYPE === 'meals' ? 'food' : 'drink';
    favoriteRecipe(recipe, type);
    setRecipeIsFavorite(!recipeIsFavorite);
  };

  const finishRecipe = () => {
    const completeRecipeStored = JSON.parse(localStorage.getItem('doneRecipes')) || [];

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

    localStorage.setItem(
      'doneRecipes',
      JSON.stringify([...completeRecipeStored, recipeDetailsToStore]),
    );

    history.push('/done-recipes');
  };

  return (
    <main>
      <h1 data-testid="recipe-title">
        { recipe.strMeal || recipe.strDrink }
      </h1>

      <img
        data-testid="recipe-photo"
        src={ recipe.strMealThumb || recipe.strDrinkThumb }
        alt={ recipe.strMeal || recipe.strDrink }
      />

      <button
        onClick={ () => {
          copy(window.location.href.replace('/in-progress', ''));
          setShareRecipe(true);
        } }
        type="button"
        data-testid="share-btn"
      >
        Compartilhar
      </button>

      { shareRecipe && <span>Link copied!</span> }

      <button
        onClick={ handleFavorite }
        type="button"
        data-testid="favorite-btn"
        src={ recipeIsFavorite ? blackHeart : whiteHeart }
      >
        { recipeIsFavorite
          ? <img src={ blackHeart } alt="coração preenchido" />
          : <img src={ whiteHeart } alt="coração vazio" /> }
      </button>

      <p data-testid="recipe-category">
        {' '}
        {recipe.strCategory}
      </p>

      { ingredients.map((ingredient, index) => (
        <label
          key={ index }
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingredient }
        >
          <input
            id={ ingredient }
            type="checkbox"
            onChange={ () => ingredientCheck(ingredient) }
            checked={ ingredientsChecked.includes(ingredient) }
          />

          { ingredient }
        </label>
      )) }

      <p data-testid="instructions">{ recipe.strInstructions }</p>

      <button
        disabled={ ingredients.length !== ingredientsChecked.length }
        data-testid="finish-recipe-btn"
        type="button"
        onClick={ finishRecipe }
      >
        Finalizar Receita
      </button>
    </main>
  );
}

export default RecipeInProgress;
