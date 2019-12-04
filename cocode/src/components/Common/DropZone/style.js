import styled from 'styled-components';

const DropZone = styled.div`
	& {
		background-color: ${({ draggableComponentOverColor }) =>
			draggableComponentOverColor
				? draggableComponentOverColor
				: 'transparent'};
		height: ${({ height }) => height};
	}
`;

export { DropZone };
