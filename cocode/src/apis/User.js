import { API } from 'config';

function getUserAPICreator() {
	return {
		method: 'get',
		url: API.getUserData,
	};
}

export { getUserAPICreator };
