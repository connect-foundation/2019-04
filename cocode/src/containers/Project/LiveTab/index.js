import React, { useContext, useState } from 'react';
import * as Styled from './style';
import LiveUserProfile from 'components/Project/LiveUserProfile';
import { UserContext } from 'contexts';
import avatar from 'components/Common/UserProfile/avatar.jpeg';

const OFF_DESCRIPTION =
	'Invite others to live edit this coconut with you. We’re doing it live!';
const ON_DESCRIPTION =
	'Share this link with others to invite them to the live.';

const LIVE_STATUS_LABEL = 'You’ve gone live!';

const OFF_BUTTON_LABEL = ' Go Live';
const ON_BUTTON_LABEL = 'Stop Live';

const dummyUsers = [
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
];

const dummyOwner = {
	username: 'lallaheeee',
	avatar
};

function LiveOff({ onClick }) {
	return (
		<React.Fragment>
			<Styled.Description>{OFF_DESCRIPTION}</Styled.Description>
			<Styled.Button onClick={onClick}> {OFF_BUTTON_LABEL}</Styled.Button>
		</React.Fragment>
	);
}

function LiveOn({ onClick, owner, participants, url }) {
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
	const [url, setURL] = useState('https://cocode.com/live/');
	const [participants, setPaticipants] = useState(dummyUsers);
	const [owner, setOwner] = useState(dummyOwner);

	const handleTurnLive = () => setLiveState(!liveState);
	return (
		<React.Fragment>
			<Styled.Title>LIVE</Styled.Title>
			<Styled.Wrapper>
				{liveState ? (
					<LiveOn
						onClick={handleTurnLive}
						owner={owner}
						participants={participants}
						url={url}
					/>
				) : (
					<LiveOff onClick={handleTurnLive} />
				)}
			</Styled.Wrapper>
		</React.Fragment>
	);
}

export default LiveTab;
