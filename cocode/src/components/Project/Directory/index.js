import React, { useState, useContext } from 'react';
import * as Styled from './style';

import DropZone from 'components/Common/DropZone';
import File from 'components/Project/File';
import NewFile from 'components/Project/NewFile';

import ProjectContext from 'contexts/ProjectContext';

import { EXPLORER_TAB_CONTAINER_THEME } from 'constants/theme';

// Constants
const {
	explorerTabContainerFileDropZoneOverBGColor,
	explorerTabContainerFileDropZoneNotOverBGColor
} = EXPLORER_TAB_CONTAINER_THEME;
const WARNING_PREVENT_MOVE_NOTIFICATION = '해당 파일은 이동시킬 수 없습니다.';

// src 디렉토리의 index.js, src 디렉토리, package.json은 삭제불가
function isProtectedFile({ files, root, entry, fileId }) {
	if (fileId === entry) return true;

	const entryParentId = files[entry].parentId;
	if (fileId === entryParentId) return true;

	const fileName = files[fileId].name;
	const fileParentId = files[fileId].parentId;
	if (fileName === 'package.json' && fileParentId === root) return true;

	return false;
}

function Directory({
	id,
	childIds,
	depth,
	handleSelectFile,
	handleDeleteFile,
	handleMoveFile,
	...props
}) {
	const {
		project: { files, root, entry, selectedFileId }
	} = useContext(ProjectContext);
	const [isNewFileCreating, setIsNewFileCreating] = useState(false);
	const [isFileInDropZone, setIsFileInDropZone] = useState(false);
	const [toggleDirectoryOpen, setToggleDirectoryOpen] = useState(depth === 1);
	const [createFileType, setCreateFileType] = useState(null);

	// Functions
	const isNotRoot = depth => depth !== 1;
	const fileIdToFile = id => files[id];
	const isDirectory = ({ type }) => type === 'directory';
	const isFile = ({ type }) => type !== 'directory';
	const isSelected = id => selectedFileId === id;

	// Variables
	const directoryList = childIds
		? childIds.map(fileIdToFile).filter(isDirectory)
		: [];
	const fileList = childIds ? childIds.map(fileIdToFile).filter(isFile) : [];

	// Evnet handler
	const handleToggleDirectory = () =>
		setToggleDirectoryOpen(!toggleDirectoryOpen);
	const handleEditFileName = changedName => {
		props.handleEditFileName(id, changedName);
	};

	const handleCreateFile = type => {
		setToggleDirectoryOpen(true);
		setCreateFileType(type);
		setIsNewFileCreating(true);
	};
	const handleEndCreateFile = () => setIsNewFileCreating(false);

	const handleDragOver = () => setIsFileInDropZone(true);
	const handleDragLeave = () => setIsFileInDropZone(false);
	const handleDrop = fileId => {
		setIsFileInDropZone(false);
		if (fileId === id || isProtectedFile({ files, root, entry, fileId }))
			return alert(WARNING_PREVENT_MOVE_NOTIFICATION);
		handleMoveFile(id, fileId);
	};

	// Component's props
	const dropZoneProps = {
		className: 'DropZone',
		height: isNotRoot(depth) ? 'auto' : '100%',
		draggableComponentOverColor: isFileInDropZone
			? explorerTabContainerFileDropZoneOverBGColor
			: explorerTabContainerFileDropZoneNotOverBGColor,
		handleDragOver: handleDragOver,
		handleDragLeave: handleDragLeave,
		handleDrop: handleDrop
	};

	const directoryTypeFileProps = {
		isDirectory: true,
		isOpened: toggleDirectoryOpen,
		isProtectedFile: isProtectedFile({
			files,
			root,
			entry,
			fileId: id
		}),
		depth: depth - 1,
		id,
		handleSelectFile: handleToggleDirectory,
		handleCreateFile: handleCreateFile,
		handleEditFileName: handleEditFileName,
		handleDeleteFile: handleDeleteFile,
		...files[id]
	};

	const directoryTypeFileInThisDirectoryProps = id => {
		return {
			key: 'directory_' + id,
			id,
			parentId: id,
			childIds: files[id].child,
			depth: depth + 1,
			handleSelectFile: handleSelectFile,
			handleEditFileName: props.handleEditFileName,
			handleDeleteFile: handleDeleteFile,
			handleMoveFile: handleMoveFile
		};
	};

	const newFileProps = {
		depth: depth,
		type: createFileType,
		parentId: id,
		handleEndCreateFile: handleEndCreateFile
	};

	const fileTypeFileInThisDirectoryProps = (id, handleEditFileName) => {
		return {
			key: 'file' + id,
			id,
			parentId: id,
			isProtectedFile: isProtectedFile({
				files,
				root,
				entry,
				fileId: id
			}),
			isDirectory: false,
			className: isSelected(id) && 'Is-selected-file',
			depth,
			handleEditFileName,
			handleSelectFile,
			handleCreateFile,
			handleDeleteFile,
			...files[id]
		};
	};

	return (
		<DropZone {...dropZoneProps}>
			{/* Directory type file */}
			{isNotRoot(depth) && <File {...directoryTypeFileProps} />}
			<Styled.FileList toggle={toggleDirectoryOpen}>
				{/* 이 Directory에 속한 Directory 목록 */
				directoryList.map(({ _id }) => {
					return (
						<Directory
							{...directoryTypeFileInThisDirectoryProps(_id)}
						/>
					);
				})}
				{/* 이 Directory에 속한 File들 */
				fileList.map(({ _id }) => {
					const handleEditFileName = changedName => {
						props.handleEditFileName(_id, changedName);
					};
					return (
						<File
							{...fileTypeFileInThisDirectoryProps(
								_id,
								handleEditFileName
							)}
						/>
					);
				})}
			</Styled.FileList>
			{/* 새파일 생성 버튼 클릭시 나오는 컴포넌트 */
			isNewFileCreating && <NewFile {...newFileProps} />}
		</DropZone>
	);
}

export default Directory;
