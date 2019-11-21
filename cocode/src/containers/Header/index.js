import React, { useState } from 'react';
import * as Styled from './style';
import Logo from 'components/Logo';

import ModalPortal from 'components/ModalPortal';
import Modal from 'components/Modal';
import LoginModalBody from 'components/LoginModalBody';

function Header() {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const handleOpenSignInModal = () => setIsSignInModalOpen(true);
	const handleCloseSignInModal = () => {
		const root = document.getElementById('root');
		root.style.overflow = 'overlay';
		setIsSignInModalOpen(false);
	};

	return (
		<Styled.Header>
			<Logo />
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
		</Styled.Header>
	);
}

export default Header;
