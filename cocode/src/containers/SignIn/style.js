import styled from 'styled-components';
import { SIGN_IN_THEME } from 'constants/theme';

const Logo = styled.img`
	height: 1.2rem;
	margin-right: 0.8rem;
	filter: invert(1);
`;

const Wrapper = styled.div`
	& {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;

		height: 70vh;
		padding: 5rem;
	}
`;

const Title = styled.h1`
	& {
		text-align: center;
		font-size: 3rem;
		font-weight: 700;
	}
`;

const LoginButton = styled.button`
	& {
		display: flex;
		justify-content: center;
		align-items: center;
		margin: 2rem 0 1.5rem 0;
		padding: 1rem 2.5rem;

		font-size: 1.5rem;

		background-color: ${SIGN_IN_THEME.signInButtonBGColor};
		color: ${SIGN_IN_THEME.signInButtonTextColor};
		border-radius: 0.5rem;
	}
	
	&:hover {
		background-color: ${SIGN_IN_THEME.signInButtonBGHoverColor};
	}
`;

export { Logo, Wrapper, LoginButton, Title };
