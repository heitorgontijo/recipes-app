import React from 'react';

import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesCategories from '../components/RecipesCategories';

function Foods() {
  return (
    <main>
      <Header />
      <RecipesCategories categoryType="meals" />
      <Recipes />
    </main>
  );
}

export default Foods;
