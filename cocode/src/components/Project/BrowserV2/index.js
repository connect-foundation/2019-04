import React, { useState, useEffect, useContext } from 'react';
import * as Styled from './style';

import * as bundler from 'bundler';

import ProjectContext from 'contexts/ProjectContext';

function BrowserV2({ ...props }) {
	const { project } = useContext(ProjectContext);
	const { files, root } = project;
	const [isChange, setIsChange] = useState(false);

	useEffect(() => {
		function fileParser(path, id) {
			if (files[id].type !== 'directory') {
				fileSystem[path] = {
					contents: files[id].contents
				};
				delete exports[path];
			} else if (files[id].child) {
				files[id].child.forEach(id => {
					const path = files[id].path;
					fileParser(path, id);
				});
			}
		}
		const rootPath = files[root].path;
		if (project) fileParser(rootPath, project.root);
		setIsChange(true);
	}, [files]);

	useEffect(() => {
		if (isChange) {
			setIsChange(false);
			try {
				bundler.init();
				bundler.require('./index.js');
			} catch (error) {
				console.log(error);
			}
		}
	}, [isChange]);

	return <Styled.BrowserV2 {...props}></Styled.BrowserV2>;
}

export default BrowserV2;
