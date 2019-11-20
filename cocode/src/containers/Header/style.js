import styled from 'styled-components';

const Header = styled.header`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	height: 11.2vh;

	background-color: ${({ theme }) => theme.backgroundColor};
	padding: 1rem 2rem;
`;

const SignInButton = styled.button`
	font-size: 1.5rem;
	font-weight: 100;
	
	&:hover {
	    font-weight: 400;
	}
`;

export { Header, SignInButton };
