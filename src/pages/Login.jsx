import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { MdAlternateEmail } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

import * as Styled from './Login.styles';

function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [submitButtonIsDisabled, setSubmitButtonIsDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem('user', JSON.stringify({ email: formData.email }));
    localStorage.setItem('mealsToken', '1');
    localStorage.setItem('cocktailsToken', '1');

    history.push('/foods');
  };

  const validateFormData = () => {
    const MIN_PASSWORD_SIZE = 7;

    const isValidEmail = /\S+@\S+\.\S+/.test(formData.email);
    const isValidPassword = formData.password.length >= MIN_PASSWORD_SIZE;

    setSubmitButtonIsDisabled(!(isValidEmail && isValidPassword));
  };

  useEffect(validateFormData, [formData]);

  return (
    <Styled.Login>
      <Styled.Form>
        <Styled.FormHeader>
          <h1>
            Recipes
            <span>App</span>
          </h1>
        </Styled.FormHeader>

        <Styled.FormLabel htmlFor="email">
          E-mail:
          <Styled.InputContainer>
            <Styled.FormInput
              data-testid="email-input"
              id="email"
              name="email"
              onChange={ handleChange }
              placeholder="Type your e-mail..."
              type="email"
              value={ formData.email }
            />

            <MdAlternateEmail />
          </Styled.InputContainer>
        </Styled.FormLabel>

        <Styled.FormLabel htmlFor="password">
          Password:
          <Styled.InputContainer>
            <Styled.FormInput
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
              { showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye /> }
            </button>
          </Styled.InputContainer>
        </Styled.FormLabel>

        <Styled.Submit
          data-testid="login-submit-btn"
          disabled={ submitButtonIsDisabled }
          onClick={ handleSubmit }
          type="submit"
        >
          Login
        </Styled.Submit>
      </Styled.Form>
    </Styled.Login>
  );
}

export default Login;
