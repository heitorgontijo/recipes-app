import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';

import Profile from '../pages/Profile';

describe('Teste do componente "Profile"', () => {
  it('Verifica se todos os elementos estão sendo renderizados', () => {
    renderWithHistoryAndContext(<Profile />);

    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-done-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-logout-btn')).toBeInTheDocument();
  });

  it('Verifica se ao pressionar o botão de done a página é redirecionada', () => {
    const { history } = renderWithHistoryAndContext(<Profile />);

    userEvent.click(screen.getByTestId('profile-done-btn'));
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Verifica se ao pressionar o botão de done a página é redirecionada', () => {
    const { history } = renderWithHistoryAndContext(<Profile />);

    userEvent.click(screen.getByTestId('profile-favorite-btn'));
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Verifica se ao pressionar o botão de done a página é redirecionada', () => {
    const { history } = renderWithHistoryAndContext(<Profile />);

    userEvent.click(screen.getByTestId('profile-logout-btn'));
    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se o e-mail do usuário é exibido na tela', () => {
    localStorage.setItem('user', JSON.stringify({ email: 'test@chumbinho.com' }));
    renderWithHistoryAndContext(<Profile />);

    expect(screen.getByText('test@chumbinho.com')).toBeInTheDocument();
  });
});
