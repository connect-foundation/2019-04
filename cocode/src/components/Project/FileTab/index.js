import React from 'react';
import * as Styled from './style';
import Close from './close.svg';

function FileTab({
	index,
	FileName,
	icon,
	type,
	clicked,
	onClick,
	onCloseClick
}) {
	const handleTabClick = () => onClick(index);
	const handleCloseClick = () => onCloseClick(index);

	return (
		<Styled.Tab onClick={handleTabClick} clicked={clicked}>
			<Styled.Icon src={icon} alt={type} />
			{FileName}
			<Styled.Close
				src={Close}
				alt="close"
				clicked={clicked}
				onClick={handleCloseClick}
			/>
		</Styled.Tab>
	);
}

export default FileTab;
