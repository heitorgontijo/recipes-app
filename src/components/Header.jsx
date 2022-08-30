import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { BiUser } from 'react-icons/bi';
import { BsSearch } from 'react-icons/bs';

import AppContext from '../context/AppContext';
import SearchBar from './SearchBar';

import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

import * as Styled from './Header.styles';

function Header() {
  const [searchInputIsVisible, setSearchInputIsVisible] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;

  const { search, updateSearch } = useContext(AppContext);

  const showSearchButtonOn = ['/foods', '/drinks'];

  const routesTitles = {
    '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
    '/profile': 'Profile',
  };

  return (
    <Styled.Header>
      <Styled.TitleContainer>
        <Styled.ProfileButton
          data-testid="profile-top-btn"
          onClick={ () => history.push('/profile') }
          src={ profileIcon }
          type="button"
        >
          <BiUser />
        </Styled.ProfileButton>

        <h1 data-testid="page-title">
          { routesTitles[pathname] }
        </h1>

        { showSearchButtonOn.includes(pathname)
          && (
            <Styled.SearchButton
              data-testid="search-top-btn"
              onClick={ () => setSearchInputIsVisible(!searchInputIsVisible) }
              src={ searchIcon }
              type="button"
            >
              <BsSearch />
            </Styled.SearchButton>
          ) }
      </Styled.TitleContainer>

      { searchInputIsVisible && (
        <Styled.InputContainer>
          <input
            data-testid="search-input"
            onChange={ ({ target: { value } }) => updateSearch(value) }
            placeholder="Search recipe..."
            value={ search }
          />

          <SearchBar />
        </Styled.InputContainer>
      ) }
    </Styled.Header>
  );
}

export default Header;
