import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../context/AppContext';

import * as Styled from './SearchBar.styles';

function SearchBar() {
  const {
    updateSearchFilter, getMealsFromAPI, getDrinksFromAPI,
  } = useContext(AppContext);

  const { location: { pathname } } = useHistory();
  const requestAPI = pathname === '/foods' ? getMealsFromAPI : getDrinksFromAPI;

  return (
    <Styled.SearchBar>
      <Styled.Form>
        <Styled.LabelContainer>
          <Styled.FormLabel data-testid="ingredient-search-radio" htmlFor="ingredient">
            <input
              data-testid="ingredient-filter"
              id="ingredient"
              name="searchFilter"
              onChange={ ({ target: { value } }) => updateSearchFilter(value) }
              type="radio"
              value="ingredient"
            />

            <span />

            Ingredient
          </Styled.FormLabel>

          <Styled.FormLabel data-testid="name-search-radio" htmlFor="name">
            <input
              data-testid="name-filter"
              id="name"
              onChange={ ({ target: { value } }) => updateSearchFilter(value) }
              name="searchFilter"
              type="radio"
              value="name"
            />

            <span />

            Name
          </Styled.FormLabel>

          <Styled.FormLabel
            data-testid="first-letter-search-radio"
            htmlFor="first-letter"
          >
            <input
              data-testid="first-letter-filter"
              id="first-letter"
              onChange={ ({ target: { value } }) => updateSearchFilter(value) }
              name="searchFilter"
              type="radio"
              value="first-letter"
            />

            <span />

            First letter
          </Styled.FormLabel>
        </Styled.LabelContainer>

        <Styled.SearchButton
          data-testid="exec-search-btn"
          onClick={ () => requestAPI() }
          type="button"
        >
          Search
        </Styled.SearchButton>
      </Styled.Form>
    </Styled.SearchBar>
  );
}

export default SearchBar;
