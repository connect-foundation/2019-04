import styled from 'styled-components';

const Main = styled.main`
	& {
		display: flex;
		flex-direction: row;

		height: 91vh;

		.Project-main-stretch {
			flex-grow: 2;
		}
	}
`;

export { Main };
