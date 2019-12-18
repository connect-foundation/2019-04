import React from 'react';
import * as Styled from './style';

import close from './close.svg';
import LiveUsers from 'components/Live/LiveUsers';

const LIVE_STATUS_LABEL = 'You’ve gone live!';
const ON_BUTTON_LABEL = 'Stop Live';
const ON_DESCRIPTION =
	'Share this link with others to invite them to the live.';

function LiveOnTab() {
	return (
		<Styled.Container>
			<Styled.LiveStatusLabel>
				<Styled.LiveStatusSpan />
				{LIVE_STATUS_LABEL}
			</Styled.LiveStatusLabel>
			<Styled.Description>{ON_DESCRIPTION}</Styled.Description>
			<Styled.LinkURL>
				url
			</Styled.LinkURL>
				<Styled.Button>
					<Styled.Close src={close} />
					{ON_BUTTON_LABEL}
				</Styled.Button>
				<LiveUsers />
		</Styled.Container>
	);
}

export default LiveOnTab;
