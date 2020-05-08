import { createGlobalStyle } from 'styled-components';
import { rootBackgroundColor, fontFamily } from 'app/utils/styled-components.utils';

const GlobalStyle = createGlobalStyle`
  html {
    height: 100%;
  }

  body {
    height: 100%;
    background-color: ${rootBackgroundColor};
    font-family: ${fontFamily}
  }

  #root {
    height: 100%;
  }

  ::-webkit-scrollbar {
      width: 5px;
  }
  
  ::-webkit-scrollbar-track {
    opacity: none;
  }
  
  ::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: #bbbbbb;
  }
`;

export default GlobalStyle;
