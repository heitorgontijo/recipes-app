import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

jest.mock('clipboard-copy');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '52977' }),
}));

import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';
import mealsMock from './mocks/mealsMock';
import drinksMock from './mocks/drinksMock';

import RecipeDetails from '../pages/RecipeDetails';

describe('Testa funcionamento do componente Recipe Details', () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(mealsMock) })
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(drinksMock) });
    
    localStorage.clear();
  });

  it('Verifica se a Api de detalhes  chamada', async () => {
    renderWithHistoryAndContext(<RecipeDetails />, '/foods/52977');
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
  });

  it('Verifica se os elementos estão sendo renderizados corretamente (Foods)', async () => {
    renderWithHistoryAndContext(<RecipeDetails />, 'foods/52977');
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.getByTestId('video')).toBeInTheDocument();
    expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('1-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('2-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('3-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
  });

  it('Verifica se os elementos estão sendo renderizados corretamente (Drinks)', async () => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(drinksMock) })
      .mockResolvedValue({ json: jest.fn().mockResolvedValue(mealsMock) });
  
    renderWithHistoryAndContext(<RecipeDetails />, 'drinks/15997');
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-photo')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-title')).toBeInTheDocument();
    expect(screen.getByTestId('recipe-category')).toBeInTheDocument();
    expect(screen.getByTestId('instructions')).toBeInTheDocument();
    expect(screen.queryByTestId('video')).not.toBeInTheDocument();
    expect(screen.getByTestId('0-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('1-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('2-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('3-recomendation-card')).toBeInTheDocument();
    expect(screen.getByTestId('start-recipe-btn')).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de iniciar receita a página é '
    + 'redirecionada para a página de progresso (Foods)', async () => {
      const { history } = renderWithHistoryAndContext(<RecipeDetails />, '/foods/52977');
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
      
      expect(history.location.pathname).not.toMatch(/\/in-progress/);
      userEvent.click(screen.getByTestId('start-recipe-btn'));
      expect(history.location.pathname).toMatch(/\/in-progress/);
  });

  it('Verifica se ao clicar no botão de iniciar receita a página é '
    + 'redirecionada para a página de progresso (Drinks)', async () => {
      global.fetch = jest.fn()
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(drinksMock) })
        .mockResolvedValue({ json: jest.fn().mockResolvedValue(mealsMock) });
  
      const { history } = renderWithHistoryAndContext(<RecipeDetails />, 'drinks/15997');
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
      
      expect(history.location.pathname).not.toMatch(/\/in-progress/);
      userEvent.click(screen.getByTestId('start-recipe-btn'));
      expect(history.location.pathname).toMatch(/\/in-progress/);
  });

  it('Verifica se ao clicar no botão de favoritar a receita é adicionada '
    + 'no localStorage (Foods)', async () => {
      renderWithHistoryAndContext(<RecipeDetails />, '/foods/52977');
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([]);
      expect(screen.getByAltText('coração vazio')).toBeInTheDocument();

      userEvent.click(screen.getByTestId('favorite-btn'));
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(screen.getByAltText('coração preenchido')).toBeInTheDocument();

      expect(storedFavorites).toHaveLength(1);
      expect(storedFavorites[0].type).toBe('food');
      expect(storedFavorites[0].nationality).toBe('Turkish');
      expect(storedFavorites[0].category).toBe('Side');
      expect(storedFavorites[0].alcoholicOrNot).toBe('');
      expect(storedFavorites[0].name).toBe('Corba');
      expect(storedFavorites[0].image)
        .toBe('https://www.themealdb.com/images/media/meals/58oia61564916529.jpg');
  });

  it('Verifica se ao clicar no botão de favoritar a receita é adicionada '
    + 'no localStorage (Drinks)', async () => {
      global.fetch = jest.fn()
        .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(drinksMock) })
        .mockResolvedValue({ json: jest.fn().mockResolvedValue(mealsMock) });

      renderWithHistoryAndContext(<RecipeDetails />, '/drinks/15997');
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([]);
      expect(screen.getByAltText('coração vazio')).toBeInTheDocument();

      userEvent.click(screen.getByTestId('favorite-btn'));
      const storedFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
      expect(screen.getByAltText('coração preenchido')).toBeInTheDocument();

      expect(storedFavorites).toHaveLength(1);
      expect(storedFavorites[0].type).toBe('drink');
      expect(storedFavorites[0].nationality).toBe('');
      expect(storedFavorites[0].category).toBe('Ordinary Drink');
      expect(storedFavorites[0].alcoholicOrNot).toBe('Optional alcohol');
      expect(storedFavorites[0].name).toBe('GG');
      expect(storedFavorites[0].image)
        .toBe('https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg');
  });

  it('Verifica se ao clicar no botão de desfavoritar a receita é '
    + 'removida do localStorage', async () => {
      renderWithHistoryAndContext(<RecipeDetails />, '/foods/52977');
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

      const getStoredData = () => JSON.parse(localStorage.getItem('favoriteRecipes'));

      userEvent.click(screen.getByTestId('favorite-btn'));
      expect(getStoredData()).toHaveLength(1);
      userEvent.click(screen.getByTestId('favorite-btn'));
      expect(getStoredData()).toHaveLength(0);
      userEvent.click(screen.getByTestId('favorite-btn'));
      expect(getStoredData()).toHaveLength(1);
      userEvent.click(screen.getByTestId('favorite-btn'));
      expect(getStoredData()).toHaveLength(0);
  });

  it('Verifica se ao clicar no botão de compartilhar uma mensagem de link '
    + 'é exibida no documento', async () => {
      renderWithHistoryAndContext(<RecipeDetails />, '/foods/52977');
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

      userEvent.click(screen.getByTestId('share-btn'));
      expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });

  it('Verifica se o botão de favoritar está colorido quando a receita é '
    + 'favorita', async() => {    
      localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '52977' }]));
      
      renderWithHistoryAndContext(<RecipeDetails />, '/foods/52977');
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

      expect(screen.getByAltText('coração preenchido')).toBeInTheDocument();
  });
});
