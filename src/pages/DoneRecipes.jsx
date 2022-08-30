import React, { useState, useEffect } from 'react';

import Header from '../components/Header';
import FavoriteAndShare from '../components/FavoriteAndShare';
import * as Styled from './DoneRecipes.styles';

function DoneRecipes() {
  const [completedRecipes, setCompletedRecipes] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const storedCompletedRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    setCompletedRecipes(storedCompletedRecipes || []);
  }, []);

  return (
    <Styled.Done>
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

      <Styled.DoneContainer>
        { completedRecipes
          .filter((recipe) => recipe.type.includes(filter))
          .map((recipe, index) => (
            <Styled.DoneCard key={ index }>
              <Styled.RecipeLink
                to={ `${recipe.type}s/${recipe.id}` }
                data-testid={ `${index}-horizontal-image` }
              >
                <Styled.ImageTemplate src={ recipe.image } alt={ recipe.name } />
              </Styled.RecipeLink>

              <Styled.RecipeDetails>
                <Styled.RecipeLink
                  data-testid={ `${index}-horizontal-name` }
                  to={ `${recipe.type}s/${recipe.id}` }
                  type="button"
                >
                  <Styled.RecipeTitle>{ recipe.name }</Styled.RecipeTitle>

                  <p data-testid={ `${index}-horizontal-top-text` }>
                    { recipe.alcoholicOrNot !== '' ? recipe.alcoholicOrNot
                      : `${recipe.nationality} - ${recipe.category}` }
                  </p>

                  <span data-testid={ `${index}-horizontal-done-date` }>
                    { ` Finished on: ${recipe.doneDate}` }
                  </span>
                </Styled.RecipeLink>

                <Styled.TagsContainer>
                  { recipe.tags.map((tag) => (
                    <Styled.Tag
                      key={ tag }
                      data-testid={ `${index}-${tag}-horizontal-tag` }
                    >
                      { tag }
                    </Styled.Tag>
                  )) }
                </Styled.TagsContainer>

                <FavoriteAndShare
                  recipe={ recipe }
                  link={ `${window.location.href
                    .replace('done-recipes', '')}${recipe.type}s/${recipe.id}` }
                  onlyShare
                />
              </Styled.RecipeDetails>
            </Styled.DoneCard>
          )) }
      </Styled.DoneContainer>
    </Styled.Done>
  );
}

export default DoneRecipes;
