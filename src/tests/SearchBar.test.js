import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';

import SearchBar from '../components/SearchBar';
import Header from '../components/Header';

describe('Teste do componente "SearchBar"', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({}),
    });

    global.alert = jest.fn();
  } )

  it('Verifica se todos os elementos estão sendo renderizados', () => {
    renderWithHistoryAndContext(<SearchBar />);

    expect(screen.getByTestId('ingredient-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('name-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('first-letter-search-radio')).toBeInTheDocument();
    expect(screen.getByTestId('exec-search-btn')).toBeInTheDocument();
  });

  it('Verifica se apenas um radio pode ser selecionado por vez', () => {
    renderWithHistoryAndContext(<SearchBar />);

    const ingredientFilter = screen.getByTestId('ingredient-filter');
    const nameFilter = screen.getByTestId('name-filter');
    const firstLetterFilter = screen.getByTestId('first-letter-filter');

    userEvent.click(ingredientFilter);
    expect(nameFilter.checked).toBe(false);
    expect(firstLetterFilter.checked).toBe(false);

    userEvent.click(nameFilter);
    expect(ingredientFilter.checked).toBe(false);
    expect(firstLetterFilter.checked).toBe(false);

    userEvent.click(firstLetterFilter);
    expect(ingredientFilter.checked).toBe(false);
    expect(nameFilter.checked).toBe(false);
  });

  it('Verifica se o fetch é chamado com o endpoint correto na página '
    + '"Foods"', async () => {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=myMeal';

      renderWithHistoryAndContext(<Header />, '/foods');

      userEvent.click(screen.getByTestId('search-top-btn'));
      userEvent.type(screen.getByTestId('search-input'), 'myMeal');
      userEvent.click(screen.getByTestId('name-search-radio'));
      userEvent.click(screen.getByTestId('exec-search-btn'));

      await waitFor(() => expect(fetch).toHaveBeenCalled());
      expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it('Verifica se o fetch é chamado com o endpoint correto na página '
    + '"Drinks"', async () => {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=d';

      renderWithHistoryAndContext(<Header />, '/drinks');

      userEvent.click(screen.getByTestId('search-top-btn'));
      userEvent.type(screen.getByTestId('search-input'), 'd');
      userEvent.click(screen.getByTestId('first-letter-search-radio'));
      userEvent.click(screen.getByTestId('exec-search-btn'));

      await waitFor(() => expect(fetch).toHaveBeenCalled());
      expect(fetch).toHaveBeenCalledWith(endpoint);
  });
});