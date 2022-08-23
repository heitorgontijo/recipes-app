import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import renderWithHistory from './helpers/renderWithHistory';

import RecipeCard from '../components/RecipeCard';

const props = {
  title: 'Receita de Teste',
  category: 'categoria-de-teste',
  image: 'imagem-de-teste',
  index: 4,
  to: '/alguma-rota',
};

describe('Teste do componente "RecipeCard"', () => {
  it('Verifica se as informações passadas estão presentes do card '
    + 'de receita', () => {
      renderWithHistory(<RecipeCard { ...props } />);

      const image = screen.getByTestId('4-card-img')

      expect(screen.getByTestId('4-recipe-card')).toBeInTheDocument();
      expect(screen.getByText(/receita de teste/i)).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(image.src).toContain('imagem-de-teste');
      expect(screen.getByText(/categoria-de-teste/i)).toBeInTheDocument();
  });

  it('Verifica se ao clicar no card a rota é alterada', () => {
    const { history } = renderWithHistory(<RecipeCard { ...props } />);
    
    userEvent.click(screen.getByRole('link'));
    expect(history.location.pathname).toBe('/alguma-rota');
  });
});
