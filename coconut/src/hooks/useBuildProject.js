import { useState, useCallback } from 'react';

import * as bundler from 'bundler';

function useBuildProject() {
	const [buildResult, setBuildResult] = useState(undefined);

	const fileParser = useCallback((project, path, id) => {
		const { files } = project;

		if (files[id].type !== 'directory') {
			window.fileSystem[path] = {
				contents: files[id].contents
			};
			delete window.exports[path];
		} else if (files[id].child) {
			files[id].child.forEach(id => {
				const path = files[id].path;
				fileParser(project, path, id);
			});
		}
	}, []);

	const buildProject = useCallback(
		project => {
			const { files, root } = project;

			const rootPath = files[root].path;
			if (project) fileParser(project, rootPath, root);

			try {
				bundler.init();
				bundler.require('./index.js');

				setBuildResult({ error: undefined });
			} catch (error) {
				setBuildResult({ error: error.stack });
			}
		},
		[fileParser, setBuildResult]
	);

	return [buildResult, buildProject];
}

export default useBuildProject;
