import React from 'react';

import renderWithHistory from './renderWithHistory';

import AppProvider from '../../context/AppProvider';

export default (component, route='/') => {
  return renderWithHistory(
    <AppProvider>{component}</AppProvider>, route,
  );
};
