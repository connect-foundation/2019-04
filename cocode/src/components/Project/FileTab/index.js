import React from 'react';
import * as Styled from './style';
import Close from './close.svg';

function FileTab({
	index,
	fileName,
	icon,
	type,
	clicked,
	onClick,
	onCloseClick
}) {
	const handleTabClick = () => onClick(index);
	const handleCloseClick = (e) => onCloseClick(e, index);

	return (
		<Styled.Tab onClick={handleTabClick} clicked={clicked}>
			<Styled.Icon src={icon} alt={type} />
			{fileName}
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
