import { API } from 'config';

function getCoconutsAPICreator(username) {
	return {
		url: `${API.users}/${username}/projects`,
		method: 'get'
	};
}

export { getCoconutsAPICreator };
