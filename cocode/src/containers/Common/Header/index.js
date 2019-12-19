import React, { useState, useContext } from 'react';
import * as Styled from './style';
import { Link, useHistory } from 'react-router-dom';

import deleteCookie from 'utils/deleteCookie';

import Logo from 'components/Common/Logo';
import Modal from 'components/Common/Modal';
import UserProfile from 'components/Common/UserProfile';
import ModalPortal from 'components/Common/ModalPortal';
import LoginModalBody from 'components/Common/LoginModalBody';

import { UserContext } from 'contexts';

const CONFIRM_LOGOUT = '로그아웃 하시겠습니까?';

function Header({ name }) {
	const history = useHistory();
	const { user, setUser } = useContext(UserContext);
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);

	const handleOpenSignInModal = () => setIsSignInModalOpen(true);
	const handleCloseSignInModal = () => setIsSignInModalOpen(false);
	const handleClickDashBoard = () => history.push('/dashboard');
	const handleSignOut = () => {
		const confirm = window.confirm(CONFIRM_LOGOUT);
		if (!confirm) return;
		deleteCookie('jwt');
		setUser(null);
		history.replace('../');
	};

	const profileDropDownMenuItems = [
		{
			value: 'dashboard',
			onClick: handleClickDashBoard
		},
		{
			value: 'sign out',
			onClick: handleSignOut
		}
	];

	return (
		<Styled.Header isMinHeight={name}>
			<Link to="/">
				<Logo />
			</Link>
			<Styled.ProjectName>{name || ''}</Styled.ProjectName>
			<div>
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
			</div>
		</Styled.Header>
	);
}

export default Header;
