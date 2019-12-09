import {
	FETCH_LIVE,
	LIVE_ON,
	LIVE_OFF,
	LIVE_JOIN_USER,
	LIVE_LEFT_USER
} from 'actions/types';

const fetchLive = (state, { url, participants, owner }) => ({
	...state,
	url,
	participants,
	owner
});

const liveOn = (state, { owner }) => ({
	...state,
	owner,
	participants: []
});

const liveOff = () => ({
	url: null,
	owner: undefined,
	participants: []
});

const joinUser = (state, { joinUser }) => ({
	...state,
	participants: [...state.participants, joinUser]
});

const leftUser = (state, { leftUser }) => ({
	...state,
	participants: state.participants.filter(
		({ username }) => username !== leftUser.username
	)
});

function LiveReducer(state, { type, payload }) {
	const reducers = {
		[FETCH_LIVE]: fetchLive,
		[LIVE_ON]: liveOn,
		[LIVE_OFF]: liveOff,
		[LIVE_JOIN_USER]: joinUser,
		[LIVE_LEFT_USER]: leftUser
	};

	const reducer = reducers[type];
	return reducer ? reducer(state, payload) : state;
}

export default LiveReducer;
