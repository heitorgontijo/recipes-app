import React from 'react';
import { screen, waitFor } from '@testing-library/react';

import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';
import mealsMock from './mocks/mealsMock';
import drinksMock from './mocks/drinksMock';

import Recipes from '../components/Recipes';


describe('Teste do componente "Recipes"', () => {
  beforeEach(() => {
    global.alert = jest.fn();
  })

  it('Verifica se o fetch é chamado ao renderizar na rota "/foods"', async () => {
    global.fetch = jest.fn();

    renderWithHistoryAndContext(<Recipes />, '/foods');
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it('Verifica se o fetch é chamado ao renderizar na rota "/drinks"', async () => {
    global.fetch = jest.fn();

    renderWithHistoryAndContext(<Recipes />, '/drinks');
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it('Verifica se na página "Foods" o número de receitas é exatamente '
    + 'igual ao retornado pela API', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mealsMock),
      });

      renderWithHistoryAndContext(<Recipes />, '/foods');
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('2-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('3-recipe-card')).toBeInTheDocument(); 
  });

  it('Verifica se na página "Drinks" o número de receitas é exatamente '
    + 'igual ao retornado pela API', async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinksMock),
      });

      renderWithHistoryAndContext(<Recipes />, '/drinks');
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('2-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('3-recipe-card')).toBeInTheDocument(); 
  });
});

/* 

global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsMock),
    });

*/
