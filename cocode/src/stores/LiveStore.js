import React, { useReducer } from 'react';
import LiveReducer from 'reducers/LiveReducer';
import { LiveContext } from 'contexts';
import { LIVE_SERVER } from 'config';

function LiveStore({ children }) {
	const initialValue = {
		liveServer: LIVE_SERVER,
		url: '',
		project: {},
		socket: null,
		owner: undefined,
		participants: []
	};

	const [live, dispatchLive] = useReducer(LiveReducer, initialValue);
	const { liveServer, url, socket, participants, owner } = live;

	return (
		<LiveContext.Provider
			value={{
				liveServer,
				url,
				socket,
				participants,
				owner,
				dispatchLive
			}}
		>
			{children}
		</LiveContext.Provider>
	);
}

export default LiveStore;
