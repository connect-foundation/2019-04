import React, { useContext } from 'react';
import * as Styled from './style';

import FileTabBar from 'components/Project/FileTabBar';
import MonacoEditor from 'components/Project/MonacoEditor';

import ProjectContext from 'contexts/ProjectContext';
import { updateCodeActionCreator } from 'actions/Project';

function Editor() {
	const { project, dispatchProject } = useContext(ProjectContext);
	const { files, entry, selectedFileId } = project;
	const entryCode = files[entry].contents;

	const handleChangeCode = (_, changedCode) => {
		const updateCodeAction = updateCodeActionCreator({
			selectedFileId,
			changedCode
		});
		dispatchProject(updateCodeAction);
	};

	return (
		<Styled.Editor>
			<FileTabBar />
			<MonacoEditor
				code={entryCode}
				onChange={handleChangeCode}
				className="Stretch-width"
			/>
		</Styled.Editor>
	);
}

export default Editor;
