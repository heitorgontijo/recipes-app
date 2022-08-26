import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import Header from '../components/Header';
import blackHeart from '../images/blackHeartIcon.svg';

function FavoriteRecipes() {
  const [shareRecipe, setShareRecipe] = useState(false);
  const [filter, setFilter] = useState('');
  const [favorite, setFavorite] = useState([]);

  const history = useHistory();

  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favoriteStorage) {
      setFavorite(JSON.parse(localStorage.getItem('favoriteRecipes')));
    }
  }, []);
  // const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const handleFavorite = (id) => {
    const idFilter = favorite.filter((recipe) => recipe.id !== id);
    console.log(idFilter);
    localStorage.setItem('favoriteRecipes', JSON.stringify([...idFilter]));
    setFavorite(idFilter);
  };

  const goToRecipeDetails = (recipe) => {
    history.push(`/${recipe.type}s/${recipe.id}`);
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
              { recipe.alcoholicOrNot !== '' ? recipe.alcoholicOrNot
                : `${recipe.nationality} - ${recipe.category}` }
            </h3>
            <button
              data-testid={ `${index}-horizontal-name` }
              type="button"
              onClick={ () => goToRecipeDetails(recipe) }
            >
              <h4>
                {recipe.name}
              </h4>

            </button>

            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
              src="shareIcon"
              onClick={ () => {
                copy(
                  `${window
                    .location
                    .href.replace('favorite-recipes', '')}${recipe.type}s/${recipe.id}`,
                ); setShareRecipe(true);
              } }
            >
              O elemento de compartilhar a receita
            </button>

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
      { shareRecipe && <span>Link copied!</span> }

    </div>
  );
}

export default FavoriteRecipes;
