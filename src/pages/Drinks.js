import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Header from '../components/Header';
import RecipeCard from '../components/RecipeCard';

function Drinks() {
  const { drinks } = useContext(AppContext);

  if (drinks.length === 1) return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;

  const MAX_RECIPES_TO_SHOW = 12;
  console.log(drinks);

  return (
    <main>
      <Header />
      { drinks
        .filter((_recipe, index) => index + 1 <= MAX_RECIPES_TO_SHOW)
        .map((recipe, index) => (
          <RecipeCard
            key={ recipe.idDrink }
            image={ recipe.strDrinkThumb }
            title={ recipe.strDrink }
            category={ recipe.strCategory }
            index={ index }
          />
        )) }
    </main>
  );
}

export default Drinks;
