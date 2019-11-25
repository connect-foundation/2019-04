import styled from 'styled-components';

const Title = styled.h2`
	color: ${({ theme }) => theme.textColor};
	font-size: 2.5rem;
	font-weight: 300;
	padding-left: 1.5rem;
`;

const CoconutCount = styled.span`
	color: ${({ theme }) => theme.mainColor};
	padding: 1rem;
`;

const CardList = styled.ul`
	display: flex;
	flex-flow: row wrap;
	align-content: flex-start;

	width: 95vw;
	list-style: none;
	padding: 0;

	& > {
		flex: 1;
	}
`;

const CardItem = styled.li`
	margin: 1.5rem;
`;

export { Title, CoconutCount, CardList, CardItem };
