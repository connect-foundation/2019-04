import React, { useContext } from 'react';
import * as Styled from './style';
import { LiveContext } from 'contexts';
import LiveOn from './LiveOn';
import LiveOff from './LiveOff';

import { liveOffActionCreator, fetchLiveActionCreator } from 'actions/Live';
import avatar from 'components/Common/UserProfile/avatar.jpeg';

const TAB_TATILE = 'LIVE';

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

function LiveTab() {
	const { url, dispatchLive } = useContext(LiveContext);

	const handleTurnLive = () => {
		if (url) dispatchLive(liveOffActionCreator());
		else dispatchLive(fetchLiveActionCreator(dummy));
	};
	return (
		<>
			<Styled.Title>{TAB_TATILE}</Styled.Title>
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
