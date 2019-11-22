import React from 'react';
import * as Styled from './style';

import { API_SERVER } from 'config';

import CloseButton from 'components/CloseButton';

function Modal({ modalBody, onClose }) {
	const handleClickLoginButton = () => {
		window.location.href = `${API_SERVER}/api/users/login`;
	};

	return (
		<Styled.ModalBackGround>
			<Styled.Modal role="dialog">
				<Styled.ModalHeader>
					<CloseButton onClick={onClose} />
				</Styled.ModalHeader>
				<Styled.ModalBody onClick={handleClickLoginButton}>
					{modalBody}
				</Styled.ModalBody>
			</Styled.Modal>
		</Styled.ModalBackGround>
	);
}

export default Modal;