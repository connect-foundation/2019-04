import React, { useState, useContext } from 'react';

import File from 'components/Project/File';
import NewFile from 'components/Project/NewFile';

import ProjectContext from 'contexts/ProjectContext';

function Directory({
	id,
	path,
	childIds,
	depth,
	handleSelectFile,
	handleDeleteFile,
	...props
}) {
	const {
		project: { files, selectedFileId }
	} = useContext(ProjectContext);
	const [isNewFileCreating, setIsNewFileCreating] = useState(false);
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

	return (
		<div className="DropZone">
			{/* Directory type file */
			isNotRoot(depth) && (
				<File
					isDirectory={true}
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
		</div>
	);
}

export default Directory;
