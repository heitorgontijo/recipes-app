import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState(
    {
      email: '',
      password: '',
      isBtnDisabled: true,
    },
  );
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const { email, password } = formData;
    const MIN_PASSWORD_SIZE = 6;

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.length > MIN_PASSWORD_SIZE;
    setFormData((prevState) => ({ ...prevState,
      isBtnDisabled: !(isValidEmail && isValidPassword) }));
  }, [formData.email, formData.password]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');
    setRedirect(true);
  };
  if (redirect) return <Redirect to="/foods" />;
  return (
    <>
      <input
        value={ formData.email }
        name="email"
        type="email"
        data-testid="email-input"
        onChange={ handleChange }
      />
      <input
        value={ formData.password }
        name="password"
        type="password"
        data-testid="password-input"
        onChange={ handleChange }
      />
      <button
        disabled={ formData.isBtnDisabled }
        type="button"
        data-testid="login-submit-btn"
        onClick={ handleSubmit }
      >
        Enter

      </button>
    </>
  );
}

export default Login;
