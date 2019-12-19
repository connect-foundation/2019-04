import { FETCH_PROJECT, CLONE_PROJECT } from './types';

function fetchProjectActionCreator(payload) {
	return { type: FETCH_PROJECT, payload };
}

function cloneProjectActionCreator(payload) {
	return { type: CLONE_PROJECT, payload };
}

export { fetchProjectActionCreator, cloneProjectActionCreator };
