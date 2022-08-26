import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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
    <main>
      <Header />

      <p data-testid="profile-email">{ email }</p>

      <button
        onClick={ () => history.push('/done-recipes') }
        type="button"
        data-testid="profile-done-btn"
      >
        Done Recipes
      </button>

      <button
        onClick={ () => history.push('/favorite-recipes') }
        type="button"
        data-testid="profile-favorite-btn"
      >
        Favorite Recipes
      </button>

      <button
        onClick={ logoutBtn }
        type="button"
        data-testid="profile-logout-btn"
      >
        Logout
      </button>

      <Footer />
    </main>
  );
}

export default Profile;
