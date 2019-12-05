import { API } from 'config';

function getProjectInfoAPICreator(projectId) {
	return {
		url: `${API.projects}/${projectId}`,
		method: 'get'
	};
}

function forkProjectAPICreator(data) {
	return {
		url: `${API.projects}`,
		method: 'post',
		data
	};
}

export { getProjectInfoAPICreator, forkProjectAPICreator };
