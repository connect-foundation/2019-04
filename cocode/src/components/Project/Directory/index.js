import React, { useState, useContext } from 'react';

import File from 'components/Project/File';
import NewFile from 'components/Project/NewFile';

import ProjectContext from 'contexts/ProjectContext';

function Directory({ path, childPaths, depth, handleSelectFile, ...props }) {
	const {
		project: { files, selectedFilePath }
	} = useContext(ProjectContext);
	const [isNewFileCreating, setIsNewFileCreating] = useState(false);
	const [createFileType, setCreateFileType] = useState(null);

	// Functions
	const isNotRoot = depth => depth !== 1;
	const filePathToFile = path => files[path];
	const isDirectory = ({ type }) => type === 'directory';
	const isFile = ({ type }) => type !== 'directory';
	const isSelected = path => selectedFilePath === path;

	// Variables
	const directoryList = childPaths
		? childPaths.map(filePathToFile).filter(isDirectory)
		: [];
	const fileList = childPaths
		? childPaths.map(filePathToFile).filter(isFile)
		: [];

	// Evnet handler
	const handleEditFimeName = changedName => {
		props.handleEditFileName(path, changedName);
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
					path={path}
					handleCreateFile={handleCreateFile}
					handleEditFimeName={handleEditFimeName}
					{...files[path]}
				/>
			)}
			{/* 이 Directory에 속한 Directory 목록 */
			directoryList.map(({ path }) => {
				return (
					<Directory
						key={'directory_' + path}
						path={path}
						childPaths={files[path].childPaths}
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
					parentPath={path}
					handleEndCreateFile={handleEndCreateFile}
				/>
			)}
			{/* 이 Directory에 속한 File들 */
			fileList.map(({ path }) => {
				const handleEditFimeName = changedName => {
					props.handleEditFileName(path, changedName);
				};

				return (
					<File
						key={'file' + path}
						path={path}
						isDirectory={false}
						className={isSelected(path) && 'Is-selected-file'}
						depth={depth}
						handleEditFimeName={handleEditFimeName}
						handleSelectFile={handleSelectFile}
						handleCreateFile={handleCreateFile}
						{...files[path]}
					/>
				);
			})}
		</div>
	);
}

export default Directory;
