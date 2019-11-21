import React, { useState, useEffect } from 'react';
import * as Styled from './style';
import Logo from 'components/Logo';

import UserProfile from 'components/UserProfile';
import ModalPortal from 'components/ModalPortal';
import Modal from 'components/Modal';
import LoginModalBody from 'components/LoginModalBody';
import axios from 'axios';

function Header() {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const handleOpenSignInModal = () => setIsSignInModalOpen(true);
	const handleCloseSignInModal = () => {
		const root = document.getElementById('root');
		root.style.overflow = 'overlay';
		setIsSignInModalOpen(false);
	};

	const [ user, setUser ] = useState(null);

	const getJwtToken = async () => {
		const { data } = await axios.get('http://localhost:3030/api/users', {
			withCredentials: true,
			mode: 'cors',
			credentials: 'include'
		});
		if (data) setUser(data.data);
	};

	useEffect(() => { getJwtToken(); }, []);

	return (
		<Styled.Header>
			<Logo />
			{ user ?
				<UserProfile
					username={user.username}
					avatar={user.avatar}
				/> :
				<>
					<Styled.SignInButton onClick={handleOpenSignInModal}>
						Sign In
					</Styled.SignInButton>
					{ isSignInModalOpen && (
						<ModalPortal>
							<Modal
								modalBody={<LoginModalBody />}
								onClose={handleCloseSignInModal}
							/>
						</ModalPortal>
					)}
				</>
			}
		</Styled.Header>
	);
}

export default Header;