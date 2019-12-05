import { API } from 'config';

function createFileAPICreator(projectId, data) {
	return {
		url: API.files(projectId),
		method: 'post',
		data
	};
}

export { createFileAPICreator };
