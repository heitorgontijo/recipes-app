import React, { useState, useEffect } from 'react';
import Header from '../components/Header';

function DoneRecipes() {
  const [completedRecipes, setCompletedRecipes] = useState([]);

  useEffect(() => {
    const storedCompletedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setCompletedRecipes(storedCompletedRecipes || []);
  }, []);

  return (
    <div>
      <Header />

      <button type="button" data-testid="filter-by-all-btn"> All </button>
      <button type="button" data-testid="filter-by-food-btn"> Food </button>
      <button type="button" data-testid="filter-by-drink-btn"> Drinks </button>

      { completedRecipes.map((recipe, index) => (
        <div key={ index }>
          <img
            data-testid={ `${index}-horizontal-image` }
            src={ recipe.image }
            alt="outra coisa"
          />

          <h3 data-testid={ `${index}-horizontal-top-text` }>
            { `${recipe.nationality} - ${recipe.category}` }
          </h3>

          <h2 data-testid={ `${index}-horizontal-name` }>
            { recipe.name }
          </h2>

          <p data-testid={ `${index}-horizontal-done-date` }>
            { recipe.doneDate }
          </p>

          <button
            type="button"
            data-testid={ `${index}-horizontal-share-btn` }
            src="shareIcon"
          >
            O elemento de compartilhar a receita
          </button>

          { recipe.tags.map((tag) => (
            <span
              key={ tag }
              data-testid={ `${index}-${tag}-horizontal-tag` }
            >
              { tag }
            </span>
          )) }
        </div>
      )) }

      DoneRecipes
    </div>
  );
}

export default DoneRecipes;
