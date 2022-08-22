import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Header from '../components/Header';
import RecipesCategories from '../components/RecipesCategories';
import Recipes from '../components/Recipes';

function Drinks() {
  const { drinks } = useContext(AppContext);

  if (drinks.length === 1) return <Redirect to={ `/drinks/${drinks[0].idDrink}` } />;

  return (
    <main>
      <Header />
      <RecipesCategories categoryType="drinks" />
      <Recipes />
    </main>
  );
}

export default Drinks;
