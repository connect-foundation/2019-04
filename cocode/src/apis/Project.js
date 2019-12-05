import { API } from 'config';

function getProjectInfoAPICreator(projectId) {
	return {
		url: `${API.projects}/${projectId}`,
		method: 'get'
	};
}

function getDenpendencyList(name) {
	return {
		url: `${API.dependency(name)}`,
		method: 'get'
	};
}

export { getProjectInfoAPICreator, getDenpendencyList };
