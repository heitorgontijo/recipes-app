import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [shareRecipe, setShareRecipe] = useState(false);
  const [filter, setFilter] = useState('');
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    setFavorite(JSON.parse(localStorage.getItem('favoriteRecipes')));
  }, []);
  // const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const handleFavorite = (id) => {
    const idFilter = favorite.filter((recipe) => recipe.id !== id);
    console.log(idFilter);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...idFilter]));
    setFavorite(idFilter);
  };

  return (
    <div>
      <Header />
      FavoriteRecipes
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
      {favorite
        .filter((recipe) => recipe.type.includes(filter))
        .map((recipe, index) => (
          <div key={ recipe.id }>
            <img
              data-testid={ `${index}-horizontal-image` }
              src={ recipe.image }
              alt={ recipe.name }
            />
            <h3 data-testid={ `${index}-horizontal-top-text` }>
              { recipe.alcoholicOrNot !== '' ? recipe.alcoholicOrNot
                : `${recipe.nationality} - ${recipe.category}` }
            </h3>
            <h4 data-testid={ `${index}-horizontal-name` }>
              {recipe.name}
            </h4>
            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src="shareIcon"
              onClick={ () => {
                const address = recipe.type === 'food' ? 'foods' : 'drinks';
                copy(
                  `${window
                    .location
                    .href.replace('favorite-recipes', '')}${address}/${recipe.id}`,
                ); setShareRecipe(true);
              } }
            >
              O elemento de compartilhar a receita
            </button>
            { shareRecipe && <span>Link copied!</span> }

            <button
              onClick={ () => handleFavorite(recipe.id) }
              type="button"
              data-testid={ `${index}-horizontal-favorite-btn` }
              src={ blackHeart }
            >
              <img src={ blackHeart } alt="coração preenchido" />
            </button>
          </div>
        ))}

    </div>
  );
}

export default FavoriteRecipes;
