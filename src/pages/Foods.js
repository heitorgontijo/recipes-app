import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import AppContext from '../context/AppContext';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesCategories from '../components/RecipesCategories';

function Foods() {
  const { meals } = useContext(AppContext);

  if (meals.length === 1) {
    return <Redirect to={ `/foods/${meals[0].idMeal}` } />;
  }

  return (
    <main>
      <Header />
      <RecipesCategories categoryType="meals" />
      <Recipes />
    </main>
  );
}

export default Foods;
