import React, { useContext } from 'react';
import * as Styled from './style';

import {
	NewFolderIcon,
	NewFileIcon
} from 'components/Project/ExplorerTabIcons';
import Directory from 'components/Project/Directory';

import ProjectContext from 'contexts/ProjectContext';
import { selectFileActionCreator } from 'actions/Project';

const TAB_TITLE = 'EXPLOLER';

function TabHeader() {
	return (
		<Styled.TabHeader>
			<Styled.Title>{TAB_TITLE}</Styled.Title>
			<Styled.SideIcons className="Tab-header-Side-icons">
				<NewFolderIcon></NewFolderIcon>
				<NewFileIcon></NewFileIcon>
			</Styled.SideIcons>
		</Styled.TabHeader>
	);
}

function ExplorerTab() {
	const { project, dispatchProject } = useContext(ProjectContext);
	const { files, root } = project;
	const rootFiles = files[root].child;

	const handleSelectFile = selectedFileId => {
		const selectFileAction = selectFileActionCreator({ selectedFileId });
		dispatchProject(selectFileAction);
	};

	return (
		<Styled.ExplorerTab>
			<TabHeader />
			<Directory
				child={rootFiles}
				depth={1}
				handleClick={handleSelectFile}
			/>
		</Styled.ExplorerTab>
	);
}

export default ExplorerTab;
