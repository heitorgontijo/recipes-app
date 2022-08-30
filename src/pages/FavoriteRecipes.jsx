import React, { useEffect, useState } from 'react';

import getStorage from '../storage/getStorage';

import Header from '../components/Header';
import FavoriteAndShare from '../components/FavoriteAndShare';
import * as Styled from './FavoriteRecipes.styles';

function FavoriteRecipes() {
  const [filter, setFilter] = useState('');
  const [favorite, setFavorite] = useState([]);

  const getFavoriteRecipes = () => {
    const favoriteRecipes = getStorage('favoriteRecipes', []);
    setFavorite(favoriteRecipes);
  };

  useEffect(() => getFavoriteRecipes(), []);

  return (
    <Styled.Favorites>
      <Header />

      <Styled.FilterContainer>
        <Styled.FilterButton
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => setFilter('') }
          isSelected={ filter === '' }
        >
          All
        </Styled.FilterButton>

        <Styled.FilterButton
          type="button"
          data-testid="filter-by-food-btn"
          onClick={ () => setFilter('food') }
          isSelected={ filter === 'food' }
        >
          Food
        </Styled.FilterButton>

        <Styled.FilterButton
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => setFilter('drink') }
          isSelected={ filter === 'drink' }
        >
          Drink
        </Styled.FilterButton>
      </Styled.FilterContainer>

      <Styled.FavoritesContainer>
        { favorite
          .filter((recipe) => recipe.type.includes(filter))
          .map((recipe, index) => (
            <Styled.FavoriteCard key={ recipe.id }>
              <Styled.RecipeLink
                to={ `/${recipe.type}s/${recipe.id}` }
                data-testid={ `${index}-horizontal-image` }
              >
                <Styled.ImageTemplate src={ recipe.image } alt={ recipe.name } />
              </Styled.RecipeLink>

              <Styled.RecipeDetails>
                <Styled.RecipeLink
                  data-testid={ `${index}-horizontal-name` }
                  to={ `/${recipe.type}s/${recipe.id}` }
                >
                  <Styled.RecipeTitle>{recipe.name}</Styled.RecipeTitle>

                  <Styled.RecipeCategory data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.alcoholicOrNot !== '' ? recipe.alcoholicOrNot
                      : `${recipe.nationality} - ${recipe.category}` }
                  </Styled.RecipeCategory>
                </Styled.RecipeLink>

                <FavoriteAndShare
                  recipe={ recipe }
                  link={ `${window.location.href
                    .replace('favorite-recipes', '')}${recipe.type}s/${recipe.id}` }
                  execOnFavorite={ getFavoriteRecipes }
                />
              </Styled.RecipeDetails>
            </Styled.FavoriteCard>
          ))}
      </Styled.FavoritesContainer>
    </Styled.Favorites>
  );
}

export default FavoriteRecipes;
