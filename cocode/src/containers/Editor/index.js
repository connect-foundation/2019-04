import React, { useContext } from 'react';
import * as Styled from './style';

import FileTabBar from 'components/FileTabBar';
import MonacoEditor from 'components/MonacoEditor';

import ProjectContext from 'contexts/ProjectContext';
import { updateCodeActionCreator } from 'actions/Project';

function Editor() {
	const { project, dispatchProject } = useContext(ProjectContext);
	const { code } = project;

	const handleChangeCode = (_, changedCode) => {
		const updateCodeAction = updateCodeActionCreator(changedCode);
		dispatchProject(updateCodeAction);
	};

	return (
		<Styled.Editor>
			<FileTabBar />
			<MonacoEditor
				code={code}
				onChange={handleChangeCode}
				className="Stretch-width"
			/>
		</Styled.Editor>
	);
}

export default Editor;
