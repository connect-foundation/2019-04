import React from 'react';
import * as Styled from './style';

function DependencySelector({ options }) {
	return (
		<Styled.Select>
			{options.map((option, index) => {
				return (
					<option key={index}>{option}</option>
				);
			})}
		</Styled.Select>
	);
}

export default DependencySelector;