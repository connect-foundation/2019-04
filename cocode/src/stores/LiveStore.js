import React, { useReducer } from 'react';
import LiveReducer from 'reducers/LiveReducer';
import { LiveContext } from 'contexts';

function LiveStore({ children }) {
	const [{ url, participants, owner }, dispatchLive] = useReducer(
		LiveReducer,
		{
			url: null,
			owner: undefined,
			participants: []
		}
	);

	return (
		<LiveContext.Provider
			value={{ url, participants, owner, dispatchLive }}
		>
			{children}
		</LiveContext.Provider>
	);
}

export default LiveStore;
