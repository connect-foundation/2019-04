import React, { useEffect } from 'react';
import * as Styled from './style';

import CloseButton from 'components/Common/CloseButton';

function Modal({ modalBody, onClose }) {
	const openModal = () => {
		const root = document.getElementById('root');
		root.style.overflow = 'hidden';
	};

	const closeModal = () => {
		const root = document.getElementById('root');
		root.style.overflow = 'initial';
		onClose();
	};

	useEffect(openModal, []);

	return (
		<Styled.ModalBackGround>
			<Styled.Modal role="dialog">
				<Styled.ModalHeader>
					<CloseButton onClick={closeModal} />
				</Styled.ModalHeader>
				<Styled.ModalBody>{modalBody}</Styled.ModalBody>
			</Styled.Modal>
		</Styled.ModalBackGround>
	);
}

export default Modal;
