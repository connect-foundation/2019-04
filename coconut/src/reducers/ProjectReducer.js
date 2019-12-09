import { FETCH_PROJECT, CLONE_PROJECT } from 'actions/types';

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
			path: rootPath,
			isEditing: false
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

function cloneProject(_, { project }) {
	return project;
}

function ProjectReducer(state, { type, payload }) {
	const reducers = {
		[FETCH_PROJECT]: fetchProject,
		[CLONE_PROJECT]: cloneProject
	};

	const reducer = reducers[type];
	return reducer ? reducer(state, payload) : state;
}

export default ProjectReducer;
