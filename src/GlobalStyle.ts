import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

  *{
    padding: 0;
    margin: 0;
    text-decoration: none;
    list-style: none;
  }

  body, body > div#root{
    min-height: 100vh;
    height: 100%;
    font-family: 'Roboto', Arial, sans-serif;
  }

  a{
    color: black;
  }

  button{
    cursor: pointer;
  }
`;
