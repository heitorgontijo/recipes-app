import React from 'react';
import { render, screen } from '@testing-library/react';

import RecipeCard from '../components/RecipeCard';

const props = {
  title: 'Receita de Teste',
  category: 'categoria-de-teste',
  image: 'imagem-de-teste',
  index: 4,
};

describe('Teste do componente "RecipeCard"', () => {
  it('Verifica se as informações passadas estão presentes do card '
    + 'de receita', () => {
      render(<RecipeCard { ...props } />);

      const image = screen.getByTestId('4-card-img')

      expect(screen.getByTestId('4-recipe-card')).toBeInTheDocument();
      expect(screen.getByText(/receita de teste/i)).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(image.src).toContain('imagem-de-teste');
      expect(screen.getByText(/categoria-de-teste/i)).toBeInTheDocument();
  });
});
