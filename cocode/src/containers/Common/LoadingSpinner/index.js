import React from 'react';
import * as Styled from './style';
import CoconutSpinner from 'components/Common/CoconutSpinner';

function LoadingSpinner({ message }) {
	return (
		<Styled.LoadingDisplay>
			<CoconutSpinner />
			<Styled.LoadingPhrase>{message}</Styled.LoadingPhrase>
		</Styled.LoadingDisplay>
	);
}

export default LoadingSpinner;
