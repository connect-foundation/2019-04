import {
	UPDATE_CODE,
	FETCH_PROJECT,
	SELECT_FILE,
	UPDATE_FILE_NAME
} from './types';

function fetchProjectActionCreator() {
	return { type: FETCH_PROJECT };
}

function updateCodeActionCreator(payload) {
	return { type: UPDATE_CODE, payload };
}

function selectFileActionCreator(payload) {
	return { type: SELECT_FILE, payload };
}

function updateFileNameActionCreator(payload) {
	return { type: UPDATE_FILE_NAME, payload };
}

export {
	updateCodeActionCreator,
	fetchProjectActionCreator,
	selectFileActionCreator,
	updateFileNameActionCreator
};
