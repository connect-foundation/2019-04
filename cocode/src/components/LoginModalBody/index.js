import React from 'react';
import * as Styled from './style';

function LoginModalBody({ onClickLoginButton }) {
	return (
		<Styled.LoginModalBody>
			<Styled.LoginModalBodyTitle>Sign In</Styled.LoginModalBodyTitle>
			<Styled.LoginModalBodyButton onClick={onClickLoginButton}>
				Sign In With GitHub
			</Styled.LoginModalBodyButton>
		</Styled.LoginModalBody>
	);
}

export default LoginModalBody;
