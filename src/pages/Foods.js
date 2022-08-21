import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function Foods() {
  const { meals } = useContext(AppContext);

  if (meals.length === 1) return <Redirect to={ `/foods/${meals[0].idMeal}` } />;

  const MAX_RECIPES_TO_SHOW = 12;

  return (
    <main>
      <Header />
      { meals
        .filter((_recipe, index) => index + 1 <= MAX_RECIPES_TO_SHOW)
        .map((recipe, index) => (
          <RecipeCard
            key={ recipe.idMeal }
            image={ recipe.strMealThumb }
            title={ recipe.strMeal }
            category={ recipe.strCategory }
            index={ index }
          />
        )) }
    </main>
  );
}

export default Foods;
