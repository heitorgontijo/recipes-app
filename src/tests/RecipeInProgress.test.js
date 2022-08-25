import { waitFor, screen } from '@testing-library/react';
import React from 'react';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';
import mealsMock from './mocks/mealsMock';
import userEvent from '@testing-library/user-event'
import drinksMock from './mocks/drinksMock';
import { object } from 'prop-types';

jest.mock('clipboard-copy');


describe('Testa componente RecipeInProgress', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mealsMock)
        })
        localStorage.clear()
    })
    it('Testa se Api é chamada', () => {
        renderWithHistoryAndContext(<RecipeInProgress/>, 'foods/52977/in-progress');

        expect(fetch).toHaveBeenCalledTimes(1)
    })
    it('Verifica se os elementos estão sendo renderizados corretamente (Foods)', async () => {
        renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        
        expect(screen.getByTestId('favorite-btn')).toBeInTheDocument();
        expect(screen.getByTestId('share-btn')).toBeInTheDocument();
    })
    it('Verifica se ao clicar no botão de favoritar a receita é adicionada '
    + 'no localStorage (Foods)', async () => {
      renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
      await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toBe(null);
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

        renderWithHistoryAndContext(<RecipeInProgress />, 'drinks/15997/in-progress');
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
      

      expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toBe(null);
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
  it('Verifica funcionamento dos checkbox', async () => {
    renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const checkbox = screen.getAllByRole('checkbox')
    const button = screen.getByTestId('finish-recipe-btn')
    expect(button).toBeDisabled()

    checkbox.forEach((i) => {
        userEvent.click(i)
    })
    checkbox.forEach((i) => {
        expect(i.checked).toBeTruthy()
    })
    expect(button).toBeEnabled()
})


it('Verifica funcionamento dos checkbox desabilitados', async () => {
    renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const checkbox = screen.getAllByRole('checkbox')
    userEvent.click(checkbox[0])
    expect(checkbox[0].checked).toBeTruthy()
    userEvent.click(checkbox[0])
    expect(checkbox[0].checked).toBeFalsy()
})

it('Verifica se ao clicar no botão de compartilhar uma mensagem de link '
+ 'é exibida no documento', async () => {
  renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
  await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

  userEvent.click(screen.getByTestId('share-btn'));
  expect(screen.getByText('Link copied!')).toBeInTheDocument();
});
it('Testa redirecionamento para o componente Done Recipe', async () => {
   const {history} = renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    const checkbox = screen.getAllByRole('checkbox')
    const button = screen.getByTestId('finish-recipe-btn')
    

    checkbox.forEach((i) => {
        userEvent.click(i)
    })
    expect(button).toBeEnabled()
    userEvent.click(button)

    expect(history.location.pathname).toBe('/done-recipes')
} )
// it('Testa se as chaves estão corretas no localStorage', async () => {
//     renderWithHistoryAndContext(<RecipeInProgress />, 'foods/52977/in-progress');
//     await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));

//     const progress = Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')))[0]
//     const progress2 = Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes')))[1]
//     const mainLocalStorageKey = Object.keys(localStorage)[0]
//     expect(mainLocalStorageKey).toBe('inProgressRecipes')
//     expect(progress).toBe('cocktails')
//     expect(progress2).toBe('meals')
//     expect(typeof JSON.parse(localStorage.getItem('inProgressRecipes')).cocktails).toBe('object')
//     expect(typeof JSON.parse(localStorage.getItem('inProgressRecipes')).meals).toBe('object')
//     // expect(JSON.parse(localStorage.getItem('meals')))
//     // expect(progress2).
//     // expect(progress).toHaveValue({})
// })


})