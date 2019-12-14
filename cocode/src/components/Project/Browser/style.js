import styled from 'styled-components';

const Frame = styled.div`
	& {
		position: relative;
	}
`;
const ErrorDisplay = styled.div`
	& {
		position: absolute;
		z-index: ${({ errorDescription }) => (errorDescription ? 1 : -1)};
		overflow-x: scroll;

		padding: 1rem;

		height: 100%;
		width: 100%;

		background-color: ${({ errorDescription }) =>
			errorDescription ? 'rgba(0, 0, 0, 0.7)' : 'transparent'};

		font-size: 2rem;
		font-weight: lighter;
	}
`;

const BrowserV2 = styled.iframe`
	& {
		position: absolute;

		height: 100%;
		width: 100%;

		background-color: white;
	}
`;

const LoadingOverlay = styled.section`
	& {
		position: fixed;
		top: 12vh;
		left: 0;
		z-index: 100;

		height: 100vh;
		width: 100vw;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		background-color: black;

		p {
			margin-top: 2rem;

			font-size: 3rem;
			font-weight: lighter;
		}
	}
`;

export { Frame, ErrorDisplay, BrowserV2, LoadingOverlay };
