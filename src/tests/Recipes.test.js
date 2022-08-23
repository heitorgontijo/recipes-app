import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';
import mealsMock from './mocks/mealsMock';
import drinksMock from './mocks/drinksMock';
import drinkCategoriesMock from './mocks/drinkCategoriesMock';

import Recipes from '../components/Recipes';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';

describe('Teste do componente "Recipes"', () => {
  beforeEach(() => {
    global.alert = jest.fn();
  });

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

  it(
    'Verifica se na página "Foods" o número de receitas é exatamente ' +
      'igual ao retornado pela API',
    async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(mealsMock),
      });

      renderWithHistoryAndContext(<Recipes />, '/foods');
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('2-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('3-recipe-card')).toBeInTheDocument();
    }
  );

  it(
    'Verifica se na página "Drinks" o número de receitas é exatamente ' +
      'igual ao retornado pela API',
    async () => {
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinksMock),
      });

      renderWithHistoryAndContext(<Recipes />, '/drinks');
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(screen.getByTestId('0-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('1-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('2-recipe-card')).toBeInTheDocument();
      expect(screen.getByTestId('3-recipe-card')).toBeInTheDocument();
    }
  );

  it(
    'Verifica se a página é redirecionada ao retornar apenas um ' +
      'resultado à partir da barra de pesquisa',
    async () => {
      global.fetch = jest.fn().mockResolvedValue();

      const { history } = renderWithHistoryAndContext(<Foods />, '/foods');
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(history.location.pathname).toBe('/foods');

      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({ meals: [mealsMock.meals[0]] }),
      });

      userEvent.click(screen.getByTestId('search-top-btn'));
      userEvent.click(screen.getByTestId('exec-search-btn'));

      await waitFor(() => expect(fetch).toHaveBeenCalled());
      expect(history.location.pathname).toBe('/foods/52977');
    }
  );

  /* it(
    'Verifica se a página não é redirecionada se a API retornar apenas ' +
      'um resultado à partir da seção de categorias',
    async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue(drinkCategoriesMock),
        })
        .mockResolvedValue({
          json: jest.fn().mockResolvedValue({ drinks: [drinksMock.drinks[0]] }),
        });

      const { history } = renderWithHistoryAndContext(<Drinks />, '/drinks');
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(history.location.pathname).toBe('/drinks');

      userEvent.click(screen.getByTestId('Shake-category-filter'));

      await waitFor(() => expect(fetch).toHaveBeenCalled());
      expect(history.location.pathname).toBe('/drinks');
    }
  ); */
});
