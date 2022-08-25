import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';

import fetchRecipeDetails from '../services/fetchRecipeDetails';
import fetchMealsOrDrinks from '../services/fetchMealsOrDrinks';

import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

import '../assets/css/RecipeDetails.css';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [startRecipe, setStartRecipe] = useState(true);
  const [shareRecipe, setShareRecipe] = useState(false);
  const [recipeInProgress, setRecipeInProgress] = useState(true);
  const [recipeIsFavorite, setRecipeIsFavorite] = useState(false);

  const RECIPE_TYPE = pathname.match(/foods\//i) ? 'meals' : 'drinks';

  useEffect(() => {
    fetchRecipeDetails(id, RECIPE_TYPE)
      .then((data) => {
        if (data[RECIPE_TYPE]) {
          const recipe = data[RECIPE_TYPE][0];

          const ingredientKeys = Object.keys(recipe)
            .filter((key) => key.match(/strIngredient/i) && recipe[key]);

          const measureKeys = Object.keys(recipe)
            .filter((key) => key.match(/strMeasure/i) && recipe[key]);

          setRecipeDetails(recipe);
          setIngredients(ingredientKeys
            .map((key, index) => (
              `${recipe[key]} ${recipe[measureKeys[index]] || ''}`
            )));
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const MAX_RECOMMENDATIONS_LENGTH = 6;
    const RECOMMENDATION_TYPE = RECIPE_TYPE === 'meals' ? 'drinks' : 'meals';

    fetchMealsOrDrinks('', 'name', RECOMMENDATION_TYPE)
      .then((data) => {
        if (data[RECOMMENDATION_TYPE] !== null) {
          setRecommendations(data[RECOMMENDATION_TYPE]
            .filter((_item, index) => index < MAX_RECOMMENDATIONS_LENGTH));
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setRecipeIsFavorite(storedFavoriteRecipes?.some((recipe) => (recipe.id === id)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const storedRecipesCompleted = JSON.parse(localStorage.getItem('doneRecipes'));
    const storedRecipesInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    console.log(storedRecipesCompleted);
    if (storedRecipesCompleted === null) {
      setStartRecipe(!storedRecipesCompleted?.some((e) => e.id === id));
    } else { setStartRecipe(![storedRecipesCompleted]?.some((e) => e.id === id)); }

    setRecipeInProgress(
      storedRecipesInProgress?.cocktails[id] || storedRecipesInProgress?.meals[id],
    );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFavorite = () => {
    const storedFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const recipeDetailsToStore = {
      id,
      type: pathname.match(/foods\//i) ? 'food' : 'drink',
      nationality: recipeDetails.strArea || '',
      category: recipeDetails.strCategory || '',
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails.strMeal || recipeDetails.strDrink,
      image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
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

  return (
    <main>
      { recipeDetails && (
        <div>
          <h1>RecipeDetails</h1>
          <button
            onClick={ () => { copy(window.location.href); setShareRecipe(true); } }
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

          <section className="recommendations">
            { recommendations
              .map((recommendation, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <p data-testid={ `${index}-recomendation-title` }>
                    { recommendation.strMeal || recommendation.strDrink }
                  </p>

                  <img
                    src={ recommendation.strMealThumb || recommendation.strDrinkThumb }
                    alt="recommendation"
                  />
                </div>
              )) }
          </section>
        </div>
      ) }

      { startRecipe
        && (
          <button
            className="btn-startRecipe"
            data-testid="start-recipe-btn"
            type="button"
            onClick={ () => history.push(
              RECIPE_TYPE === 'meals'
                ? `/foods/${id}/in-progress` : `/drinks/${id}/in-progress`,
            ) }
          >
            { recipeInProgress ? 'Continue Recipe' : 'Start Recipe' }
          </button>
        ) }
    </main>
  );
}

export default RecipeDetails;
