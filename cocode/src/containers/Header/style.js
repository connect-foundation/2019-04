import styled from 'styled-components';

const Header = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	background-color: ${({ theme }) => theme.backgroundColor};
	padding: 1rem 2rem;
`;

const SignInButton = styled.button`
	color: ${({ theme }) => theme.textColor};
	font-size: 1.5rem;
`;

export { Header, SignInButton };
