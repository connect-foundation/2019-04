import styled from 'styled-components';

const Editor = styled.section`
	& {
		display: flex;
		flex-direction: column;

		/* temp width */
		width: 30rem;
	}

	.Stretch-width {
		flex-grow: 2;
	}
`;

export { Editor };
