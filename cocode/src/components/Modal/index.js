import React from 'react';
import * as Styled from './style';

import CloseButton from 'components/CloseButton';

const LOGIN_API_URL = 'http://localhost:3030/api/users/login';

function Modal({ modalBody, onClose }) {
	const handleClickLoginButton = () => window.location.href = LOGIN_API_URL;

	return (
		<Styled.ModalBackGround>
			<Styled.Modal role="dialog">
				<Styled.ModalHeader>
					<CloseButton onClick={onClose} />
				</Styled.ModalHeader>
				<Styled.ModalBody onClick={handleClickLoginButton}>{modalBody}</Styled.ModalBody>
			</Styled.Modal>
		</Styled.ModalBackGround>
	);
}

export default Modal;