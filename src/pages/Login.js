import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import '../assets/css/Login.css';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    history.push('/foods');
  };

  const validateFormData = () => {
    const { email, password } = formData;
    const MIN_PASSWORD_SIZE = 7;

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.length >= MIN_PASSWORD_SIZE;

    setSubmitButtonIsDisabled(!(isValidEmail && isValidPassword));
  };

  useEffect(validateFormData, [formData]);

  return (
    <main className="page login">
      <form className="login-form">
        <header className="form-header">
          <h1>
            Recipes
            <span>App</span>
          </h1>
        </header>

        <label htmlFor="email" className="form-label">
          E-mail:
          <div className="form-input-group">
            <input
              data-testid="email-input"
              id="email"
              name="email"
              onChange={ handleChange }
              placeholder="Type your e-mail..."
              type="email"
              value={ formData.email }
            />
            <i className="fa-solid fa-at" />
          </div>
        </label>

        <label htmlFor="password" className="form-label">
          Password:
          <div className="form-input-group">
            <input
              data-testid="password-input"
              name="password"
              onChange={ handleChange }
              placeholder="Type your password..."
              type={ showPassword ? 'text' : 'password' }
              value={ formData.password }
            />

            <button
              data-testid="show-password"
              onClick={ () => setShowPassword(!showPassword) }
              type="button"
            >
              { showPassword
                ? <i className="fa-solid fa-eye-slash" />
                : <i className="fa-solid fa-eye" /> }
            </button>
          </div>
        </label>

        <button
          data-testid="login-submit-btn"
          disabled={ submitButtonIsDisabled }
          onClick={ handleSubmit }
          type="button"
        >
          Login
        </button>
      </form>
    </main>
  );
}

export default Login;
