import React from 'react';
import * as Styled from './style';

import TinyCoconutLogo from 'components/Common/TinyCoconutLogo';

function Spinner() {
	return (
		<Styled.Container>
			<Styled.Content>
				<TinyCoconutLogo />
			</Styled.Content>
			<Styled.SpinningArc />
		</Styled.Container>
	);
}

export default Spinner;
