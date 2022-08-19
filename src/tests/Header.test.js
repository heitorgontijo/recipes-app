import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithHistory from './helpers/renderWithHistory';

import Header from '../component/Header';

describe('Teste do componente "Header"', () => {
    it('Verifica se todos os elementos estão sendo renderizados', () => {
      renderWithHistory(<Header />);
  
      expect(screen.getByTestId('page-title')).toBeInTheDocument();
      expect(screen.getByTestId('profile-top-btn')).toBeInTheDocument();
      expect(screen.getByTestId('search-top-btn')).toBeInTheDocument();
    })
});