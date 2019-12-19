import React, { useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as Styled from './style';
import { ProjectContext } from 'contexts';

const OFF_BUTTON_LABEL = 'Go Live';
const OFF_DESCRIPTION =
	'Invite others to live edit this coconut with you. We’re doing it live!';

function LiveOffTab() {
	const history = useHistory();
	const { projectId } = useParams();
	const { forkCoconut } = useContext(ProjectContext);
	const handleConnectSocket = () => {
		const idOfNewProject = forkCoconut({ live: true });
		if (idOfNewProject) return;

		history.replace(`../live/${projectId}`);
	};

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
