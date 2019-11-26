import { UPDATE_CODE, FETCH_PROJECT, SELECT_FILE } from './types';

function fetchProjectActionCreator() {
	return { type: FETCH_PROJECT };
}

function updateCodeActionCreator(payload) {
	return { type: UPDATE_CODE, payload };
}

function selectFileActionCreator(payload) {
	return { type: SELECT_FILE, payload };
}

export {
	updateCodeActionCreator,
	fetchProjectActionCreator,
	selectFileActionCreator
};
