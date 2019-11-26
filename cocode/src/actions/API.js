import { API_LOADING, API_SUCCESS, API_FAIL } from './types';

function fetchLoadActionCreator() {
	return {
		type: API_LOADING
	};
}

function fetchSuccessActionCreator({ data }) {
	return { type: API_SUCCESS, payload: data };
}

function fetchFailActionCreator(error) {
	return { type: API_FAIL, payload: error };
}

export {
	fetchLoadActionCreator,
	fetchSuccessActionCreator,
	fetchFailActionCreator
};
