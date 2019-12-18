import React, { useContext, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as Styled from './style';
import { LiveContext, UserContext } from 'contexts';

import copy from './copy.svg';
import close from './close.svg';
import LiveUsers from 'components/Live/LiveUsers';

import { liveOffActionCreator } from 'actions/Live';
import { copyToClipboard } from 'utils/domControl';

const LIVE_STATUS_LABEL = 'You’ve gone live!';
const ON_BUTTON_LABEL = 'Stop Live';
const ON_DESCRIPTION =
	'Share this link with others to invite them to the live.';

function LiveOnTab() {
	const link = useRef();
	const history = useHistory();
	const { projectId } = useParams();
	const { user } = useContext(UserContext);
	const { url, socket, participants, owner, dispatchLive } = useContext(LiveContext);

	const handleCloseSocket = () => dispatchLive(liveOffActionCreator());

	const handleDisconnectSocket = () => {
		socket.emit('close');
		socket.on('close', handleCloseSocket);
		history.replace(`../project/${projectId}`);
	};

	const handleCopyLink = () => copyToClipboard(link.current);

	return (
		<Styled.Container>
			<Styled.LiveStatusLabel>
				<Styled.LiveStatusSpan />
				{LIVE_STATUS_LABEL}
			</Styled.LiveStatusLabel>
			<Styled.Description>{ON_DESCRIPTION}</Styled.Description>
			<Styled.LinkURL ref={link}>
				<Styled.Copy src={copy} onClick={handleCopyLink} />
				{url}
			</Styled.LinkURL>
			{user === owner ? (
				<Styled.Button onClick={handleDisconnectSocket}>
					<Styled.Close src={close} />
					{ON_BUTTON_LABEL}
				</Styled.Button>
			) : ''}
			{owner ? (
				<LiveUsers owner={owner} participants={participants} />
			) : ''}
		</Styled.Container>
	);
}

export default LiveOnTab;