import React from 'react';
import reload from './reload.svg';

const IMAGE_ALT = 'reload page';

function ReloadButton({ className, onClick }) {
	return (
		<button className={className} onClick={onClick}>
			<img src={reload} alt={IMAGE_ALT} />
		</button>
	);
}

export default ReloadButton;
