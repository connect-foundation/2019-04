import styled from 'styled-components';

const Button = styled.button`
	& {
		width: 2.5rem;
		height: 2.5rem;
		background: ${({ clicked, theme }) =>
			clicked ? theme.tabBarSelectedItemBGColor : theme.tabBarBGColor};
		padding: 0.5rem;
		border-radius: 0.6rem;
		margin: 0.5rem;
	}

	&:hover {
		background: ${({ theme }) => theme.tabBarSelectedItemBGColor};
	}
`;

const Icon = styled.img`
	& {
		width: 1.5rem;
		height: 1.5rem;
	}
`;

export { Button, Icon };
