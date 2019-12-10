// 참고: https://github.com/dal-lab/frontend-tdd-examples/blob/master/6-todo-redux/src/reducers.js
import {
	UPDATE_CODE,
	FETCH_PROJECT,
	SELECT_FILE,
	CREATE_FILE,
	UPDATE_FILE_NAME,
	DELETE_FILE,
	MOVE_FILE,
	INSTALL_DEPENDENCY,
	WAITING_INSTALL_DEPENDENCY,
	CLONE_PROJECT
} from 'actions/types';

import { getFileExtension } from 'utils';
import FileImagesSrc from 'constants/fileImagesSrc';

// Fetch project
const fetchProject = (_, { project }) => {
	const filesObject = project.files.reduce((acc, cur) => {
		acc[cur._id] = cur;
		return acc;
	}, {});

	const rootDirectoryId = project.root;
	const rootPath = `/${filesObject[rootDirectoryId].name}`;
	const convertedFilesObject = addParentIdToFiles(
		rootPath,
		filesObject,
		rootDirectoryId
	);
	Object.assign(convertedFilesObject, {
		[rootDirectoryId]: {
			...filesObject[rootDirectoryId],
			path: rootPath
		}
	});

	const entryId = project.entry;
	const dependency = getDependencyList(convertedFilesObject, project.root);
	const fetchedProject = {
		...project,
		files: convertedFilesObject,
		selectedFileId: entryId,
		editingCode: convertedFilesObject[entryId].contents,
		dependency,
		dependencyInstalling: false
	};

	return fetchedProject;
};

function addParentIdToFiles(prePath, filesObject, directoryId) {
	const result =
		directoryId === filesObject.root
			? { [directoryId]: { ...filesObject[directoryId] } }
			: {};

	return filesObject[directoryId].child.reduce((files, id) => {
		const file = filesObject[id];
		file['parentId'] = directoryId;
		file['path'] = `${prePath}/${file.name}`;

		const child = file.child
			? { ...addParentIdToFiles(file['path'], filesObject, id) }
			: {};
		const thisFile = { [id]: file };

		return { ...files, ...thisFile, ...child };
	}, result);
}

function getDependencyList(files, root) {
	const childOfRoot = files[root].child;
	const packageJSON = childOfRoot
		.map(id => files[id])
		.filter(({ name }) => name === 'package.json')[0].contents;
	const dependencies = JSON.parse(packageJSON).dependencies;

	return Object.entries(dependencies).reduce((acc, [key, value]) => {
		return { ...acc, [key]: { name: key, version: value } };
	}, {});
}

// Update code
const updateCode = (state, { changedCode }) => {
	return {
		...state,
		files: {
			...state.files,
			[state.selectedFileId]: {
				...state.files[state.selectedFileId],
				contents: changedCode
			}
		}
	};
};

// Select file
const selectFile = (state, { selectedFileId }) => {
	return {
		...state,
		selectedFileId,
		editingCode: selectedFileId
			? state.files[selectedFileId].contents
			: undefined
	};
};

// Create file
const createFile = (state, { newFileId, name, parentId, type }) => {
	const newFileType =
		type === 'directory' ? type : convertFileExtension(name);
	const newFilePath = `${state.files[parentId].path}/${name}`;

	const newFile = {
		[newFileId]: {
			_id: newFileId,
			name,
			type: newFileType,
			contents: '',
			parentId,
			path: newFilePath
		}
	};
	if (newFileType === 'directory') newFile[newFileId]['child'] = [];

	// 변경되는 state: 부모 디렉토리의 child
	return {
		...state,
		files: {
			...state.files,
			...newFile,
			[parentId]: {
				...state.files[parentId],
				child: [...state.files[parentId].child, newFileId]
			}
		}
	};
};

function convertFileExtension(name) {
	let ext = getFileExtension(name);
	if (!FileImagesSrc[ext]) ext = 'file';
	return ext;
}

// Update file name
const updateFileName = (state, { selectedFileId, changedName }) => {
	const { files } = state;
	const parentId = files[selectedFileId].parentId;
	const parentPath = files[parentId].path;
	const updatedPath = `${parentPath}/${changedName}`;

	const changedChildFiles = files[selectedFileId].child
		? updatePathOfChild(parentPath, files, files[selectedFileId].child)
		: {};

	return {
		...state,
		files: {
			...state.files,
			...changedChildFiles,
			[selectedFileId]: {
				...state.files[selectedFileId],
				name: changedName,
				path: updatedPath
			}
		}
	};
};

function updatePathOfChild(prePath, files, child) {
	return child
		.map(id => files[id])
		.reduce((result, { _id, name, child }) => {
			const path = `${prePath}/${name}`;
			const changedChildFiles = child
				? updatePathOfChild(path, files, child)
				: {};
			return {
				...result,
				...changedChildFiles,
				[_id]: {
					...files[_id],
					path
				}
			};
		}, {});
}

// Delete file
const deleteFile = (state, { deleteFileId }) => {
	const { files } = state;
	const { parentId } = files[deleteFileId];
	const updatedParentChilds = state.files[parentId].child.filter(
		id => id !== deleteFileId
	);

	return {
		...state,
		files: {
			...state.files,
			[deleteFileId]: undefined,
			[parentId]: {
				...state.files[parentId],
				child: updatedParentChilds
			}
		}
	};
};

// Move file
const moveFile = (state, { directoryId, fileId }) => {
	const { files } = state;

	const oldParentId = files[fileId].parentId;
	if (oldParentId === directoryId) return state;

	const updateChild = list => list.filter(childId => childId !== fileId);
	const updatedChildAtOldParent = updateChild(files[oldParentId].child);
	const updatedChildAtNewParent = updateChild(files[directoryId].child);

	const newPath = `${files[directoryId].path}/${files[fileId].name}`;

	return {
		...state,
		files: {
			...files,
			[directoryId]: {
				...files[directoryId],
				child: [...updatedChildAtNewParent, fileId]
			},
			[fileId]: {
				...files[fileId],
				parentId: directoryId,
				path: newPath
			},
			[oldParentId]: {
				...files[oldParentId],
				child: [...updatedChildAtOldParent]
			}
		}
	};
};

function waitingInstallDependency(state) {
	return {
		...state,
		dependency: {
			...state.dependency
		},
		dependencyInstalling: true
	};
}

function registerDependency(state, { moduleName, moduleVersion }) {
	return {
		...state,
		dependency: {
			...state.dependency,
			[moduleName]: {
				name: moduleName,
				version: moduleVersion
			}
		},
		dependencyInstalling: false
	};
}

function cloneProject(_, { project }) {
	return project;
}

function ProjectReducer(state, { type, payload }) {
	const reducers = {
		[FETCH_PROJECT]: fetchProject,
		[UPDATE_CODE]: updateCode,
		[SELECT_FILE]: selectFile,
		[UPDATE_FILE_NAME]: updateFileName,
		[CREATE_FILE]: createFile,
		[DELETE_FILE]: deleteFile,
		[MOVE_FILE]: moveFile,
		[INSTALL_DEPENDENCY]: registerDependency,
		[WAITING_INSTALL_DEPENDENCY]: waitingInstallDependency,
		[CLONE_PROJECT]: cloneProject
	};

	const reducer = reducers[type];
	return reducer ? reducer(state, payload) : state;
}

export default ProjectReducer;
