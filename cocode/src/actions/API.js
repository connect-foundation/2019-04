import { API_READY, API_LOADING, API_SUCCESS, API_FAIL } from './types';

function fetchLoadActionCreator() {
	return { type: API_LOADING };
}

function fetchSuccessActionCreator({ status, data }) {
	return { type: API_SUCCESS, payload: { status, data } };
}

function fetchFailActionCreator(error) {
	return { type: API_FAIL, payload: error };
}

function fetchReadyActionCreator() {
	return { type: API_READY };
}

export {
	fetchReadyActionCreator,
	fetchLoadActionCreator,
	fetchSuccessActionCreator,
	fetchFailActionCreator
};
