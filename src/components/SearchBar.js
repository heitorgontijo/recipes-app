import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function SearchBar() {
  const {
    updateSearchFilter, getMealsFromAPI, getDrinksFromAPI,
  } = useContext(AppContext);

  const { location: { pathname } } = useHistory();
  const request = pathname === '/foods' ? getMealsFromAPI : getDrinksFromAPI;

  return (
    <section>
      <form>
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            id="ingredient"
            name="searchFilter"
            onChange={ ({ target: { value } }) => updateSearchFilter(value) }
            type="radio"
            value="ingredient"
          />
          Ingredient
        </label>

        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            id="name"
            onChange={ ({ target: { value } }) => updateSearchFilter(value) }
            name="searchFilter"
            type="radio"
            value="name"
          />
          Name
        </label>

        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            id="first-letter"
            onChange={ ({ target: { value } }) => updateSearchFilter(value) }
            name="searchFilter"
            type="radio"
            value="first-letter"
          />
          First letter
        </label>

        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ request }
        >
          Search
        </button>
      </form>
    </section>
  );
}

export default SearchBar;
