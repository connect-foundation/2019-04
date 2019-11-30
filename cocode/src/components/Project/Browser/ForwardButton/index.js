import React from 'react';
import forward from './forward.svg';

const IMAGE_ALT = 'go forward';

function ForwardButton({ className, onClick }) {
	return (
		<button className={className} onClick={onClick}>
			<img src={forward} alt={IMAGE_ALT} />
		</button>
	);
}

export default ForwardButton;
