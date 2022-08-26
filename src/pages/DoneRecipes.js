import React, { useState, useEffect } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';

function DoneRecipes() {
  const history = useHistory();
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [shareRecipe, setShareRecipe] = useState(false);
  const [filter, setFilter] = useState('');

  const url = (recipe) => {
    const address = recipe.type === 'food' ? 'foods' : 'drinks';
    console.log(`/${address}/${recipe.id}`);
    return history
      .push(`${address}/${recipe.id}`);
  };

  useEffect(() => {
    const storedCompletedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setCompletedRecipes(storedCompletedRecipes || []);
  }, []);

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

      { completedRecipes
        .filter((recipe) => recipe.type.includes(filter))
        .map((recipe, index) => (
          <div key={ index }>
            <button
              type="button"
              onClick={ () => history.push('/foods/52771') }
              src={ recipe.image }
              data-testid={ `${index}-horizontal-image` }
            >
              <img
                src={ recipe.image }
                alt="outra coisa"
              />
            </button>

            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot !== '' ? recipe.alcoholicOrNot
                : `${recipe.nationality} - ${recipe.category}` }
            </h3>

            <button
              onClick={ () => url(recipe) }
              type="button"
              data-testid={ `${index}-horizontal-name` }
            >
              <h2>
                { recipe.name }
              </h2>
            </button>

            <p data-testid={ `${index}-horizontal-done-date` }>
              { recipe.doneDate }
            </p>

            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src="shareIcon"
              onClick={ () => {
                const address = recipe.type === 'food' ? 'foods' : 'drinks';
                copy(
                  `${window
                    .location.href.replace('done-recipes', '')}${address}/${recipe.id}`,
                ); setShareRecipe(true);
              } }
            >
              O elemento de compartilhar a receita
            </button>
            { shareRecipe && <span>Link copied!</span> }
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
