import React, { useState, useEffect } from 'react';
import * as Styled from './style';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { API, DEFAULT_REQUEST_OPTION } from 'config';

import Logo from 'components/Common/Logo';
import Modal from 'components/Common/Modal';
import UserProfile from 'components/Common/UserProfile';
import ModalPortal from 'components/Common/ModalPortal';
import LoginModalBody from 'components/Common/LoginModalBody';

function Header() {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const handleOpenSignInModal = () => setIsSignInModalOpen(true);
	const handleCloseSignInModal = () => setIsSignInModalOpen(false);

	const [user, setUser] = useState(null);

	const getJwtToken = async () => {
		const { data } = await axios.get(
			API.getUserData,
			DEFAULT_REQUEST_OPTION
		);
		if (data) setUser(data.data);
	};

	const handleSignOut = () => setUser(null);

	const profileDropDownMenuItems = [
		{
			value: 'dashboard'
		},
		{
			value: 'sign out',
			onClick: handleSignOut
		}
	];

	useEffect(() => {
		getJwtToken();
	}, []);

	return (
		<Styled.Header>
			<Link to="/">
				<Logo />
			</Link>
			<Link to="/history">
				<Styled.HeaderCategory>History</Styled.HeaderCategory>
			</Link>
			<Styled.HeaderRightSideArea>
				{user ? (
					<UserProfile
						username={user.username}
						avatar={user.avatar}
						menuItems={profileDropDownMenuItems}
					/>
				) : (
					<>
						<Styled.SignInButton onClick={handleOpenSignInModal}>
							Sign In
						</Styled.SignInButton>
						{isSignInModalOpen && (
							<ModalPortal>
								<Modal
									modalBody={<LoginModalBody />}
									onClose={handleCloseSignInModal}
								/>
							</ModalPortal>
						)}
					</>
				)}
			</Styled.HeaderRightSideArea>
		</Styled.Header>
	);
}

export default Header;
