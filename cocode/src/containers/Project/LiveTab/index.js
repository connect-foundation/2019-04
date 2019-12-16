import React, { useContext } from 'react';
import * as Styled from './style';
import { LiveContext } from 'contexts';

import { liveOffActionCreator, fetchLiveActionCreator } from 'actions/Live';
import LiveOffTab from 'containers/Project/LiveOffTab';
import LiveOnTab from 'containers/Project/LiveOnTab';
import avatar from 'components/Common/UserProfile/avatar.jpeg';

const TAB_TITLE = 'LIVE';

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
		username: 'hzoou',
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
			<Styled.Title>{TAB_TITLE}</Styled.Title>
			<div>
				{url ? (
					<LiveOnTab onClick={handleTurnLive} />
				) : (
					<LiveOffTab onClick={handleTurnLive} />
				)}
			</div>
		</>
	);
}

export default LiveTab;
