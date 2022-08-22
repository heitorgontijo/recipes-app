import React from 'react';

import Header from '../components/Header';
import RecipesCategories from '../components/RecipesCategories';
import Recipes from '../components/Recipes';

function Drinks() {
  return (
    <main>
      <Header />
      <RecipesCategories categoryType="drinks" />
      <Recipes />
    </main>
  );
}

export default Drinks;
