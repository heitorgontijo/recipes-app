import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';

import Header from '../components/Header';

import '../assets/css/DoneRecipes.css';

function DoneRecipes() {
  const history = useHistory();

  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [shareRecipe, setShareRecipe] = useState(false);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedCompletedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setCompletedRecipes(storedCompletedRecipes || []);
  }, []);

  const goToRecipeDetails = (recipe) => {
    history.push(`${recipe.type}s/${recipe.id}`);
  };

  return (
    <div>
      <Header />

      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ () => setFilter('') }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        onClick={ () => setFilter('food') }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ () => setFilter('drink') }
      >
        Drink
      </button>

      { shareRecipe && <span>Link copied!</span> }

      { completedRecipes
        .filter((recipe) => recipe.type.includes(filter))
        .map((recipe, index) => (
          <div key={ index }>
            <button
              className="done"
              onClick={ () => goToRecipeDetails(recipe) }
              type="button"
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
            >
              <img src={ recipe.image } alt={ recipe.name } />
            </button>

            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot !== ''
                ? recipe.alcoholicOrNot
                : `${recipe.nationality} - ${recipe.category}` }
            </h3>

            <button
              data-testid={ `${index}-horizontal-name` }
              onClick={ () => goToRecipeDetails(recipe) }
              type="button"
            >
              <h2>{ recipe.name }</h2>
            </button>

            <p data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate }
            </p>

            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src="shareIcon"
              onClick={ () => {
                copy(`${window.location.href
                  .replace('done-recipes', '')}${recipe.type}s/${recipe.id}`);
                setShareRecipe(true);
              } }
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
    </div>
  );
}

export default DoneRecipes;
