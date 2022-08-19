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
    it('Verifica se todos os elementos estão sendo renderizados', () => {
      renderWithHistory(<Header />);
  
      expect(screen.queryByTestId("search-input")).not.toBeInTheDocument();
      userEvent.click(screen.getByTestId('search-top-btn'));
      expect(screen.queryByTestId("search-input")).toBeInTheDocument();
    })
    it('verifica redirect btn profile' , () => {
      const { history} = renderWithHistory(<Header />);

      userEvent.click(screen.getByTestId('profile-top-btn'));
      expect(history.location.pathname).toEqual('/profile');  
    })
});