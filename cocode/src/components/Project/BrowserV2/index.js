import React, { useState, useEffect, useContext } from 'react';
import * as Styled from './style';

import * as bundler from 'bundler';

import ProjectContext from 'contexts/ProjectContext';

function idToPath(files, id) {
	const path = `/${files[id].name}`;
	const parentId = files[id].parentId;

	return parentId ? `${idToPath(files, parentId)}${path}` : path;
}

function BrowserV2({ ...props }) {
	const { project } = useContext(ProjectContext);
	const { files } = project;
	const [fileSystem, setFileSystem] = useState({});

	useEffect(() => {
		const fileSystemTemp = {};
		Object.keys(bundler.exports).forEach(key => {
			delete bundler.exports[key];
		});

		function fileParser(path, id) {
			if (files[id].type !== 'directory') {
				fileSystemTemp[path] = {
					contents: files[id].contents
				};
				bundler.exports[path] = fileSystemTemp[path];
			} else if (files[id].child) {
				files[id].child.forEach(id => {
					const path = idToPath(files, id);
					fileParser(path, id);
				});
			}
		}

		const rootPath = idToPath(files, project.root);
		if (project) fileParser(rootPath, project.root);

		setFileSystem(fileSystemTemp);
	}, [files]);

	useEffect(() => {
		try {
			const entryPath = idToPath(files, project.entry).split('.')[0];
			bundler.init();
			bundler.require(entryPath);
		} catch (error) {
			console.log(error);
		}
	}, [fileSystem]);

	return <Styled.BrowserV2 {...props}></Styled.BrowserV2>;
}

export default BrowserV2;
