import { API } from 'config';

function getCoconutsAPICreator(username) {
	console.log(`${API.users}/${username}/projects`);
	return {
		url: `${API.users}/${username}/projects`,
		method: 'get'
	};
}

export { getCoconutsAPICreator };
