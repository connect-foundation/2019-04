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

function updateFileAPICreator(projectId, fileId, data) {
	return {
		url: `${API.files(projectId)}/${fileId}`,
		method: 'patch',
		data
	};
}

export { createFileAPICreator, deleteFileAPICreator, updateFileAPICreator };
