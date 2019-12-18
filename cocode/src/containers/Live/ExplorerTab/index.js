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
	updateFileNameActionCreator,
	deleteFileActionCreator,
	moveFileActionCreator
} from 'actions/Project';

const TAB_TITLE = 'EXPLORER';

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
	const { files, root } = project;
	const childIdsInRoot = files[root].child;

	const handleCreateFile = type => {
		setCreateFileType(type);
		setIsNewFileCreating(true);
	};

	const handleEndCreateFile = () => setIsNewFileCreating(false);

	const handleSelectFile = selectedFileId => {
		const selectFileAction = selectFileActionCreator({ selectedFileId });
		dispatchProject(selectFileAction);
	};

	const handleEditFileName = (selectedFileId, changedName) => {
		const updateFileNameAction = updateFileNameActionCreator({
			selectedFileId,
			changedName
		});
		dispatchProject(updateFileNameAction);
	};

	const handleDeleteFile = deleteFileId => {
		const deleteFileAction = deleteFileActionCreator({ deleteFileId });
		dispatchProject(deleteFileAction);
	};

	const handleMoveFile = (directoryId, fileId) => {
		const moveFileAction = moveFileActionCreator({
			directoryId,
			fileId
		});
		dispatchProject(moveFileAction);
	};

	return (
		<>
			<TabHeader handleCreateFile={handleCreateFile} />
			{isNewFileCreating && (
				<NewFile
					depth={1}
					type={createFileType}
					parentId={root}
					handleEndCreateFile={handleEndCreateFile}
				/>
			)}
			<Styled.TabBody>
				<Directory
					id={root}
					childIds={childIdsInRoot}
					depth={1}
					handleSelectFile={handleSelectFile}
					handleEditFileName={handleEditFileName}
					handleDeleteFile={handleDeleteFile}
					handleMoveFile={handleMoveFile}
				/>
			</Styled.TabBody>
		</>
	);
}

export default ExplorerTab;
