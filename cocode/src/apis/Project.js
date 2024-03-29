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

function getDenpendencyListAPICreator(name) {
	return {
		url: `${API.dependency(name)}`,
		method: 'get'
	};
}

export {
	getProjectInfoAPICreator,
	forkProjectAPICreator,
	getDenpendencyListAPICreator
};
