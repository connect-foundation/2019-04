import React, { useContext } from 'react';
import { LiveContext } from 'contexts';
import * as Styled from './style';

import close from './close.svg';
import LiveUserProfile from 'components/Project/LiveUserProfile';

const LIVE_STATUS_LABEL = 'You’ve gone live!';
const ON_BUTTON_LABEL = 'Stop Live';
const ON_DESCRIPTION =
	'Share this link with others to invite them to the live.';

function LiveOnTab({ onClick }) {
	const { url, participants, owner } = useContext(LiveContext);

	return (
		<Styled.Container>
			<Styled.LiveStatusLabel>
				<Styled.LiveStatusSpan />
				{LIVE_STATUS_LABEL}
			</Styled.LiveStatusLabel>
			<Styled.Description>{ON_DESCRIPTION}</Styled.Description>
			<Styled.LinkURL>{url}</Styled.LinkURL>
			<Styled.Button onClick={onClick}>
				<Styled.Close src={close} />
				{ON_BUTTON_LABEL}
			</Styled.Button>
			<LiveUserProfile owner={owner} participants={participants} />
		</Styled.Container>
	);
}

export default LiveOnTab;
