import styled from 'styled-components';

const Main = styled.main`
	height: 88vh;
	padding: 3rem;
`;

const Title = styled.h2`
	color: ${({ theme }) => theme.textColor};
	font-size: 2.5rem;
	font-weight: 300;
	padding-left: 3.5rem;
	padding-bottom: 1rem;
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
		height: 80%;
		width: 100%;
		padding-bottom: 3rem;
		overflow: auto;
	}
	& > * {
		margin: 3rem;
	}
`;

export { Main, Title, CoconutCount, CardList };
