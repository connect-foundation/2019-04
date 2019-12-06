import { UPDATE_COCONUT_NAME, DELETE_COCONUT, FETCH_COCONUT } from './types';

function fetchCoconutActionCreator(payload) {
	return { type: FETCH_COCONUT, payload };
}

function updateCoconutNameActionCreator(payload) {
	return { type: UPDATE_COCONUT_NAME, payload };
}

function deleteCoconutActionCreator(payload) {
	return { type: DELETE_COCONUT, payload };
}

export {
	fetchCoconutActionCreator,
	updateCoconutNameActionCreator,
	deleteCoconutActionCreator
};
