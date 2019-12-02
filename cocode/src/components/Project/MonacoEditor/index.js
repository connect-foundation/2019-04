import React, { useState, useEffect, useContext } from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import * as Styled from './style';

import ProjectContext from 'contexts/ProjectContext';
import { updateCodeActionCreator } from 'actions/Project';

function MonacoEditor({ ...props }) {
	const { project, dispatchProject } = useContext(ProjectContext);
	const [code, setCode] = useState('');

	const handleOnChange = (_, changedCode) => {
		setCode(changedCode);
		const updateCodeAction = updateCodeActionCreator({
			changedCode: changedCode
		});
		dispatchProject(updateCodeAction);
	};

	useEffect(() => {
		setCode(project.editingCode);
	}, [project.selectedFilePath]);

	return (
		<Styled.MonacoEditor
			{...props}
			isFilesEmpty={!project.selectedFilePath}
		>
			<ControlledEditor
				value={code}
				language="javascript"
				theme="vs-dark"
				options={{
					fontSize: '16px'
				}}
				onChange={handleOnChange}
			/>
		</Styled.MonacoEditor>
	);
}

export default MonacoEditor;
