import {
	LIVE_ON,
	LIVE_OFF,
	LIVE_JOIN_USER,
	LIVE_LEAVE_USER
} from 'actions/types';

const liveOn = (state, { url, socket, project, owner }) => {
	return ({
		...state,
		url,
		socket,
		project,
		owner,
		participants: []
	});
};

const liveOff = (state) => ({
	...state,
	socket: null,
	owner: undefined,
	participants: []
});

const joinUser = (state, { participants }) => ({
	...state,
	participants,
});

const leaveUser = (state, { participants }) => ({
	...state,
	participants,
});

function LiveReducer(state, { type, payload }) {
	const reducers = {
		[LIVE_ON]: liveOn,
		[LIVE_OFF]: liveOff,
		[LIVE_JOIN_USER]: joinUser,
		[LIVE_LEAVE_USER]: leaveUser
	};

	const reducer = reducers[type];
	return reducer ? reducer(state, payload) : state;
}

export default LiveReducer;
