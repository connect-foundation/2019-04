import React from 'react';
import * as Styled from './style';
import Github from 'components/Common/LoginModalBody/github.svg';
import { API } from 'config';

function SignIn() {
	const handleClickLoginButton = () => (window.location.href = API.login);

	return (
		<Styled.Wrapper>
			<Styled.Title>Sign In</Styled.Title>
			<Styled.LoginButton onClick={handleClickLoginButton}>
				<Styled.Logo src={Github} />
				Sign In With GitHub
			</Styled.LoginButton>
		</Styled.Wrapper>
	);
}

export default SignIn;
