import styled from 'styled-components';

const LoadingDisplay = styled.div`
	& {
		position: absolute;
		z-index: 1;

		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		height: 100%;
		width: 100%;

		background-color: rgba(0, 0, 0, 0.7);
	}
`;

const LoadingPhrase = styled.p`
	& {
		margin-top: 2rem;

		font-size: 3rem;
		font-weight: 200;
	}
`;

export { LoadingDisplay, LoadingPhrase };
