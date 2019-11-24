import styled from 'styled-components';

const Main = styled.main`
	& {
		display: flex;
		flex-direction: row;

		height: ${({ theme }) => theme.exceptHeaderHeignt};
	}

	.Stretch-item {
		width: 100%;
	}
`;

export { Main };
