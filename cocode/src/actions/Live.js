import {
	FETCH_LIVE,
	LIVE_ON,
	LIVE_OFF,
	LIVE_JOIN_USER,
	LIVE_LEFT_USER
} from './types';

function fetchLiveActionCreator(payload) {
	return { type: FETCH_LIVE, payload };
}
function liveOnActionCreator(payload) {
	return { type: LIVE_ON, payload };
}
function liveOffActionCreator(payload) {
	return { type: LIVE_OFF, payload };
}
function liveJoinUserActionCreator(payload) {
	return { type: LIVE_JOIN_USER, payload };
}
function liveLeftUserActionCreator(payload) {
	return { type: LIVE_LEFT_USER, payload };
}

export {
	fetchLiveActionCreator,
	liveOnActionCreator,
	liveOffActionCreator,
	liveJoinUserActionCreator,
	liveLeftUserActionCreator
};
