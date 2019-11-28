// 참고: https://github.com/dal-lab/frontend-tdd-examples/blob/master/6-todo-redux/src/reducers.js
import {
	UPDATE_CODE,
	FETCH_PROJECT,
	SELECT_FILE,
	CREATE_FILE,
	UPDATE_FILE_NAME
} from 'actions/types';

import { getFileExtension } from 'utils';

const fetchProject = (_, { project }) => {
	const files = project.files.reduce((acc, cur) => {
		acc[cur._id] = cur;
		return acc;
	}, {});

	const fetchedProject = project;
	fetchedProject.files = files;
	fetchedProject.selectedFileId = fetchedProject.entry;
	fetchedProject.selectedFileList = [fetchedProject.entry];

	return fetchedProject;
};

const updateCode = (state, { selectedFileId, changedCode }) => {
	const changedState = Object.assign(
		{ [selectedFileId]: {} },
		{
			[selectedFileId]: {
				...state.files[selectedFileId],
				contents: changedCode
			}
		}
	);

	return { ...state, files: { ...state.files, ...changedState } };
};

const selectFile = (state, { selectedFileId }) => {
	return { ...state, selectedFileId };
};

const createFile = (state, { name, parentDirectoryId, type }) => {
	const newFileId = `${name}_waitToSaveFile`;
	const newFileType = type === 'directory' ? type : getFileExtension(name);
	const newFile = Object.assign(
		{ [newFileId]: {} },
		{
			[newFileId]: {
				_id: newFileId,
				name,
				type: newFileType,
				contents: '',
				parentDirectoryId
			}
		}
	);
	if (newFileType === 'directory') newFile[newFileId]['child'] = [];

	// 변경되는 state: selectedFileId, selectedFileList, 부모 디렉토리의 child
	return {
		...state,
		selectedFileId: newFileId,
		selectedFileList: [newFileId, ...state.selectedFileList],
		files: {
			...state.files,
			...newFile,
			[parentDirectoryId]: {
				...state.files[parentDirectoryId],
				child: [...state.files[parentDirectoryId].child, newFileId]
			}
		}
	};
};

const updateFileName = (state, { selectedFileId, changedName }) => {
	const changedState = {};
	changedState[selectedFileId] = {
		...state.files[selectedFileId],
		name: changedName
	};

	return { ...state, files: { ...state.files, ...changedState } };
};

function ProjectReducer(state, { type, payload }) {
	const reducers = {
		[FETCH_PROJECT]: fetchProject,
		[UPDATE_CODE]: updateCode,
		[SELECT_FILE]: selectFile,
		[UPDATE_FILE_NAME]: updateFileName,
		[CREATE_FILE]: createFile
	};

	const reducer = reducers[type];
	return reducer ? reducer(state, payload) : state;
}

export default ProjectReducer;
