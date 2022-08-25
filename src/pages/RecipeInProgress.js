import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import fetchRecipeDetails from '../services/fetchRecipeDetails';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const history = useHistory();
  const [ingredients, setIngredients] = useState([]);
  const [startedRecipe, setStartedRecipe] = useState([]);
  const [ingredientsChecked, setIngredientsChecked] = useState([]);
  const { id } = useParams();
  const recipeType = history.location.pathname.match(/foods\//i) ? 'meals' : 'cocktails';
  const [shareRecipe, setShareRecipe] = useState(false);
  const [recipeIsFavorite, setRecipeIsFavorite] = useState(false);

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
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipeIsFavorite(storedFavoriteRecipes?.some((recipe) => (recipe.id === id)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const handleFavorite = () => {
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const recipeDetailsToStore = {
      id,
      type: recipeType === 'meals' ? 'food' : 'drink',
      nationality: startedRecipe.strArea || '',
      category: startedRecipe.strCategory || '',
      alcoholicOrNot: startedRecipe.strAlcoholic || '',
      name: startedRecipe.strMeal || startedRecipe.strDrink,
      image: startedRecipe.strMealThumb || startedRecipe.strDrinkThumb,
    };
    setRecipeIsFavorite(!recipeIsFavorite);

    if (storedFavoriteRecipes) {
      const thisRecipeIsStored = storedFavoriteRecipes
        ?.some((recipe) => recipe.id === id);

      if (thisRecipeIsStored) {
        return localStorage.setItem(
          'favoriteRecipes',
          JSON.stringify(
            [...storedFavoriteRecipes.filter((recipe) => (recipe.id !== id))],
          ),
        );
      }

      return localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...storedFavoriteRecipes, recipeDetailsToStore]),
      );
    }

    localStorage.setItem('favoriteRecipes', JSON.stringify([recipeDetailsToStore]));
  };

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

      <button
        onClick={ () => {
          copy(window.location.href
            .replace('/in-progress', '')); setShareRecipe(true);
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
        Favoritar
        { recipeIsFavorite
          ? <img src={ blackHeart } alt="coração preenchido" />
          : <img src={ whiteHeart } alt="coração vazio" /> }
      </button>

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
      <button data-testid="finish-recipe-btn" type="button">Finalizar Receita</button>
    </>
  );
}

export default RecipeInProgress;
