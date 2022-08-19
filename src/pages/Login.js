import React, { useState, useEffect } from 'react';

function Login() {
  const [formData, setFormData] = useState(
    {
      email: '',
      password: '',
      isBtnDisabled: true,
    },
  );

  useEffect(() => {
    const { email, password } = formData;
    const MIN_PASSWORD_SIZE = 6;

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    const isValidPassword = password.length > MIN_PASSWORD_SIZE;
    console.log(isValidPassword);
    setFormData((prevState) => ({ ...prevState,
      isBtnDisabled: !(isValidEmail && isValidPassword) }));
  }, [formData.email, formData.password]);

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prevState) => ({ ...prevState, [name]: value }));

    // const CHARACTER_PASSWORD = 6;
    // const checkPass = password.length < CHARACTER_PASSWORD;
    // const checkEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    // // fonte: https://stackoverflow.com/questions/940577/javascript-regular-expression-email-validation
    // const check = !checkEmail.test(email) && checkPass;
    // setFormData({ isBtnDisabled: !check });
  };

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
      >
        Enter

      </button>
    </>
  );
}

export default Login;
