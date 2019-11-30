import '@babel/polyfill';
import '@testing-library/jest-dom/extend-expect';
import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, fireEvent, cleanup } from '@testing-library/react';

import Header from '.';

import UserContext from 'contexts/UserContext';

function UserContextProvider({ children }) {
	const [user] = useState(null);
	return (
		<UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
	);
}

/*

@ Login modal behavior test List
- SignIn 버튼을 클릭하면 로그인 모달이 출력된다.
- 로그인 모달에서 오른쪽 상단의 닫기 버튼을 누르면 모달이 없어진다.

*/

const SIGN_IN_BUTTON_TEXT = 'Sign In';

afterEach(cleanup);

describe('Login modal behavior test', () => {
	beforeAll(prepareForReactPortal);

	it('#1 SignIn 버튼을 클릭하면 로그인 모달이 열린다.', openLoginModalTest);
});

function prepareForReactPortal() {
	let rootElement = document.getElementById('root');
	if (!rootElement) {
		rootElement = document.createElement('div');
		rootElement.setAttribute('id', 'root');
		rootElement.setAttribute('style', '{ overflow: hidden; }');
		document.body.appendChild(rootElement);
	}

	let modalElement = document.getElementById('modal');
	if (!modalElement) {
		modalElement = document.createElement('div');
		modalElement.setAttribute('id', 'modal');
		document.body.appendChild(modalElement);
	}
}

function openLoginModalTest() {
	// given
	const { getByText, getByRole } = render(
		<UserContextProvider>
			<Router>
				<Header />
			</Router>
		</UserContextProvider>
	);
	const signInButton = getByText(SIGN_IN_BUTTON_TEXT);

	// when
	fireEvent.click(signInButton);

	// then
	const loginModal = getByRole('dialog');
	expect(loginModal).toBeTruthy();
}
