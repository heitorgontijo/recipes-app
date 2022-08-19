import React from 'react';

function Login() {
  return (
    <>
      <input type="email" data-testid="email-input" />
      <input type="password" data-testid="password-input" />
      <button type="button" data-testid="login-submit-btn">Enter</button>
    </>
  );
}

export default Login;
