import React, { useState, useContext } from 'react';

import File from 'components/Project/File';
import NewFile from 'components/Project/NewFile';

import ProjectContext from 'contexts/ProjectContext';

function Directory({ child, depth, handleSelectFile, ...props }) {
	const {
		project: { files, selectedFileId }
	} = useContext(ProjectContext);
	const [isNewFileCreating, setIsNewFileCreating] = useState(false);
	const [createFileType, setCreateFileType] = useState(null);

	// Variables
	const directoryList = child.map(fileIdToFile).filter(isDirectory);
	const fileList = child.map(fileIdToFile).filter(isFile);

	// Evnet handler
	const handleEditFimeName = changedName =>
		props.handleEditFileName(props.id, changedName);
	const handleCreateFile = type => {
		setCreateFileType(type);
		setIsNewFileCreating(true);
	};
	const handleEndCreateFile = () => setIsNewFileCreating(false);

	// Functions
	const isNotRoot = depth => depth !== 1;
	const fileIdToFile = id => files[id];
	const isDirectory = ({ type }) => type === 'directory';
	const isFile = ({ type }) => type !== 'directory';
	const isSelected = id => selectedFileId === id;

	return (
		<div className="DropZone">
			{/* Directory type file */
			isNotRoot(depth) && (
				<File
					isDirectory={true}
					depth={depth - 1}
					handleCreateFile={handleCreateFile}
					handleEditFimeName={handleEditFimeName}
					{...files[props.id]}
				/>
			)}
			{/* 이 Directory에 속한 Directory 목록 */
			directoryList.map(({ _id }) => {
				return (
					<Directory
						key={'directory' + _id}
						id={_id}
						child={files[_id].child}
						depth={depth + 1}
						handleSelectFile={handleSelectFile}
						handleEditFileName={props.handleEditFileName}
					/>
				);
			})}
			{/* 새파일 생성 버튼 클릭시 나오는 컴포넌트 */
			isNewFileCreating && (
				<NewFile
					depth={depth}
					type={createFileType}
					parentDirectoryId={props.id}
					handleEndCreateFile={handleEndCreateFile}
				/>
			)}
			{/* 이 Directory에 속한 File들 */
			fileList.map(({ _id }) => {
				const handleEditFimeName = changedName =>
					props.handleEditFileName(_id, changedName);

				return (
					<File
						key={'file' + _id}
						isDirectory={false}
						className={isSelected(_id) && 'Is-selected-file'}
						depth={depth}
						handleEditFimeName={handleEditFimeName}
						handleSelectFile={handleSelectFile}
						handleCreateFile={handleCreateFile}
						{...files[_id]}
					/>
				);
			})}
		</div>
	);
}

export default Directory;
