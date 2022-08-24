import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';

import fetchRecipeDetails from '../services/fetchRecipeDetails';
import fetchMealsOrDrinks from '../services/fetchMealsOrDrinks';
import '../assets/css/RecipeDetails.css';
import whiteHeart from '../images/whiteHeartIcon.svg';
import blackHeart from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const history = useHistory();
  const { id } = useParams();

  const [recipeDetails, setRecipeDetails] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [btnStartRecipe, setBtnStartRecipe] = useState(true);
  const [btnInProgress, setBtnInProgress] = useState(true);
  const [btnShare, setBtnShare] = useState(false);
  const [btnFavorite, setBtnFavorite] = useState(false);

  useEffect(() => {
    const recipeType = history.location.pathname.match(/foods\//i) ? 'meals' : 'drinks';

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
  }, [id]);

  useEffect(() => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setBtnFavorite(getFavoriteRecipes?.some((recipe) => (recipe.id === id)));
  }, []);

  useEffect(() => {
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setBtnInProgress(inProgress?.cocktails[id] || inProgress?.meals[id]);
    setBtnStartRecipe(!doneRecipes?.some((e) => e.id === id));
  }, [btnStartRecipe, btnInProgress, id]);
  const handleFavorite = () => {
    const getFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const localStorageFavorite = {
      id,
      type: history.location.pathname.match(/foods\//i) ? 'food' : 'drink',
      nationality: recipeDetails.strArea || '',
      category: recipeDetails.strCategory || '',
      alcoholicOrNot: recipeDetails.strAlcoholic || '',
      name: recipeDetails.strMeal || recipeDetails.strDrink,
      image: recipeDetails.strMealThumb || recipeDetails.strDrinkThumb,
    };
    setBtnFavorite(!btnFavorite);
    if (getFavoriteRecipes) {
      const updateLocal = getFavoriteRecipes?.some((recipe) => recipe.id === id);
      if (updateLocal) {
        return localStorage
          .setItem('favoriteRecipes', JSON.stringify([...getFavoriteRecipes
            .filter((recipe) => (
              recipe.id !== id
            )),
          ]));
      }
      return localStorage
        .setItem('favoriteRecipes', JSON.stringify([...getFavoriteRecipes,
          localStorageFavorite]));
    } localStorage.setItem('favoriteRecipes', JSON.stringify([localStorageFavorite]));
  };

  return (
    <div>
      { recipeDetails && (
        <div>
          <h1>RecipeDetails</h1>
          <button
            onClick={ () => { copy(window.location.href); setBtnShare(true); } }
            type="button"
            data-testid="share-btn"
          >
            Compartilhar
            {' '}

          </button>
          {btnShare && <span>Link copied!</span>}

          <button
            onClick={ handleFavorite }
            type="button"
            data-testid="favorite-btn"
            src={ btnFavorite ? blackHeart : whiteHeart }
          >
            Favoritar
            {btnFavorite ? (
              <img src={ blackHeart } alt="coração preenchido" />
            )
              : (
                <img src={ whiteHeart } alt="coração vazio" />
              )}

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
            {recommendations
              .map((recommendation, index) => (
                <div
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <p data-testid={ `${index}-recomendation-title` }>
                    { recommendation.strMeal || recommendation.strDrink }
                  </p>
                  <img
                    src={ recommendation.strMealThumb
                     || recommendation.strDrinkThumb }
                    alt="recomendation"
                  />
                </div>
              )) }
          </section>
        </div>
      ) }
      {btnStartRecipe
      && (
        <button
          className="btn-startRecipe"
          data-testid="start-recipe-btn"
          type="button"
          onClick={ () => history.push(
            history.location.pathname.includes('foods')
              ? `/foods/${id}/in-progress`
              : `/drinks/${id}/in-progress`,
          ) }
        >
          {btnInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </div>
  );
}

export default RecipeDetails;
