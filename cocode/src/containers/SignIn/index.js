import React from 'react';
import * as Styled from './style';
import Github from 'components/Common/LoginModalBody/github.svg';
import { API } from 'config';

const SIGN_IN_TITLE = 'Sorry, This service requires a login.';

function SignIn() {
	const handleClickLoginButton = () => (window.location.href = API.login);

	return (
		<Styled.Wrapper>
			<Styled.Title>{SIGN_IN_TITLE}</Styled.Title>
			<Styled.LoginButton onClick={handleClickLoginButton}>
				<Styled.Logo src={Github} />
				Sign In With GitHub
			</Styled.LoginButton>
		</Styled.Wrapper>
	);
}

export default SignIn;
