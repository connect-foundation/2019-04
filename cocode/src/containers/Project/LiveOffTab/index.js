import * as Styled from './style';
import React from 'react';

const OFF_BUTTON_LABEL = 'Go Live';
const OFF_DESCRIPTION =
	'Invite others to live edit this coconut with you. We’re doing it live!';

function LiveOffTab({ onClick }) {
	return (
		<Styled.Container>
			<Styled.Description>{OFF_DESCRIPTION}</Styled.Description>
			<Styled.Button onClick={onClick}>
				<Styled.Circle />
				{OFF_BUTTON_LABEL}
			</Styled.Button>
		</Styled.Container>
	);
}

export default LiveOffTab;
