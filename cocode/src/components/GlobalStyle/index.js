import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    * {
        font-family: 'Source Sans Pro', sans-serif;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        outline: none;
        background: none;
    }
    
    html, body {
        height: 100%;
        width: 100%;
        font-size: 16px;
    }

    button {
        cursor: pointer;
    }
`;

export default GlobalStyle;
