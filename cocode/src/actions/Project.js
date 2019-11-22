const UPDATE_CODE = 'updateCode';
function updateCodeActionCreator(payload) {
	return { type: UPDATE_CODE, payload };
}

const FETCH_PROJECT = 'fetchProject';
function fetchProjectActionCreator() {
	return { type: FETCH_PROJECT };
}

export {
	UPDATE_CODE,
	updateCodeActionCreator,
	FETCH_PROJECT,
	fetchProjectActionCreator
};
