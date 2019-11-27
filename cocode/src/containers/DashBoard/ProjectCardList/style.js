import styled from 'styled-components';

const Main = styled.main`
	padding: 3rem;
`;

const Title = styled.h2`
	color: ${({ theme }) => theme.textColor};
	font-size: 2.5rem;
	font-weight: 300;
	padding-left: 3.5rem;
`;

const CoconutCount = styled.span`
	color: ${({ theme }) => theme.mainColor};
	padding: 1rem;
`;

const CardList = styled.section`
	& {
		display: flex;
		flex-flow: row wrap;
		align-content: flex-start;
		justify-content: flex-start;

		width: 100vw;
		padding: 0;
	}
	& > * {
		margin: 3.5rem;
	}
`;

export { Main, Title, CoconutCount, CardList };
