import { useState, useCallback } from 'react';

function useBuildProject() {
	const [buildResult, setBuildResult] = useState(undefined);

	const buildProject = (project, worker) => {
		const { files, root, selectedFileId } = project;

		const rootPath = files[root].path;
		fileParser(project, rootPath, root);

		const updatedFilePath = files[selectedFileId].path;
		worker.postMessage({ fileSystem: window.fileSystem, updatedFilePath });

		worker.onmessage = ({ data: { error, bundledCode } }) => {
			if (!error) setBuildResult({ bundledCode });
			else setBuildResult({ error });
		};
	};

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

	return [buildResult, buildProject];
}

export default useBuildProject;
