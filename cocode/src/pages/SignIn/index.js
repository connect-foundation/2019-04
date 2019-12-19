import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Header from 'containers/Common/Header';
import SignInContainer from 'containers/SignIn';
import { UserContext } from 'contexts';

function SignIn() {
	const { user } = useContext(UserContext);
	const history = useHistory();

	if (user) history.replace('../');

	return (
		<>
			<Header />
			<SignInContainer />
		</>
	);
}

export default SignIn;
