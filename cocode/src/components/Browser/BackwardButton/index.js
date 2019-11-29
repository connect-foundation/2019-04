import React from 'react';
import backward from './backward.svg';

const IMAGE_ALT = 'go backward';

function BackwardButton({ className, onClick }) {
	return (
		<button className={className} onClick={onClick}>
			<img src={backward} alt={IMAGE_ALT} />
		</button>
	);
}

export default BackwardButton;
