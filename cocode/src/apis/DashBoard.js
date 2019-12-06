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

function deleteCoconutsAPICreator(projectId) {
	return {
		url: `${API.projects}/${projectId}`,
		method: 'delete'
	};
}

export {
	getCoconutsAPICreator,
	updateCoconutsAPICreator,
	deleteCoconutsAPICreator
};
