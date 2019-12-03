import React from 'react';
import * as Styled from './style';

function DropZone({ draggableComponentOverColor, ...props }) {
	const handleDragOver = e => {
		e.stopPropagation();
		e.preventDefault();
		props.handleDragOver();
	};

	const handleDragLeave = e => {
		e.stopPropagation();
		props.handleDragLeave(e);
	};

	const handleDrop = e => {
		e.stopPropagation();
		const data = e.dataTransfer.getData('text');
		props.handleDrop(data);
	};

	return (
		<Styled.DropZone
			draggableComponentOverColor={draggableComponentOverColor}
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			{...props}
		></Styled.DropZone>
	);
}

export default DropZone;
