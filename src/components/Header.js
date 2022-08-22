import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';

import AppContext from '../context/AppContext';
import SearchBar from './SearchBar';

import '../assets/css/Header.css';

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
    <header className="header">
      <section className="header-main">
        <button
          data-testid="profile-top-btn"
          className="header-profile"
          onClick={ () => history.push('/profile') }
          src={ profileIcon }
          type="button"
        >
          {/* <img data-testid="profile-top-btn" src={ profileIcon } alt="profile icon" /> */}
          <i className="fa-solid fa-user-large" />
        </button>

        <h1
          className="header-title"
          data-testid="page-title"
        >
          {routesTitle[pathname]}
        </h1>

        { showSearchButtonOn.includes(pathname)
        && (
          <button
            className="header-search-button"
            data-testid="search-top-btn"
            onClick={ () => setSearchInputIsVisible(!searchInputIsVisible) }
            src={ searchIcon }
            type="button"
          >
            {/* <img
              alt="search icon"
              data-testid="search-top-btn"
              src={ searchIcon }
            /> */}
            <i className="fas fa-search" />
          </button>
        ) }
      </section>

      { searchInputIsVisible && (
        <div className="header-input-area">
          <input
            data-testid="search-input"
            onChange={ ({ target: { value } }) => updateSearch(value) }
            placeholder="Search recipe"
            value={ search }
          />
          <SearchBar />
        </div>
      ) }
    </header>
  );
}

export default Header;
