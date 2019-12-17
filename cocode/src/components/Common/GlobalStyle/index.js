import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
    ::-webkit-scrollbar {
        width: 10px;
        height: 5px;
    }
    
    ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
    ::-webkit-scrollbar-thumb {
        background-color: #2d2d2d;
        border-radius: 5px;
    }
    
    ::-webkit-scrollbar-thumb:hover {
        background: #4A4A4A;
    }
    
    ::-webkit-scrollbar-button:horizontal:decrement,
    ::-webkit-scrollbar-button:horizontal:increment {
        width: 0px;
        height: 0px;
    }
    
    ::-webkit-scrollbar-corner {
        background-color: transparent;
    }
    
    * {
        font-family: 'Source Sans Pro', sans-serif;
        text-decoration: none;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        border: 0;
        outline: none;
        background: none;
        scroll-behavior: smooth;
    }
    
    html {
        background-color: ${({ theme }) => theme.backgroundColor};
        color: ${({ theme }) => theme.textColor};
    }
    
    html, body {
        height: 100%;
        width: 100%;
        font-size: 16px;
    }
    
    body {
        overflow: hidden;
    }
    
    #root {
        height: 100%;
    }
    
    button {
        cursor: pointer;
        color: ${({ theme }) => theme.textColor};
    }

    a, a:visited, a:active {
		color: ${({ theme }) => theme.textColor};
		cursor: pointer;
	}

	a:hover {
		color: ${({ theme }) => theme.mainColor};
	}
	
	img {
		-webkit-user-drag: none;
	}
	
	div, span{
		user-select: none;
	}
`;

export default GlobalStyle;
