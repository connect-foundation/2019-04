import styled from 'styled-components';

const CardList = styled.ul`
	display: flex;
	flex-flow: row wrap;
	align-content: flex-start;

	width: 95vw;
	list-style: none;

	& > {
		flex: 1;
	}
`;

const CardItem = styled.li`
	margin: 1.5rem;
`;

export { CardList, CardItem };
