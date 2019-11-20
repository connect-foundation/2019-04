import React, { useState } from 'react';
import * as Styled from './style';
import Logo from 'components/Logo';
import { Grid } from '@material-ui/core';

import ModalPortal from 'components/ModalPortal';
import Modal from 'components/Modal';
import LoginModalBody from 'components/LoginModalBody';

function Header() {
	const [isSignInModalOpen, setIsSignInModalOpen] = useState(false);
	const handleOpenSignInModal = () => setIsSignInModalOpen(true);
	const handleCloseSignInModal = () => setIsSignInModalOpen(false);

	return (
		<Styled.Header>
			<Grid
				container
				direction="row"
				justify="space-between"
				alignItems="center"
			>
				<Grid item xs={1}>
					<Logo />
				</Grid>
				<Grid item xs={1} className="Header-text-right">
					<Styled.SignInButton onClick={handleOpenSignInModal}>
						Sign In
					</Styled.SignInButton>
				</Grid>
			</Grid>
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
