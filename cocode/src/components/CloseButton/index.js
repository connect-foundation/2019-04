import React from 'react';
import close from './close.svg';

function CloseButton({ onClick }) {
	return (
		<button onClick={onClick}>
			<img src={close} />
		</button>
	);
}

export default CloseButton;
