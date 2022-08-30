import { createGlobalStyle } from 'styled-components';

import OpenSans from './assets/fonts/OpenSans.ttf';

const GlobalStyles = createGlobalStyle`
  * {
    border: 0;
    box-sizing: border-box;
    margin: 0;
    outline: none;
    padding: 0;
  }

  :root {
    font-size: 14px;
  }

  ::-webkit-scrollbar {
    background-color: ${({ theme }) => theme.tertiary};
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.theme};
    border-radius: 5px;
  }

  @font-face {
    font-family: 'RecipeAppFont';
    src: local('RecipeAppFont'), url(${OpenSans}) format('truetype');
  }

  body {
    background-color: #F1F8E9;
    color: ${({ theme }) => theme.fontColor};
    font-family: RecipeAppFont;
    max-height: 640px;
    max-width: 400px;
  }

  button {
    cursor: pointer;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

export default GlobalStyles;
