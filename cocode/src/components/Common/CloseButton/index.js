import React from 'react';
import * as Styled from './style';
import close from './close.svg';

function CloseButton({ onClick }) {
	return (
		<Styled.Button onClick={onClick}>
			<img src={close} />
		</Styled.Button>
	);
}

export default CloseButton;
