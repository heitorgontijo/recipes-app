import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../components/Footer';
import userEvent from '@testing-library/user-event';


import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';


describe('Teste do componente "Footer"', () => {
  it('Verifica se todos os elementos estão sendo renderizados', () => {
    renderWithHistoryAndContext(<Footer />);

    expect(screen.getByTestId('drinks-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('food-bottom-btn')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
  });
  it('Verifica rotas ao clicar no botão foods', () => {
    const { history } = renderWithHistoryAndContext(<Footer />);

    const drinkBtn = screen.getByTestId('drinks-bottom-btn')
    userEvent.click(drinkBtn)
    expect(history.location.pathname).toEqual('/drinks')

    const foodBtn = screen.getByTestId('food-bottom-btn')
    userEvent.click(foodBtn)
    expect(history.location.pathname).toEqual('/foods')
  });
});
