import { API } from 'config';

function getCoconutsAPICreator(username) {
	return {
		url: `${API.users}/${username}/projects`,
		method: 'get'
	};
}

function updateCoconutsAPICreator(projectId, data) {
	return {
		url: `${API.projects}/${projectId}`,
		method: 'patch',
		data
	};
}

export { getCoconutsAPICreator, updateCoconutsAPICreator };
