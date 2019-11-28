import React, { useState, useContext, useEffect } from 'react';
import * as Styled from './style';

import FileTabBar from 'components/Project/FileTabBar';
import MonacoEditor from 'components/Project/MonacoEditor';

import ProjectContext from 'contexts/ProjectContext';
import { updateCodeActionCreator } from 'actions/Project';

function Editor() {
	const { project, dispatchProject } = useContext(ProjectContext);
	const { selectedFilePath, editingCode } = project;

	const handleOnChange = (_, changedCode) => {
		const updateCodeAction = updateCodeActionCreator({
			selectedFilePath,
			changedCode
		});
		dispatchProject(updateCodeAction);
	};

	return (
		<Styled.Editor>
			<FileTabBar />
			<MonacoEditor
				code={editingCode}
				onChange={handleOnChange}
				className="Stretch-width"
			/>
		</Styled.Editor>
	);
}

export default Editor;
