import ObjectID from 'bson-objectid';

function copyProject(project, username) {
	const deepCopyProject = JSON.parse(JSON.stringify(project));

	const idMap = getNewIdsAtFiles(deepCopyProject);
	const projectInfo = updateProjectInfo(idMap, deepCopyProject, username);
	const files = mappingNewIdAtFiles(idMap, deepCopyProject);

	return { ...deepCopyProject, ...projectInfo, files };
}

function getNewIdsAtFiles({ _id, files }) {
	const idMap = { [_id]: ObjectID().str };

	files.forEach(({ _id }) => {
		idMap[_id] = ObjectID().str;
	});

	return idMap;
}

function mappingNewIdAtFiles(idMap, { _id, files }) {
	const projectId = idMap[_id];

	const newFiles = files.map(file => {
		const { _id, child } = file;
		const source = { _id: idMap[_id], projectId };

		if (child) source.child = child.map(({ _id }) => idMap[_id]);
		return { ...file, ...source };
	});

	return newFiles;
}

function updateProjectInfo(idMap, project, username) {
	const { _id, root, entry } = project;
	return {
		_id: idMap[_id],
		author: username,
		root: idMap[root],
		entry: idMap[entry]
	};
}

export default copyProject;
