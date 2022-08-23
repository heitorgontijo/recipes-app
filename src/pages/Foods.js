import React from 'react';

import Header from '../components/Header';
import Recipes from '../components/Recipes';
import RecipesCategories from '../components/RecipesCategories';
import Footer from '../components/Footer';

function Foods() {
  return (
    <main>
      <Header />
      <RecipesCategories categoryType="meals" />
      <Recipes />
      <Footer />
    </main>
  );
}

export default Foods;
