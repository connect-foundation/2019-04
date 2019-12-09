import React, { useContext } from 'react';
import * as Styled from './style';
import LiveUserProfile from 'components/Project/LiveUserProfile';
import { LiveContext } from 'contexts';

import {liveOffActionCreator, fetchLiveActionCreator } from 'actions/Live';
import avatar from 'components/Common/UserProfile/avatar.jpeg';

const LIVE_STATUS_LABEL = 'You’ve gone live!';
const OFF_BUTTON_LABEL = 'Go Live';
const ON_BUTTON_LABEL = 'Stop Live';
const OFF_DESCRIPTION =
	'Invite others to live edit this coconut with you. We’re doing it live!';
const ON_DESCRIPTION =
	'Share this link with others to invite them to the live.';

const dummy = {
	url: 'https://cocode.com/live/',
	participants: [
		{
			username: 'basiltoast',
			avatar
		},
		{
			username: 'basiltoast',
			avatar
		},
		{
			username: 'basiltoast',
			avatar
		}
	],
	owner: {
		username: 'lallaheeee',
		avatar
	}
};

function LiveOff({ onClick }) {
	return (
		<>
			<Styled.Description>{OFF_DESCRIPTION}</Styled.Description>
			<Styled.Button onClick={onClick}> {OFF_BUTTON_LABEL}</Styled.Button>
		</>
	);
}

function LiveOn({ onClick }) {
	const { url, participants, owner } = useContext(LiveContext);

	return (
		<>
			<Styled.LiveStatusLabel>
				<Styled.LiveStatusSpan />
				{LIVE_STATUS_LABEL}
			</Styled.LiveStatusLabel>
			<Styled.Description>{ON_DESCRIPTION}</Styled.Description>
			<Styled.LinkURL>{url}</Styled.LinkURL>
			<Styled.Button onClick={onClick}>{ON_BUTTON_LABEL}</Styled.Button>
			<LiveUserProfile owner={owner} participants={participants} />
		</>
	);
}

function LiveTab() {
	const { url, dispatchLive } = useContext(LiveContext);

	const handleTurnLive = () => {
		if (url) dispatchLive(liveOffActionCreator());
		else dispatchLive(fetchLiveActionCreator(dummy));
	};
	return (
		<>
			<Styled.Title>LIVE</Styled.Title>
			<Styled.Wrapper>
				{url ? (
					<LiveOn onClick={handleTurnLive} />
				) : (
					<LiveOff onClick={handleTurnLive} />
				)}
			</Styled.Wrapper>
		</>
	);
}

export default LiveTab;
