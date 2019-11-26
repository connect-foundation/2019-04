// 참고: https://github.com/dal-lab/frontend-tdd-examples/blob/master/6-todo-redux/src/reducers.js
import { UPDATE_CODE, FETCH_PROJECT, SELECT_FILE } from 'actions/types';
import ProjectDummyData from 'dummy/Project';

const fetchProject = () => {
	const files = ProjectDummyData.files.reduce((acc, cur) => {
		acc[cur._id] = cur;
		return acc;
	}, {});

	const fetchedProject = ProjectDummyData;
	fetchedProject.files = files;

	return fetchedProject;
};

const updateCode = (state, { selectedFileId, changedCode }) => {
	const changedState = {};
	changedState[selectedFileId] = {
		...state.files[selectedFileId],
		contents: changedCode
	};

	return { ...state, files: { ...state.files, ...changedState } };
};

const selectFile = (state, { selectedFileId }) => {
	return { ...state, selectedFileId };
};

function ProjectReducer(state, { type, payload }) {
	const reducers = {
		[FETCH_PROJECT]: fetchProject,
		[UPDATE_CODE]: updateCode,
		[SELECT_FILE]: selectFile
	};

	const reducer = reducers[type];
	return reducer ? reducer(state, payload) : state;
}

export default ProjectReducer;
