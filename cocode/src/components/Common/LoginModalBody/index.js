import React from 'react';
import * as Styled from './style';

import { API } from 'config';

import Github from './github.svg';

function LoginModalBody() {
	const handleClickLoginButton = () => (window.location.href = API.login);

	return (
		<Styled.LoginModalBody>
			<Styled.LoginModalBodyTitle>Sign In</Styled.LoginModalBodyTitle>
			<Styled.LoginModalBodyButton onClick={handleClickLoginButton}>
				<Styled.Logo src={Github} />
				Sign In With GitHub
			</Styled.LoginModalBodyButton>
		</Styled.LoginModalBody>
	);
}

export default LoginModalBody;
