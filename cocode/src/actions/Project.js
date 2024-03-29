import {
	UPDATE_PROJECT_INFO,
	UPDATE_CODE,
	UPDATE_CODE_FROM_FILE_ID,
	FETCH_PROJECT,
	UPDATE_FILES,
	SELECT_FILE,
	UPDATE_FILE_NAME,
	CREATE_FILE,
	DELETE_FILE,
	MOVE_FILE,
	INSTALL_DEPENDENCY,
	WAITING_INSTALL_DEPENDENCY,
	SAVE_FILE
} from './types';

function updateProjectInfoActionCreator(payload) {
	return { type: UPDATE_PROJECT_INFO, payload };
}

function fetchProjectActionCreator(payload) {
	return { type: FETCH_PROJECT, payload };
}

function updateFilesActionCreator(payload) {
	return { type: UPDATE_FILES, payload };
}

function updateCodeActionCreator(payload) {
	return { type: UPDATE_CODE, payload };
}
function updateCodeFromFileIdActionCreator(payload) {
	return { type: UPDATE_CODE_FROM_FILE_ID, payload };
}

function selectFileActionCreator(payload) {
	return { type: SELECT_FILE, payload };
}

function updateFileNameActionCreator(payload) {
	return { type: UPDATE_FILE_NAME, payload };
}

function createFileActionCreator(payload) {
	return { type: CREATE_FILE, payload };
}

function deleteFileActionCreator(payload) {
	return { type: DELETE_FILE, payload };
}

function moveFileActionCreator(payload) {
	return { type: MOVE_FILE, payload };
}

function installDependencyActionCreator(payload) {
	return { type: INSTALL_DEPENDENCY, payload };
}

function waitingInstallDependencyActionCreator(payload) {
	return { type: WAITING_INSTALL_DEPENDENCY, payload };
}

function saveFileActionCreator(payload) {
	return { type: SAVE_FILE, payload };
}

export {
	updateProjectInfoActionCreator,
	updateCodeActionCreator,
	updateCodeFromFileIdActionCreator,
	fetchProjectActionCreator,
	updateFilesActionCreator,
	selectFileActionCreator,
	updateFileNameActionCreator,
	createFileActionCreator,
	deleteFileActionCreator,
	moveFileActionCreator,
	installDependencyActionCreator,
	waitingInstallDependencyActionCreator,
	saveFileActionCreator
};
