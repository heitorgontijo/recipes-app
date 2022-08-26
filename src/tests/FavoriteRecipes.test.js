import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; 

import renderWithHistoryAndContext from './helpers/renderWithHistoryAndContext';

import FavoriteRecipes from '../pages/FavoriteRecipes';

jest.mock('clipboard-copy');

const mockStoreData = [
  {
      "id": "52977",
      "type": "food",
      "nationality": "Turkish",
      "category": "Side",
      "alcoholicOrNot": "",
      "name": "Corba",
      "image": "https://www.themealdb.com/images/media/meals/58oia61564916529.jpg",
      "doneDate": "26/08/2022",
      "tags": [
          "Soup"
      ]
  },
  {
      "id": "15997",
      "type": "drink",
      "nationality": "",
      "category": "Ordinary Drink",
      "alcoholicOrNot": "Optional alcohol",
      "name": "GG",
      "image": "https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg",
      "doneDate": "26/08/2022",
      "tags": []
  }
] 

describe('Testa o funcionamento do componente FavoriteRecipes', () => {
    it('Verifica se todos os elementos estão sendo renderizados na tela', () => {
        renderWithHistoryAndContext(<FavoriteRecipes />);
    
        expect(screen.getByTestId('filter-by-all-btn')).toBeInTheDocument();
        expect(screen.getByTestId('filter-by-food-btn')).toBeInTheDocument();
        expect(screen.getByTestId('filter-by-drink-btn')).toBeInTheDocument();
      });
      it('Verifica se todos os itens salvos no localStorage são exibidos na tela', () => {
        localStorage.setItem('favoriteRecipes', JSON.stringify(mockStoreData));
    
        renderWithHistoryAndContext(<FavoriteRecipes />);
    
        expect(screen.getByTestId('0-horizontal-image')).toBeInTheDocument();
        expect(screen.getByTestId('1-horizontal-image')).toBeInTheDocument();
        expect(screen.queryByTestId('2-horizontal-image')).not.toBeInTheDocument();
    
        expect(screen.getByTestId('0-horizontal-top-text')).toBeInTheDocument();
        expect(screen.getByTestId('1-horizontal-top-text')).toBeInTheDocument();
        expect(screen.queryByTestId('2-horizontal-top-text')).not.toBeInTheDocument();
    
        expect(screen.getByTestId('0-horizontal-name')).toBeInTheDocument();
        expect(screen.getByTestId('1-horizontal-name')).toBeInTheDocument();
        expect(screen.queryByTestId('2-horizontal-name')).not.toBeInTheDocument();
    
        expect(screen.getByTestId('0-horizontal-share-btn')).toBeInTheDocument();
        expect(screen.getByTestId('1-horizontal-share-btn')).toBeInTheDocument();
        expect(screen.queryByTestId('horizontal-share-btn')).not.toBeInTheDocument();
      });
      it('Verifica se o clique no título da receita a página é redirecionada '
    + '(Foods)', () => {
      const { history } = renderWithHistoryAndContext(<FavoriteRecipes/>);
      
      userEvent.click(screen.getByTestId('0-horizontal-name'));
      expect(history.location.pathname).toBe('/foods/52977')
  });

  it('Verifica se o clique na imagem da receita a página é redirecionada '
    + '(Drinks)', () => {
      const { history } = renderWithHistoryAndContext(<FavoriteRecipes/>);
      
      userEvent.click(screen.getByTestId('1-horizontal-image'));
      expect(history.location.pathname).toBe('/drinks/15997')
  });
  it('Verifica se ao clicar no botão "Foods" apenas as comidas são '
    + 'mostradas', () => {
      renderWithHistoryAndContext(<FavoriteRecipes />);

      userEvent.click(screen.getByTestId('filter-by-food-btn'));
      
      expect(screen.getByRole('heading', { name: /Corba/i }))
        .toBeInTheDocument();
      
      expect(screen.queryByRole('heading', { name: /GG/i }))
        .not.toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão "Drinks" apenas as bebidas são '
    + 'mostradas', () => {
      renderWithHistoryAndContext(<FavoriteRecipes />);

      userEvent.click(screen.getByTestId('filter-by-drink-btn'));
      
      expect(screen.getByRole('heading', { name: /GG/i }))
        .toBeInTheDocument();
      
      expect(screen.queryByRole('heading', { name: /Corba/i }))
        .not.toBeInTheDocument();
  });

  it('Verifica se o botão "All" restaura a visualização dos itens', () => {
    renderWithHistoryAndContext(<FavoriteRecipes />);

    userEvent.click(screen.getByTestId('filter-by-drink-btn'));

    expect(screen.queryByRole('heading', { name: /Corba/i }))
        .not.toBeInTheDocument();

    userEvent.click(screen.getByTestId('filter-by-all-btn'));

    expect(screen.getByRole('heading', { name: /Corba/i }))
      .toBeInTheDocument();

    expect(screen.getByRole('heading', { name: /GG/i }))
      .toBeInTheDocument();
  });

  it('Verifica se ao clicar no botão de compartilhar uma mensagem de link '
    + 'é exibida no documento', () => {
      renderWithHistoryAndContext(<FavoriteRecipes />);

      userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
      expect(screen.getByText('Link copied!')).toBeInTheDocument();
  });
  it('Verifica se ao clicar no coração o item é retirado do LocalStorage', () => {
    renderWithHistoryAndContext(<FavoriteRecipes />);
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(2)
    userEvent.click(screen.getByTestId('0-horizontal-favorite-btn'))
    expect(JSON.parse(localStorage.getItem('favoriteRecipes'))).toHaveLength(1)
  })
})