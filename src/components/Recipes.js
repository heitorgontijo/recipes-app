import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

import RecipeCard from './RecipeCard';

function Recipes() {
  const { location: { pathname } } = useHistory();

  const {
    meals, drinks, getMealsFromAPI, getDrinksFromAPI,
  } = useContext(AppContext);

  const recipes = pathname === '/foods' ? meals : drinks;
  const getRecipes = pathname === '/foods' ? getMealsFromAPI : getDrinksFromAPI;

  const MAX_RECIPES_TO_SHOW = 12;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => getRecipes(), []);

  return (
    <section>
      { recipes
        .filter((_recipe, index) => index + 1 <= MAX_RECIPES_TO_SHOW)
        .map((recipe, index) => (
          <RecipeCard
            key={ recipe.idMeal || recipe.idDrink }
            image={ recipe.strMealThumb || recipe.strDrinkThumb }
            title={ recipe.strMeal || recipe.strDrink }
            category={ recipe.strCategory }
            index={ index }
            to={ `${pathname.replace('/', '')}/${recipe.idMeal || recipe.idDrink}` }
          />
        )) }
    </section>
  );
}

export default Recipes;
