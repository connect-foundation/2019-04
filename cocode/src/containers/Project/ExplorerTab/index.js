import React, { useState, useContext } from 'react';
import * as Styled from './style';

import {
	NewFolderIcon,
	NewFileIcon
} from 'components/Project/ExplorerTabIcons';
import Directory from 'components/Project/Directory';
import NewFile from 'components/Project/NewFile';

import ProjectContext from 'contexts/ProjectContext';
import {
	selectFileActionCreator,
	updateFileNameActionCreator
} from 'actions/Project';

const TAB_TITLE = 'EXPLOLER';

function TabHeader({ handleCreateFile }) {
	return (
		<Styled.TabHeader>
			<Styled.Title>{TAB_TITLE}</Styled.Title>
			<Styled.SideIcons className="Tab-header-Side-icons">
				<NewFolderIcon
					onClick={handleCreateFile.bind(undefined, 'directory')}
				/>
				<NewFileIcon
					onClick={handleCreateFile.bind(undefined, 'file')}
				/>
			</Styled.SideIcons>
		</Styled.TabHeader>
	);
}

function ExplorerTab() {
	const [isNewFileCreating, setIsNewFileCreating] = useState(false);
	const [createFileType, setCreateFileType] = useState(null);

	const { project, dispatchProject } = useContext(ProjectContext);
	const { files, root, rootPath } = project;
	const childPathsInRoot = files[rootPath].childPaths;

	const handleCreateFile = type => {
		setCreateFileType(type);
		setIsNewFileCreating(true);
	};
	const handleEndCreateFile = () => setIsNewFileCreating(false);

	const handleSelectFile = selectedFilePath => {
		const selectFileAction = selectFileActionCreator({ selectedFilePath });
		dispatchProject(selectFileAction);
	};

	const handleEditFileName = (selectedFilePath, changedName) => {
		const updateFileNameAction = updateFileNameActionCreator({
			selectedFilePath,
			changedName
		});
		dispatchProject(updateFileNameAction);
	};

	return (
		<Styled.ExplorerTab>
			<TabHeader handleCreateFile={handleCreateFile} />
			{isNewFileCreating && (
				<NewFile
					depth={1}
					type={createFileType}
					parentPath={rootPath}
					handleEndCreateFile={handleEndCreateFile}
				/>
			)}
			<Styled.TabBody>
				<Directory
					path={rootPath}
					childPaths={childPathsInRoot}
					depth={1}
					handleSelectFile={handleSelectFile}
					handleEditFileName={handleEditFileName}
				/>
			</Styled.TabBody>
		</Styled.ExplorerTab>
	);
}

export default ExplorerTab;
