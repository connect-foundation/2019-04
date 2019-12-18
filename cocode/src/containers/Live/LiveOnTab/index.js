import React, { useContext } from 'react';
import * as Styled from './style';
import { LiveContext, UserContext } from 'contexts';

import close from './close.svg';
import LiveUsers from 'components/Live/LiveUsers';

const LIVE_STATUS_LABEL = 'You’ve gone live!';
const ON_BUTTON_LABEL = 'Stop Live';
const ON_DESCRIPTION =
	'Share this link with others to invite them to the live.';

function LiveOnTab() {
	const { user } = useContext(UserContext);
	const { url, participants, owner } = useContext(
		LiveContext
	);

	return (
		<Styled.Container>
			<Styled.LiveStatusLabel>
				<Styled.LiveStatusSpan />
				{LIVE_STATUS_LABEL}
			</Styled.LiveStatusLabel>
			<Styled.Description>{ON_DESCRIPTION}</Styled.Description>
			<Styled.LinkURL>
				{url}
			</Styled.LinkURL>
			{user === owner ? (
				<Styled.Button>
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