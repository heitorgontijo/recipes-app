import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../context/AppContext';

import '../assets/css/SearchBar.css';

function SearchBar() {
  const {
    updateSearchFilter, getMealsFromAPI, getDrinksFromAPI,
  } = useContext(AppContext);

  const { location: { pathname } } = useHistory();
  const request = pathname === '/foods' ? getMealsFromAPI : getDrinksFromAPI;

  return (
    <section className="search-bar">
      <form className="search-bar-form">
        <label
          data-testid="ingredient-search-radio"
          className="search-bar-label"
          htmlFor="ingredient"
        >
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
        </label>

        <label
          data-testid="name-search-radio"
          className="search-bar-label"
          htmlFor="name"
        >
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
        </label>

        <label
          data-testid="first-letter-search-radio"
          className="search-bar-label"
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
        </label>
      </form>

      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ () => request() }
      >
        Search
      </button>
    </section>
  );
}

export default SearchBar;
