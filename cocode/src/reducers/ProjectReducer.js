// 참고: https://github.com/dal-lab/frontend-tdd-examples/blob/master/6-todo-redux/src/reducers.js
import { UPDATE_CODE, FETCH_PROJECT } from 'actions/types';
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

const updateCode = ({ selectedFileId, changedCode }) => {
	const changedState = {};
	changedState[selectedFileId] = {
		...state.files[selectedFileId],
		contents: changedCode
	};

	return { ...state, files: { ...state.files, ...changedState } };
};

function ProjectReducer(state, { type, payload }) {
	const reducers = {
		[FETCH_PROJECT]: fetchProject,
		[UPDATE_CODE]: updateCode
	};

	const reducer = reducers[type];
	return reducer ? reducer(payload) : state;
}

export default ProjectReducer;
