import { waitFor, screen } from '@testing-library/react';
import React from 'react';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';
import mealsMock from './mocks/mealsMock';
import userEvent from '@testing-library/user-event'


describe('Testa componente RecipeInProgress', () => {
    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mealsMock)
        })
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

})