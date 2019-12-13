import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const ResetStyle = createGlobalStyle`
    
    html {
        background-color: white;
        color: black;
    }
    
    button {
        color: black;
    }
`;

const BuildStateOverlay = styled.div`
	& {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		overflow: scroll;

		width: 100%;
		height: 100%;

		background-color: black;
		color: white;

		p {
			margin: 1rem;

			font-size: 2rem;
			font-weight: lighter;
		}

		.Is-build-error {
			font-size: 1rem;
		}
	}
`;

export { ResetStyle, BuildStateOverlay };
