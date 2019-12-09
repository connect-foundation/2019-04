import React, { useContext, useState } from 'react';
import * as Styled from './style';
import LiveUserProfile from 'components/Project/LiveUserProfile';
import { LiveContext } from 'contexts';
import { LiveStore } from 'stores';
import {LIVE_ON, LIVE_OFF} from 'actions/types';

const LIVE_STATUS_LABEL = 'You’ve gone live!';
const OFF_BUTTON_LABEL = 'Go Live';
const ON_BUTTON_LABEL = 'Stop Live';
const OFF_DESCRIPTION =
	'Invite others to live edit this coconut with you. We’re doing it live!';
const ON_DESCRIPTION =
	'Share this link with others to invite them to the live.';

function LiveOff({ onClick }) {
	return (
		<React.Fragment>
			<Styled.Description>{OFF_DESCRIPTION}</Styled.Description>
			<Styled.Button onClick={onClick}> {OFF_BUTTON_LABEL}</Styled.Button>
		</React.Fragment>
	);
}

function LiveOn({ onClick }) {
	const { url, participants, owner } = useContext(LiveContext);

	return (
		<React.Fragment>
			<Styled.LiveStatusLabel>
				<Styled.LiveStatusSpan />
				{LIVE_STATUS_LABEL}
			</Styled.LiveStatusLabel>
			<Styled.Description>{ON_DESCRIPTION}</Styled.Description>
			<Styled.LinkURL>{url}</Styled.LinkURL>
			<Styled.Button onClick={onClick}>{ON_BUTTON_LABEL}</Styled.Button>
			<LiveUserProfile owner={owner} participants={participants} />
		</React.Fragment>
	);
}

function LiveTab() {
	const [liveState, setLiveState] = useState(false);
	const { dispatchLive } = useContext(LiveContext);

	const handleTurnLive = () => setLiveState(!liveState);
	return (
		<LiveStore>
			<Styled.Title>LIVE</Styled.Title>
			<Styled.Wrapper>
				{liveState ? (
					<LiveOn onClick={handleTurnLive} />
				) : (
					<LiveOff onClick={handleTurnLive} />
				)}
			</Styled.Wrapper>
		</LiveStore>
	);
}

export default LiveTab;
