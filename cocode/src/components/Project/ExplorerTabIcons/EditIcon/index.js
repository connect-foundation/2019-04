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
				<path d="m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"></path>
			</g>
		</Styled.Svg>
	);
}

export default EditIcon;
