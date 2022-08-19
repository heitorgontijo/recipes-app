import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const [inputSearch, setInputSearch] = useState(false);

  const history = useHistory();
  const { location: { pathname } } = history;
  const arrCondicional = ['/profile', '/done-recipes', '/favorite-recipes'];
  const objRoute = { '/foods': 'Foods',
    '/drinks': 'Drinks',
    '/done-recipes': 'Done Recipes',
    '/favorite-recipes': 'Favorite Recipes',
    '/profile': 'Profile',
  };
  return (
    <header>
      <h1 data-testid="page-title">{objRoute[pathname]}</h1>

      <button onClick={ () => history.push('/profile') } type="button">
        <img data-testid="profile-top-btn" src={ profileIcon } alt="profile Icone" />
      </button>

      {!arrCondicional.includes(pathname)
      && (
        <button type="button" onClick={ () => setInputSearch(!inputSearch) }>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searcg Icone"
          />
        </button>
      )}
      {inputSearch && <input placeholder="Digite sua busca" data-testid="search-input" />}
    </header>
  );
}

export default Header;
