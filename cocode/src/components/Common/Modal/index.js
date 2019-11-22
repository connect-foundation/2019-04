import React from 'react';
import * as Styled from './style';

import CloseButton from 'components/Common/CloseButton';

function Modal({ modalBody, onClose }) {
	return (
		<Styled.ModalBackGround>
			<Styled.Modal role="dialog">
				<Styled.ModalHeader>
					<CloseButton onClick={onClose} />
				</Styled.ModalHeader>
				<Styled.ModalBody>{modalBody}</Styled.ModalBody>
			</Styled.Modal>
		</Styled.ModalBackGround>
	);
}

export default Modal;
