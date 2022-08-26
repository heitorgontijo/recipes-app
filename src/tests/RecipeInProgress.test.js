import React from 'react';
import { waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';

import mealsMock from './mocks/mealsMock';
import drinksMock from './mocks/drinksMock';

import RecipeInProgress from '../pages/RecipeInProgress';

jest.mock('clipboard-copy');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ id: '52977' }),
}));

describe('Testa componente RecipeInProgress', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealsMock),
    });

    localStorage.clear();
  });

  it('Verifica se a API é chamada', async () => {
    renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalled());
  });

  it('Verifica se os elementos estão sendo renderizados corretamente (Foods)', async () => {
    renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
    expect(screen.getByTestId('share-btn')).toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de favoritar a receita é adicionada '
    + 'no localStorage (Foods)', async () => {
      renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
      await waitFor(() => expect(fetch).toHaveBeenCalled());

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
      expect(storedFavorites[0].image).toBe(
        'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg'
      );
    }
  );

  it('Verifica se ao clicar no botão de favoritar a receita é adicionada '
    + 'no localStorage (Drinks)', async () => {
      global.fetch = jest
        .fn()
        .mockResolvedValueOnce({
          json: jest.fn().mockResolvedValue(drinksMock),
        })
        .mockResolvedValue({ json: jest.fn().mockResolvedValue(mealsMock) });

      renderWithHistoryAndContext(<RecipeInProgress />, 'drinks/15997/in-progress');
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toEqual([]);
      expect(screen.getByAltText('coração vazio')).toBeInTheDocument();

      userEvent.click(screen.getByTestId('favorite-btn'));
      const storedFavorites = JSON.parse(
        localStorage.getItem('favoriteRecipes')
      );
      expect(screen.getByAltText('coração preenchido')).toBeInTheDocument();

      expect(storedFavorites).toHaveLength(1);
      expect(storedFavorites[0].type).toBe('drink');
      expect(storedFavorites[0].nationality).toBe('');
      expect(storedFavorites[0].category).toBe('Ordinary Drink');
      expect(storedFavorites[0].alcoholicOrNot).toBe('Optional alcohol');
      expect(storedFavorites[0].name).toBe('GG');
      expect(storedFavorites[0].image).toBe(
        'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg'
      );
    }
  );

  it('Verifica se todos os checkboxes podem ser habilitados', async () => {
    renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalled());
    
    const allCheckbox = screen.getAllByRole('checkbox');
    const finishButton = screen.getByTestId('finish-recipe-btn');
  
    expect(finishButton).toBeDisabled();

    allCheckbox.forEach((checkbox) => userEvent.click(checkbox));
    allCheckbox.forEach((checkbox) => expect(checkbox.checked).toBeTruthy());

    expect(finishButton).toBeEnabled();
  });

  it('Verifica funcionamento dos checkbox desabilitados', async () => {
    renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const allCheckbox = screen.getAllByRole('checkbox');
  
    userEvent.click(allCheckbox[0]);
    expect(allCheckbox[0].checked).toBeTruthy();

    userEvent.click(allCheckbox[0]);
    expect(allCheckbox[0].checked).toBeFalsy();
  });

  it('Verifica se ao clicar no botão de compartilhar uma mensagem de link '
    + 'é exibida no documento', async () => {
      renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      userEvent.click(screen.getByTestId('share-btn'));
      expect(screen.getByText('Link copied!')).toBeInTheDocument();
    }
  );

  it('Testa redirecionamento para o componente Done Recipe', async () => {
    const { history } = renderWithHistoryAndContext(
      <RecipeInProgress />,
      'foods/52977/in-progress',
    );

    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const allCheckbox = screen.getAllByRole('checkbox');
    const finishButton = screen.getByTestId('finish-recipe-btn');

    allCheckbox.forEach((checkbox) => userEvent.click(checkbox));
    userEvent.click(finishButton);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Verifica se o botão de favoritar está colorido quando a receita é '
    + 'favorita', async() => {    
      jest.mock('react-router-dom', () => ({
        ...jest.requireActual('react-router-dom'),
        useParams: () => ({ id: '52977' }),
      }));

      localStorage.setItem('favoriteRecipes', JSON.stringify([{ id: '52977' }]));
      localStorage.removeItem('inProgressRecipes');

      renderWithHistoryAndContext(<RecipeInProgress />, '/foods/52977/in-progress');
      await waitFor(() => expect(fetch).toHaveBeenCalled());

      expect(screen.getByAltText('coração preenchido')).toBeInTheDocument();
  });

  it('Verifica se o item é adicionado ao localStorage quando finalizado (Foods)', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({ id: '52977' }),
    }));

    renderWithHistoryAndContext(<RecipeInProgress />, '/foods/52977/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toEqual([]);

    const allCheckbox = screen.getAllByRole('checkbox');
    const finishButton = screen.getByTestId('finish-recipe-btn');

    localStorage.removeItem('doneRecipes');

    allCheckbox.forEach((checkbox) => userEvent.click(checkbox));
    userEvent.click(finishButton);

    const done = JSON.parse(localStorage.getItem('doneRecipes'));

    expect(done[0].id).toBe('52977');
    expect(done[0].type).toBe('food');
    expect(done[0].nationality).toBe('Turkish');
    expect(done[0].category).toBe('Side');
    expect(done[0].name).toBe('Corba');
  });

  it('Verifica se o item é adicionado ao localStorage quando finalizado (Drinks)', async () => {
    jest.mock('react-router-dom', () => ({
      ...jest.requireActual('react-router-dom'),
      useParams: () => ({ id: '52977' }),
    }));

    global.fetch = jest
      .fn()
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(drinksMock),
      });

    renderWithHistoryAndContext(<RecipeInProgress />, 'drinks/15997/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    expect(JSON.parse(localStorage.getItem('doneRecipes'))).toEqual([]);

    const allCheckbox = screen.getAllByRole('checkbox');
    const finishButton = screen.getByTestId('finish-recipe-btn');

    localStorage.removeItem('doneRecipes');

    allCheckbox.forEach((checkbox) => userEvent.click(checkbox));
    userEvent.click(finishButton);

    const done = JSON.parse(localStorage.getItem('doneRecipes'));

    expect(done[0].type).toBe('drink');
    expect(done[0].nationality).toBe('');
    expect(done[0].category).toBe('Ordinary Drink');
    expect(done[0].name).toBe('GG');
  });
});
