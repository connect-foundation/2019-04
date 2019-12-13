import React, { useContext } from 'react';
import { LiveContext } from 'contexts';
import * as Styled from './style';
import LiveUserProfile from 'components/Project/LiveUserProfile';

const LIVE_STATUS_LABEL = 'You’ve gone live!';
const ON_BUTTON_LABEL = 'Stop Live';
const ON_DESCRIPTION =
	'Share this link with others to invite them to the live.';

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

export default LiveOn;
