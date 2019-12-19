import {
	LIVE_ON,
	LIVE_OFF,
	LIVE_JOIN_USER,
	LIVE_LEAVE_USER
} from './types';

function liveOnActionCreator(payload) {
	return { type: LIVE_ON, payload };
}
function liveOffActionCreator() {
	return { type: LIVE_OFF };
}
function liveJoinUserActionCreator(payload) {
	return { type: LIVE_JOIN_USER, payload };
}
function liveLeaveUserActionCreator(payload) {
	return { type: LIVE_LEAVE_USER, payload };
}

export {
	liveOnActionCreator,
	liveOffActionCreator,
	liveJoinUserActionCreator,
	liveLeaveUserActionCreator
};
