import React from 'react';
import * as Styled from './style';

import Github from './github.svg';

function LoginModalBody({ onClickLoginButton }) {
	return (
		<Styled.LoginModalBody>
			<Styled.LoginModalBodyTitle>Sign In</Styled.LoginModalBodyTitle>
			<Styled.LoginModalBodyButton onClick={onClickLoginButton}>
				<Styled.Logo src={Github}/>
				Sign In With GitHub
			</Styled.LoginModalBodyButton>
		</Styled.LoginModalBody>
	);
}

export default LoginModalBody;
