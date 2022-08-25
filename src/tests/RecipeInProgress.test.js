import React from 'react';
import RecipeInProgress from '../pages/RecipeInProgress';
import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';
import mealsMock from './mocks/mealsMock';

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
})