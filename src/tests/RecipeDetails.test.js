import React from 'react';
import screen, { render } from '@testing-library/react'
import RecipeDetails from '../pages/RecipeDetails';
import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';
import mealsMock from './mocks/mealsMock';

describe('Testa funcionamento do componente Recipe Details', () => {

    beforeEach(() => {
        global.fetch = jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue(mealsMock)
        })
    })
    it('Verifica se a Api de detalhes  chamada', () => {
        renderWithHistoryAndContext(<RecipeDetails/>, 'foods/52977');

        expect(fetch).toHaveBeenCalledTimes(2)
    })
})