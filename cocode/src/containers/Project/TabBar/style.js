import styled from 'styled-components';

const TabBar = styled.nav`
	& {
		min-width: 4rem;
		display: inline-flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		
		background-color: ${({ tabBarBGColor }) => tabBarBGColor};
	}
`;

export { TabBar };
