import React from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const history = useHistory();
  console.log(history.location.pathname);
  return (
    <header>
      <h1 data-testid="profile-top-btn">Titulo</h1>
      <img src={ profileIcon } alt="profile Icone" />
      <img src={ searchIcon } alt="searcg Icone" />
    </header>
  );
}

export default Header;
