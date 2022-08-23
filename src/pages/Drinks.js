import React from 'react';

import Header from '../components/Header';
import RecipesCategories from '../components/RecipesCategories';
import Recipes from '../components/Recipes';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <main>
      <Header />
      <RecipesCategories categoryType="drinks" />
      <Recipes />
      <Footer />
    </main>
  );
}

export default Drinks;
