import React from 'react';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import renderWithHistory from './renderWithHistory';

import AppProvider from '../../context/AppProvider';

export default (component, route='/') => {
  return renderWithHistory(
    <AppProvider>{component}</AppProvider>, route,
  );
};
