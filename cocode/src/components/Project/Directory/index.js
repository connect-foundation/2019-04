import React, { useState, useContext } from 'react';

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
	const handleEditFileName = changedName => {
		props.handleEditFileName(id, changedName);
	};

	const handleCreateFile = type => {
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

	return (
		<DropZone
			className="DropZone"
			height={isNotRoot(depth) ? 'auto' : '100%'}
			draggableComponentOverColor={
				isFileInDropZone
					? explorerTabContainerFileDropZoneOverBGColor
					: explorerTabContainerFileDropZoneNotOverBGColor
			}
			handleDragOver={handleDragOver}
			handleDragLeave={handleDragLeave}
			handleDrop={handleDrop}
		>
			{/* Directory type file */
			isNotRoot(depth) && (
				<File
					isDirectory={true}
					isProtectedFile={isProtectedFile({
						files,
						root,
						entry,
						fileId: id
					})}
					depth={depth - 1}
					id={id}
					handleCreateFile={handleCreateFile}
					handleEditFileName={handleEditFileName}
					handleDeleteFile={handleDeleteFile}
					{...files[id]}
				/>
			)}
			{/* 이 Directory에 속한 Directory 목록 */
			directoryList.map(({ _id }) => {
				return (
					<Directory
						key={'directory_' + _id}
						id={_id}
						childIds={files[_id].child}
						depth={depth + 1}
						handleSelectFile={handleSelectFile}
						handleEditFileName={props.handleEditFileName}
						handleDeleteFile={handleDeleteFile}
						handleMoveFile={handleMoveFile}
					/>
				);
			})}
			{/* 새파일 생성 버튼 클릭시 나오는 컴포넌트 */
			isNewFileCreating && (
				<NewFile
					depth={depth}
					type={createFileType}
					parentId={id}
					handleEndCreateFile={handleEndCreateFile}
				/>
			)}
			{/* 이 Directory에 속한 File들 */
			fileList.map(({ _id }) => {
				const handleEditFileName = changedName => {
					props.handleEditFileName(_id, changedName);
				};

				return (
					<File
						key={'file' + _id}
						id={_id}
						isProtectedFile={isProtectedFile({
							files,
							root,
							entry,
							fileId: _id
						})}
						isDirectory={false}
						className={isSelected(_id) && 'Is-selected-file'}
						depth={depth}
						handleEditFileName={handleEditFileName}
						handleSelectFile={handleSelectFile}
						handleCreateFile={handleCreateFile}
						handleDeleteFile={handleDeleteFile}
						{...files[_id]}
					/>
				);
			})}
		</DropZone>
	);
}

export default Directory;
