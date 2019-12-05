import ObjectID from 'bson-objectid';
import { reactTemplate } from './react';

const ENTRY = 'index.js';

function generateReactObjectId() {
	return {
		projectId: ObjectID().str,
		root: ObjectID().str,
		src: ObjectID().str,
		'index.js': ObjectID().str,
		'Apple.js': ObjectID().str,
		Component: ObjectID().str,
		'Banana.js': ObjectID().str,
		'package.json': ObjectID().str
	};
}

function assignIdAtProjectFiles(idMap, files) {
	const { projectId } = idMap;

	const filesWithId = files.map(file => {
		const { name, child } = file;
		const source = { _id: idMap[name], projectId };

		if (child) source.child = child.map(item => idMap[item]);
		return Object.assign(file, source);
	});

	return filesWithId;
}

function setProjectInfo(idMap) {
	const { projectId, root } = idMap;
	return {
		_id: projectId,
		root,
		entry: idMap[ENTRY]
	};
}

const assignObjectIdAtProject = () => {
	const template = reactTemplate();

	const generatedIds = generateReactObjectId();
	const projectInfo = setProjectInfo(generatedIds);
	const files = assignIdAtProjectFiles(generatedIds, template.files);

	return Object.assign(template, { ...projectInfo, files });
};

export default assignObjectIdAtProject;
