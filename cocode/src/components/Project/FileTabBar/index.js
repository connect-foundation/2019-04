import React, { useState, useContext, useEffect } from 'react';
import * as Styled from './style';
import FileTab from '../FileTab';

import FileImagesSrc from 'constants/fileImagesSrc';

import ProjectContext from 'contexts/ProjectContext';
import { selectFileActionCreator } from 'actions/Project';

const DEFAULT_OPENED_FILE_INDEX = 0;

function FileTabBar() {
	const { project, dispatchProject } = useContext(ProjectContext);
	const { files, selectedFilePath } = project;

	const [clickedIndex, setClickedIndex] = useState(DEFAULT_OPENED_FILE_INDEX);
	const [openFiles, setOpenFiles] = useState([]);

	const isExistFile = idx => idx !== -1;
	const FiledIndex = openFile =>
		openFile.path === files[selectedFilePath].path;

	const handleSetClickedIndex = index => setClickedIndex(index);
	const handleCloseFile = index =>
		setOpenFiles(openFiles.filter((file, i) => i !== index));

	const addOpenedFile = () => {
		const currentIdx = openFiles.findIndex(FiledIndex);
		const newOpenedFiles = isExistFile(currentIdx)
			? openFiles
			: openFiles.concat(files[selectedFilePath]);
		const clickedIdx = isExistFile(currentIdx)
			? currentIdx
			: openFiles.length;
		setOpenFiles(newOpenedFiles);
		setClickedIndex(clickedIdx);
	};

	const setOpenedFile = () => {
		if (openFiles[clickedIndex]) {
			const selectFileAction = selectFileActionCreator({
				selectedFilePath: openFiles[clickedIndex].path
			});
			dispatchProject(selectFileAction);
		}
	};

	useEffect(addOpenedFile, [files[selectedFilePath].path]);
	useEffect(setOpenedFile, [clickedIndex]);

	// TODO icon 컨텍스트에서 관리하는 것으로 수정 필요
	const icon = FileImagesSrc[files[selectedFilePath].type];
	return (
		<Styled.TabBar>
			{openFiles.map((openFile, index) => {
				return (
					<FileTab
						key={'openFile' + index}
						index={index}
						FileName={openFile.name}
						icon={icon}
						type={openFile.type}
						clicked={clickedIndex === index}
						onClick={handleSetClickedIndex}
						onCloseClick={handleCloseFile}
					/>
				);
			})}
		</Styled.TabBar>
	);
}

export default FileTabBar;
