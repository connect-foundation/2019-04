import styled from 'styled-components';

const BuildStateOverlay = styled.div`
	& {
		position: fixed;
		top: 0;
		left: 0;

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

export { BuildStateOverlay };
