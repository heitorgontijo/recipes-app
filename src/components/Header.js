import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../context/AppContext';
import SearchBar from './SearchBar';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [searchInputIsVisible, setSearchInputIsVisible] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;

  const { search, updateSearch } = useContext(AppContext);

  const showSearchButtonOn = ['/foods', '/drinks'];

  const routesTitle = {
    '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
    '/profile': 'Profile',
  };

  return (
    <header>
      <h1 data-testid="page-title">{routesTitle[pathname]}</h1>

      <button onClick={ () => history.push('/profile') } type="button">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" />
      </button>

      { showSearchButtonOn.includes(pathname)
        && (
          <button
            onClick={ () => setSearchInputIsVisible(!searchInputIsVisible) }
            type="button"
          >
            <img
              alt="search icon"
              data-testid="search-top-btn"
              src={ searchIcon }
            />
          </button>
        ) }

      { searchInputIsVisible && (
        <input
          data-testid="search-input"
          onChange={ ({ target: { value } }) => updateSearch(value) }
          placeholder="Search recipe"
          value={ search }
        />
      ) }

      <SearchBar />
    </header>
  );
}

export default Header;
