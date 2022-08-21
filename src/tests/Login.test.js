import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithHistory from './helpers/renderWithHistory';

import Login from '../pages/Login';

describe('Teste do componente "Login"', () => {
  it('Verifica se todos os elementos estão sendo renderizados', () => {
    renderWithHistory(<Login />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('show-password')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeDisabled();
  });

  it('Verifica se o botão de submit é ativado somente quando os '
    + 'dados são válidos', () => {
      renderWithHistory(<Login />);

      const emailInput = screen.getByTestId('email-input');
      const passwordInput = screen.getByTestId('password-input');
      const submitButton = screen.getByTestId('login-submit-btn');

      userEvent.type(emailInput, 'emailInvalido.com');
      userEvent.type(passwordInput, 'senhaValida');

      expect(submitButton).toBeDisabled();

      emailInput.value = '';
      userEvent.type(emailInput, 'test@test.com');

      expect(submitButton).toBeEnabled();
  });

  it('Verifica se ao clicar no botão de submit a rota é alterada para '
    + 'a página de "Foods"', () => {
      const { history } = renderWithHistory(<Login />);

      expect(history.location.pathname).toBe('/');

      userEvent.type(screen.getByTestId('email-input'), 'test@test.com');
      userEvent.type(screen.getByTestId('password-input'), 'senhaValida');
      userEvent.click(screen.getByTestId('login-submit-btn'));

      expect(history.location.pathname).toBe('/foods');
  });

  it('Verifica se o tipo de input muda quando o botão de mostrar senha '
    + 'for clicado', () => {
      renderWithHistory(<Login />);

      const passwordInput = screen.getByTestId('password-input');
      expect(passwordInput.type).toBe('password');

      userEvent.click(screen.getByTestId('show-password'));
      expect(passwordInput.type).toBe('text');
  });
});
