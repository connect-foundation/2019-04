import React, { useState, useContext, useEffect } from 'react';
import * as Styled from './style';

import FileTabBar from 'components/Project/FileTabBar';
import MonacoEditor from 'components/Project/MonacoEditor';

import ProjectContext from 'contexts/ProjectContext';
import { updateCodeActionCreator } from 'actions/Project';

function Editor() {
	const { project, dispatchProject } = useContext(ProjectContext);

	// const { files, entryPath, selectedFileId } = project;
	// const entryCode = files[entryPath].contents;

	const { files, entry, selectedFileId } = project;
	const [code, setCode] = useState('');

	const handleOnChange = (_, changedCode) => {
		setCode(changedCode);
	};

	useEffect(() => {
		if (selectedFileId === undefined) return;
		setCode(files[selectedFileId].contents);
	}, [selectedFileId]);

	useEffect(() => {
		if (code === '' || code === undefined) return;
		dispatchProject(
			updateCodeActionCreator({
				selectedFileId,
				changedCode: code
			})
		);
	}, [code]);

	return (
		<Styled.Editor>
			<FileTabBar />
			<MonacoEditor
				code={code}
				onChange={handleOnChange}
				className="Stretch-width"
			/>
		</Styled.Editor>
	);
}

export default Editor;
