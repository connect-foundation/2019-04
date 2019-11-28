import React, { useState, useContext } from 'react';
import * as Styled from './style';
import { Link } from 'react-router-dom';

import deleteCookie from 'utils/deleteCookie';

import Logo from 'components/Common/Logo';
import Modal from 'components/Common/Modal';
import UserProfile from 'components/Common/UserProfile';
import ModalPortal from 'components/Common/ModalPortal';
import LoginModalBody from 'components/Common/LoginModalBody';

import UserContext from 'contexts/UserContext';

function Header() {
	const { user } = useContext(UserContext);
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

	const handleOpenSignInModal = () => setIsSignInModalOpen(true);
	const handleCloseSignInModal = () => setIsSignInModalOpen(false);
	const handleSignOut = () => {
		const confirm = window.confirm('로그아웃 하시겠습니까?');
		if (!confirm) return;
		deleteCookie('jwt');
	};

	const profileDropDownMenuItems = [
		{
			value: 'dashboard'
		},
		{
			value: 'sign out',
			onClick: handleSignOut
		}
	];

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
