import styled from 'styled-components';

const Header = styled.header`
    & {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    
        height: 12vh;
    
        background-color: ${({ theme }) => theme.backgroundColor};
        padding: 2rem 2.3rem;
    }
`;

const SignInButton = styled.button`
    & {
        font-size: 1.4rem;
        font-weight: 100;
    }
	
	&:hover {
	    font-weight: 400;
	}
`;

export { Header, SignInButton };