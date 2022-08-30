import React from 'react';
import { ThemeProvider } from 'styled-components';

import Routes from './Routes';
import GlobalStyles from './global.styles';
import * as themes from './themes';

function App() {
  return (
    <ThemeProvider theme={ themes.light }>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
