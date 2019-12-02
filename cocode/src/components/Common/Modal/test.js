import React, { useState, useEffect } from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import Modal from '.';

/*

@ modal behavior test List

#1 열기 버튼을 클릭하면 모달이 열린다.
#2 닫기 버튼을 클릭하면 모달이 닫힌다.

*/

const MODAL_OPEN_BUTTON_TEXT = 'modal open button';
const MODAL_ROLE = 'dialog';

afterEach(cleanup);

describe('Modal behavior test', () => {
	it('#1 열기 버튼을 클릭하면 모달이 열린다.', openModalTest);
	it('#2 닫기 버튼을 클릭하면 모달이 닫힌다.', closeModalTest);
});

function MockModal() {
	const [isOpen, setIsOpen] = useState(false);
	const handleOpenModal = () => setIsOpen(true);
	const onClose = () => setIsOpen(true);

	let rootElement = document.getElementById('root');

	const openModal = () => {
		if (!rootElement) {
			rootElement = document.createElement('div');
			rootElement.setAttribute('id', 'root');
			rootElement.setAttribute('style', '{ overflow: hidden; }');
			document.body.appendChild(rootElement);
		}
	};

	const closeModal = () => {
		if (!rootElement) {
			rootElement = document.createElement('div');
			rootElement.setAttribute('id', 'root');
			rootElement.setAttribute('style', '{ overflow: initial; }');
			document.body.appendChild(rootElement);
		}
		onClose();
	};

	useEffect(openModal, []);

	return (
		<div>
			<button onClick={handleOpenModal}>{MODAL_OPEN_BUTTON_TEXT}</button>
			{isOpen && <Modal modalBody={''} onClose={closeModal} />}
		</div>
	);
}

function openModalTest() {
	// given
	const { getByText, getByRole } = render(<MockModal />);
	const openButton = getByText(MODAL_OPEN_BUTTON_TEXT);

	// when
	fireEvent.click(openButton);

	// then
	const modal = getByRole(MODAL_ROLE);
	expect(modal).toBeTruthy();
}

function closeModalTest() {
	// given
	const { getByText, getByRole, getAllByRole } = render(<MockModal />);
	const openButton = getByText(MODAL_OPEN_BUTTON_TEXT);
	fireEvent.click(openButton);

	const closeButton = getAllByRole('button')[1];

	// when
	fireEvent.click(closeButton);

	// then
	expect(!getByRole(MODAL_ROLE));
}
