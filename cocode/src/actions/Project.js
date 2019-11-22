export const UPDATE_CODE = 'updateCode';
export function updateCodeActionCreator(payload) {
	return { type: UPDATE_CODE, payload };
}

export const FETCH_PROJECT = 'fetchProject';
export function fetchProjectActionCreator() {
	return { type: FETCH_PROJECT };
}
