import React, { useState, useEffect, useContext } from 'react';
import * as Styled from './style';

import * as bundler from 'bundler';

import ProjectContext from 'contexts/ProjectContext';

function BrowserV2({ ...props }) {
	const { project } = useContext(ProjectContext);
	const { files } = project;
	const [fileSystem, setFileSystem] = useState({});

	useEffect(() => {
		const fileTemp = {};
		Object.keys(bundler.exports).forEach(key => {
			delete bundler.exports[key];
		});

		function fileParser(path) {
			if (files[path].type !== 'directory') {
				fileTemp[path] = {
					contents: files[path].contents
				};
				bundler.exports[path] = {
					contents: files[path].contents
				};
			} else if (files[path].childPaths) {
				files[path].childPaths.forEach(path => {
					fileParser(path);
				});
			}
		}
		if (project) fileParser(project.rootPath);

		setFileSystem(fileTemp);
	}, [files]);

	useEffect(() => {
		try {
			const entry = project.entryPath.split('.')[0];
			bundler.init();
			bundler.require(entry);
		} catch (error) {
			console.log(error);
		}
	}, [fileSystem]);

	return <Styled.BrowserV2 {...props}></Styled.BrowserV2>;
}

export default BrowserV2;
