import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import fetchRecipeDetails from '../services/fetchRecipeDetails';
import fetchMealsOrDrinks from '../services/fetchMealsOrDrinks';
import getStorage from '../storage/getStorage';

import FavoriteAndShare from '../components/FavoriteAndShare';
import * as Styled from './RecipeDetails.styles';

function RecipeDetails() {
  const history = useHistory();
  const { location: { pathname } } = history;
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [startRecipe, setStartRecipe] = useState(true);
  const [recipeInProgress, setRecipeInProgress] = useState(true);

  const RECIPE_TYPE = pathname.match(/foods\//i) ? 'meals' : 'drinks';

  useEffect(() => {
    fetchRecipeDetails(id, RECIPE_TYPE)
      .then((data) => {
        const recipeData = data[RECIPE_TYPE][0];

        const ingredientKeys = Object.keys(recipeData)
          .filter((key) => key.match(/strIngredient/i) && recipeData[key]);

        const measureKeys = Object.keys(recipeData)
          .filter((key) => key.match(/strMeasure/i) && recipeData[key]);

        setRecipe(recipeData);
        setIngredients(ingredientKeys
          .map((key, index) => (
            `${recipeData[key]} ${recipeData[measureKeys[index]] || ''}`
          )));
      });
  }, [RECIPE_TYPE, id]);

  useEffect(() => {
    const MAX_RECOMMENDATIONS_LENGTH = 6;
    const RECOMMENDATION_TYPE = RECIPE_TYPE === 'meals' ? 'drinks' : 'meals';

    fetchMealsOrDrinks('', 'name', RECOMMENDATION_TYPE)
      .then((data) => {
        const recommendationsFromApi = data[RECOMMENDATION_TYPE];
        setRecommendations(recommendationsFromApi
          .filter((_item, index) => index < MAX_RECOMMENDATIONS_LENGTH));
      });
  }, [RECIPE_TYPE]);

  useEffect(() => {
    setStartRecipe(!getStorage('doneRecipes', []).some((stored) => stored.id === id));

    const progressStored = getStorage('inProgressRecipes', { cocktails: {}, meals: {} });
    setRecipeInProgress(progressStored.cocktails[id] || progressStored.meals[id]);
  }, [id]);

  return (
    <Styled.RecipeDetails>
      { recipe && (
        <>
          <Styled.ImageTemplate
            width="200px"
            src={ recipe.strMealThumb || recipe.strDrinkThumb }
            alt="drink"
            data-testid="recipe-photo"
          />

          <Styled.TitleContainer>
            <div>
              <h2 data-testid="recipe-title">
                { recipe.strMeal || recipe.strDrink }
              </h2>

              <p data-testid="recipe-category">
                { recipe.strAlcoholic || recipe.strCategory }
              </p>
            </div>

            <FavoriteAndShare recipe={ recipe } link={ window.location.href } />
          </Styled.TitleContainer>

          <Styled.IngredientsContainer>
            <h3>Ingredients</h3>

            <Styled.IngredientsList>
              { ingredients.map((ingredient, index) => (
                <li key={ index } data-testid={ `${index}-ingredient-name-and-measure` }>
                  {ingredient}
                </li>
              )) }
            </Styled.IngredientsList>
          </Styled.IngredientsContainer>

          <Styled.InstructionsContainer>
            <h3>Instructions</h3>

            <p data-testid="instructions">
              { recipe.strInstructions }
            </p>
          </Styled.InstructionsContainer>

          { recipe.strYoutube && (
            <Styled.VideoContainer>
              <h3>See on Youtube</h3>

              <iframe
                id="player"
                type="text/html"
                title={ recipe.strMeal }
                src={ `https://www.youtube.com/embed/${recipe.strYoutube.split('=')[1]}` }
                frameBorder="0"
                data-testid="video"
              />
            </Styled.VideoContainer>
          ) }

          <Styled.RecommendationsTitle>
            Recommendations
          </Styled.RecommendationsTitle>

          <Styled.RecommendationsContainer>
            { recommendations
              .map((recommendation, index) => (
                <Styled.RecommendationCard
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img
                    src={ recommendation.strMealThumb || recommendation.strDrinkThumb }
                    alt="recommendation"
                  />

                  <h4 data-testid={ `${index}-recomendation-title` }>
                    { recommendation.strMeal || recommendation.strDrink }
                  </h4>
                </Styled.RecommendationCard>
              )) }
          </Styled.RecommendationsContainer>
        </>
      ) }

      { startRecipe
        && (
          <Styled.StartRecipe
            data-testid="start-recipe-btn"
            type="button"
            onClick={ () => history.push(
              RECIPE_TYPE === 'meals'
                ? `/foods/${id}/in-progress` : `/drinks/${id}/in-progress`,
            ) }
          >
            { recipeInProgress ? 'Continue Recipe' : 'Start Recipe' }
          </Styled.StartRecipe>
        ) }
    </Styled.RecipeDetails>
  );
}

export default RecipeDetails;
