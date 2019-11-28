import React from 'react';
import * as Styled from '../style';

function EditIcon({ onClick }) {
	return (
		<Styled.Svg
			height="1em"
			width="1em"
			viewBox="0 0 40 40"
			onClick={onClick}
		>
			<g>
				<path d="m21.6 15h9.3l-9.3-9.1v9.1z m-11.6-11.6h13.4l10 10v20q0 1.3-1.1 2.3t-2.3 0.9h-20q-1.3 0-2.3-0.9t-1.1-2.3l0.1-26.8q0-1.3 1-2.3t2.3-0.9z"></path>
			</g>
		</Styled.Svg>
	);
}

export default EditIcon;
