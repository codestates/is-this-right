import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;  
  }

  body {
    box-sizing: border-box;
    overflow-y: auto;
    -ms-overflow-style: none;
  }
  body::-webkit-scrollbar {
    display: none;
  }

`;

export default GlobalStyle;
