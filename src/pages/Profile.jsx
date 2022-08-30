import React, { useState, useEffect } from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import * as Styled from './Profile.styles';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  useEffect(() => {
    const getEmail = JSON.parse(localStorage.getItem('user'));
    if (getEmail) setEmail(getEmail.email);
  }, [email]);

  const logoutBtn = () => { localStorage.clear(); history.push('/'); };

  return (
    <Styled.Profile>
      <Header />

      <Styled.ProfileContent>
        <Styled.UserContainer>
          <Styled.UserIcon>
            <AiOutlineUser />
            <span data-testid="profile-email">{ email }</span>
          </Styled.UserIcon>

          <Styled.RedirectButton
            to="/done-recipes"
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </Styled.RedirectButton>

          <Styled.RedirectButton
            to="/favorite-recipes"
            data-testid="profile-favorite-btn"
          >
            Favorite Recipes
          </Styled.RedirectButton>

          <Styled.Logout
            onClick={ logoutBtn }
            type="button"
            data-testid="profile-logout-btn"
          >
            <FiLogOut />
            Logout
          </Styled.Logout>
        </Styled.UserContainer>
      </Styled.ProfileContent>

      <Footer />
    </Styled.Profile>
  );
}

export default Profile;
