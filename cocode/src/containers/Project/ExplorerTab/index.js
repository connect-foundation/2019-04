import React, { useContext } from 'react';
import * as Styled from './style';

import {
	NewFolderIcon,
	NewFileIcon
} from 'components/Project/ExplorerTabIcons';
import Directory from 'components/Project/Directory';

import ProjectContext from 'contexts/ProjectContext';

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
	const { project } = useContext(ProjectContext);
	const { files, root } = project;
	const rootFiles = files[root].child;

	return (
		<Styled.ExplorerTab>
			<TabHeader />
			<Directory child={rootFiles} depth={1} />
		</Styled.ExplorerTab>
	);
}

export default ExplorerTab;
