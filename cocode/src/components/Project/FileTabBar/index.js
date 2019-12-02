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
	const handleCloseFile = (e, index) => {
		if (index === openFiles.length - 1 && index && clickedIndex === index)
			setClickedIndex(index - 1);
		if (openFiles.length === 1) {
			const selectFileAction = selectFileActionCreator({
				selectedFilePath: undefined
			});
			dispatchProject(selectFileAction);
		}
		setOpenFiles(openFiles.filter((file, i) => i !== index));
		e.stopPropagation();
	};

	const addOpenedFile = () => {
		if (!selectedFilePath) return;
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
		} else if (openFiles[clickedIndex - 1]) {
			setClickedIndex(clickedIndex - 1);
		}
	};

	useEffect(addOpenedFile, [selectedFilePath]);
	useEffect(setOpenedFile, [clickedIndex, openFiles]);

	return (
		<Styled.TabBar>
			{openFiles.map(({ name, type }, index) => {
				return (
					<FileTab
						key={'openFile' + index}
						index={index}
						fileName={name}
						icon={FileImagesSrc[type]}
						type={type}
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
