import { API } from 'config';

function getProjectInfoAPICreator(projectId) {
	return {
		url: `${API.projects}/${projectId}`,
		method: 'get'
	};
}

export { getProjectInfoAPICreator };
