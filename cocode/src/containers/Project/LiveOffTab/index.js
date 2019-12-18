import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as Styled from './style';

const OFF_BUTTON_LABEL = 'Go Live';
const OFF_DESCRIPTION =
	'Invite others to live edit this coconut with you. We’re doing it live!';

function LiveOffTab() {
	const history = useHistory();
	const { projectId } = useParams();
	const handleConnectSocket = () => history.replace(`../live/${projectId}`);

	return (
		<Styled.Container>
			<Styled.Description>{OFF_DESCRIPTION}</Styled.Description>
			<Styled.Button onClick={handleConnectSocket}>
				<Styled.Circle />
				{OFF_BUTTON_LABEL}
			</Styled.Button>
		</Styled.Container>
	);
}

export default LiveOffTab;
