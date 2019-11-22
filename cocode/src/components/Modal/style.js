import styled from 'styled-components';

const ModalBackGround = styled.div`
	& {
		position: fixed;
		top: 0;
		left: 0;

		display: flex;
		align-items: center;

		width: 100%;
		height: 100%;

		background-color: ${({ theme }) => theme.blackOpaqueColor};
	}
`;

const Modal = styled.dialog`
	& {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;

		margin: auto;

		height: auto;

		background-color: white;
	}
`;

const ModalHeader = styled.header`
	& {
		padding: 1rem;

		display: flex;
		flex-direction: row;
		justify-content: flex-end;
		align-items: flex-end;
	}
`;

const ModalBody = styled.section``;

export { ModalBackGround, Modal, ModalHeader, ModalBody };
