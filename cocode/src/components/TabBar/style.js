import styled from 'styled-components';

const TabBar = styled.nav`
	& {
		display: inline-flex;
		flex-direction: column;
		justify-content: flex-start;

		background-color: ${({ tabBarBGColor }) => tabBarBGColor};
	}
`;

const TabBarItem = styled.button`
	& {
		margin: 1rem;
	}
`;

export { TabBar, TabBarItem };
