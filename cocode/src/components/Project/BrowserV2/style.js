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

const BrowserV2 = styled.div`
	& {
		position: absolute;

		height: 100%;
		width: 100%;

		background-color: white;
		color: black;
	}
`;

export { Frame, ErrorDisplay, BrowserV2 };
