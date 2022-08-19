import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const [redirect, setRedirect] = useState(false);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    setRedirect(true);
  };

  const validateFormData = () => {
    const { email, password } = formData;
    const MIN_PASSWORD_SIZE = 7;

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.length >= MIN_PASSWORD_SIZE;

    setSubmitButtonIsDisabled(!(isValidEmail && isValidPassword));
  };

  useEffect(validateFormData, [formData]);

  if (redirect) return <Redirect to="/foods" />;

  return (
    <main>
      <form>
        <input
          data-testid="email-input"
          name="email"
          onChange={ handleChange }
          type="email"
          value={ formData.email }
        />

        <input
          data-testid="password-input"
          name="password"
          onChange={ handleChange }
          type="password"
          value={ formData.password }
        />

        <button
          data-testid="login-submit-btn"
          disabled={ submitButtonIsDisabled }
          onClick={ handleSubmit }
          type="button"
        >
          Enter
        </button>
      </form>
    </main>
  );
}

export default Login;
