import styled from 'styled-components';

const Header = styled.header`
	height: 11.2vh;
	background-color: ${({ theme }) => theme.backgroundColor};
	padding: 1rem 2rem;
	
	.Header-text-right {
		text-align: right;
	}
`;

const SignInButton = styled.button`
	font-size: 1.5rem;
	font-weight: 100;
	
	&:hover {
	    font-weight: 400;
	}
`;

export { Header, SignInButton };
