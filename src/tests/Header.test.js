import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';

import Header from '../components/Header';

describe('Teste do componente "Header"', () => {
  it('Verifica se todos os elementos estão sendo renderizados', () => {
    renderWithHistoryAndContext(<Header />, '/foods');

    expect(screen.getByTestId('page-title')).toBeInTheDocument();
    expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
    expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
  });

  it('Verifica se o botão de pesquisa está presente no documento '
    + 'somente se o botão de busca for clicado', () => {
      renderWithHistoryAndContext(<Header />, '/foods');

      expect(screen.queryByTestId('search-input')).not.toBeInTheDocument();

      userEvent.click(screen.getByTestId('search-top-btn'));
      expect(screen.queryByTestId('search-input')).toBeInTheDocument();
  });

  it('Verifica se o botão de perfil redireciona para a página de perfil', () => {
    const { history } = renderWithHistoryAndContext(<Header />, '/foods');

    userEvent.click(screen.getByTestId('profile-top-btn'));
    expect(history.location.pathname).toEqual('/profile');
  });

  it('Verifica se o botão de busca não é exibido na página de perfil', () => {
    renderWithHistoryAndContext(<Header />, '/profile');
    expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('Verifica se o botão de busca não é exibido na página de receitas '
    + 'concluídas', () => {
      renderWithHistoryAndContext(<Header />, '/done-recipes');
      expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });

  it('Verifica se o botão de busca não é exibido na página de receitas '
    + 'favoritas', () => {
      renderWithHistoryAndContext(<Header />, '/favorite-recipes');
      expect(screen.queryByTestId('search-top-btn')).not.toBeInTheDocument();
  });
});
