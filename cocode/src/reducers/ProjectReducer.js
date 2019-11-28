// 참고: https://github.com/dal-lab/frontend-tdd-examples/blob/master/6-todo-redux/src/reducers.js
import {
	UPDATE_CODE,
	FETCH_PROJECT,
	SELECT_FILE,
	CREATE_FILE,
	UPDATE_FILE_NAME
} from 'actions/types';

import { getFileExtension } from 'utils';
import FileImagesSrc from 'constants/fileImagesSrc';

// Constants
const ROOT_PATH = '/';
const PATH_DIVIDER = '/';

function convertFilesObjectKeyToPath({
	prePath,
	filesObject,
	fileIdsInDirectory
}) {
	return fileIdsInDirectory.reduce((convertedFiles, id) => {
		const file = filesObject[id];
		const filePath = prePath
			? `${prePath}${PATH_DIVIDER}${file.name}`
			: `${ROOT_PATH}${file.name}`;
		file['parentPath'] = prePath ? prePath : ROOT_PATH;
		file['path'] = filePath;

		if (file.child) {
			const childPaths = file.child.map(
				childId =>
					`${filePath}${PATH_DIVIDER}${filesObject[childId].name}`
			);

			Object.defineProperty(file, 'childPaths', {
				value: childPaths,
				writable: true
			});
		}

		const child = file.child
			? {
					...convertFilesObjectKeyToPath({
						prePath: filePath,
						filesObject,
						fileIdsInDirectory: file.child
					})
			  }
			: {};
		const thisFile = { [filePath]: file };

		return { ...convertedFiles, ...thisFile, ...child };
	}, {});
}

function getEntryPath(fileObject, entryId) {
	const entryFile = Object.values(fileObject).find(
		({ _id }) => _id === entryId
	);
	let result = entryFile.name;
	let parentPath = entryFile.parentPath;
	while (true) {
		result = `/${fileObject[parentPath].name}/${result}`;
		parentPath = fileObject[parentPath].parentPath;
		if (parentPath !== undefined) break;
	}

	return result;
}

// Reducers
const fetchProject = (_, { project }) => {
	const childIdsInRoot = project.files.find(({ _id }) => _id === project.root)
		.child;
	const filesObject = project.files.reduce((acc, cur) => {
		acc[cur._id] = cur;
		return acc;
	}, {});

	const convertedFilesObject = convertFilesObjectKeyToPath({
		filesObject,
		fileIdsInDirectory: childIdsInRoot
	});
	Object.assign(convertedFilesObject, {
		[ROOT_PATH]: {
			...filesObject[project.root],
			childPaths: filesObject[project.root].child.map(
				childId => `${ROOT_PATH}${filesObject[childId].name}`
			)
		}
	});

	const entryPath = getEntryPath(convertedFilesObject, project.entry);

	const fetchedProject = {
		...project,
		rootPath: ROOT_PATH,
		entryPath,
		files: convertedFilesObject,
		selectedFilePath: entryPath,
		selectedFileList: [entryPath],
		editingCode: ''
	};

	return fetchedProject;
};

const updateCode = (state, { selectedFilePath, changedCode }) => {
	const changedState = Object.assign(
		{ [selectedFilePath]: {} },
		{
			[selectedFilePath]: {
				...state.files[selectedFilePath],
				contents: changedCode
			}
		}
	);

	return { ...state, files: { ...state.files, ...changedState } };
};

const selectFile = (state, { selectedFilePath }) => {
	return { ...state, selectedFilePath };
};

const createFile = (state, { name, parentPath, type }) => {
	const newFilePath =
		parentPath === ROOT_PATH
			? `${parentPath}${name}`
			: `${parentPath}/${name}`;
	const newFileType =
		type === 'directory'
			? type
			: (() => {
					let ext = getFileExtension(name);
					if (!FileImagesSrc[ext]) ext = 'file';
					return ext;
			  })();

	const newFile = Object.assign(
		{ [newFilePath]: {} },
		{
			[newFilePath]: {
				_id: 'newFile',
				name,
				type: newFileType,
				contents: '',
				path: newFilePath,
				parentPath
			}
		}
	);
	if (newFileType === 'directory') newFile[newFilePath]['childPaths'] = [];

	// 변경되는 state: selectedFileId, selectedFileList, 부모 디렉토리의 child
	return {
		...state,
		selectedFilePath: newFilePath,
		selectedFileList: [newFilePath, ...state.selectedFileList],
		files: {
			...state.files,
			...newFile,
			[parentPath]: {
				...state.files[parentPath],
				childPaths: [...state.files[parentPath].childPaths, newFilePath]
			}
		}
	};
};

// TODO
function cloneObject(obj) {
	let clone = {};
	for (var i in obj) {
		if (typeof obj[i] === 'object' && obj[i] !== null)
			clone[i] = cloneObject(obj[i]);
		else clone[i] = obj[i];
	}
	return clone;
}

// TODO: 이름 바뀌면 바뀌어야 할 state -> 부모의 child, childPath / 기존 file은 어떻게? / ...
const updateFileName = (state, { selectedFilePath, changedName }) => {
	const newPath =
		selectedFilePath
			.split('/')
			.slice(0, -1)
			.join('/') + `/${changedName}`;

	const clone = cloneObject({
		...state.files[selectedFilePath],
		name: changedName
	});

	console.log(state);

	return {
		...state,
		files: {
			...state.files,
			[newPath]: {
				...clone
			}
		}
	};
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
