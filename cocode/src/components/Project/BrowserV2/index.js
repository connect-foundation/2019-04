import React, { useState, useEffect, useContext } from 'react';
import * as Styled from './style';

import * as bundler from 'bundler';

import ProjectContext from 'contexts/ProjectContext';

function BrowserV2({ ...props }) {
	const { project } = useContext(ProjectContext);
	const { files, root } = project;
	const [fileSystem, setFileSystem] = useState({});
	const [errorDescription, setErrorDescription] = useState(null);

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
					const path = files[id].path;
					fileParser(path, id);
				});
			}
		}

		const rootPath = files[root].path;
		if (project) fileParser(rootPath, project.root);

		setFileSystem(fileSystemTemp);
	}, [files]);

	useEffect(() => {
		try {
			const entryPath = files[project.entry].path.split('.')[0];
			bundler.init();
			bundler.require(entryPath);

			setErrorDescription(null);
		} catch (error) {
			setErrorDescription(error.stack);
		}
	}, [fileSystem]);

	return (
		<Styled.Frame>
			<Styled.ErrorDisplay errorDescription={errorDescription}>
				<pre>{errorDescription}</pre>
			</Styled.ErrorDisplay>
			<Styled.BrowserV2 {...props}></Styled.BrowserV2>
		</Styled.Frame>
	);
}

export default BrowserV2;
