import { API } from 'config';

function createFileAPICreator(projectId, data) {
	return {
		url: API.files(projectId),
		method: 'post',
		data
	};
}

function deleteFileAPICreator(projectId, fileId, data) {
	return {
		url: `${API.files(projectId)}/${fileId}`,
		method: 'delete',
		data
	};
}

export { createFileAPICreator, deleteFileAPICreator };
