import React from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  console.log(localStorage);
  return (
    <div>
      <Header />
      <button type="button" data-testid="filter-by-all-btn"> All </button>
      <button type="button" data-testid="filter-by-food-btn"> Food </button>
      <button type="button" data-testid="filter-by-drink-btn"> Drinks </button>
      <img
        data-testid={ `${0}-horizontal-image` }
        src="https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg"
        alt="outracoisa"
      />
      <h3
        data-testid={ `${0}-horizontal-top-text` }
      >
        O texto da categoria da receita
      </h3>
      <h2 data-testid={ `${0}-horizontal-name` }>
        O texto do nome da receita
      </h2>
      <p
        data-testid={ `${0}-horizontal-done-date` }
      >
        O texto da data que a receita foi feita
      </p>
      <button
        type="button"
        data-testid={ `${0}-horizontal-share-btn` }
      >
        O elemento de compartilhar a receita
      </button>
      <img
        src="umaTag"
        data-testid={ `${'index'}-${'tagName'}-horizontal-tag` }
        alt="umaAlt"
      />

      DoneRecipes
    </div>
  );
}

export default DoneRecipes;
