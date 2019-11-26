import { UPDATE_CODE, FETCH_PROJECT } from './types';

function fetchProjectActionCreator() {
	return { type: FETCH_PROJECT };
}

function updateCodeActionCreator(payload) {
	return { type: UPDATE_CODE, payload };
}

export { updateCodeActionCreator, fetchProjectActionCreator };
