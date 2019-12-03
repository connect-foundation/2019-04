import React, { useState, useContext, useEffect } from 'react';
import * as Styled from './style';
import FileTab from '../FileTab';

import FileImagesSrc from 'constants/fileImagesSrc';

import ProjectContext from 'contexts/ProjectContext';
import { selectFileActionCreator } from 'actions/Project';

const DEFAULT_OPENED_FILE_INDEX = 0;

function FileTabBar() {
	const { project, dispatchProject } = useContext(ProjectContext);
	const { files, selectedFileId } = project;

	const [clickedIndex, setClickedIndex] = useState(DEFAULT_OPENED_FILE_INDEX);
	const [openFiles, setOpenFiles] = useState([]);

	const isExistFile = index => index !== -1;
	const getIndexOfOpenFiles = ({ _id }) => _id === files[selectedFileId]._id;

	const handleSetClickedIndex = index => setClickedIndex(index);
	const handleCloseFile = (e, index) => {
		if (index === openFiles.length - 1 && index && clickedIndex === index)
			setClickedIndex(index - 1);
		if (openFiles.length === 1) {
			const selectFileAction = selectFileActionCreator({
				selectedFileId: undefined
			});
			dispatchProject(selectFileAction);
		}
		setOpenFiles(openFiles.filter((_, i) => i !== index));
		e.stopPropagation();
	};

	const addOpenedFile = () => {
		if (!selectedFileId) return;

		const currentIndex = openFiles.findIndex(getIndexOfOpenFiles);
		const newOpenedFiles = isExistFile(currentIndex)
			? openFiles
			: [...openFiles, files[selectedFileId]];
		const clickedIndex = isExistFile(currentIndex)
			? currentIndex
			: openFiles.length;
		setOpenFiles(newOpenedFiles);
		setClickedIndex(clickedIndex);
	};

	const setOpenedFile = () => {
		if (openFiles[clickedIndex]) {
			const selectFileAction = selectFileActionCreator({
				selectedFileId: openFiles[clickedIndex]._id
			});
			dispatchProject(selectFileAction);
		} else if (openFiles[clickedIndex - 1]) {
			setClickedIndex(clickedIndex - 1);
		}
	};

	const updateOpenedFile = () => {
		if (!openFiles.length) return;
		const newOpenFile = openFiles
			.map(({ _id }) => files[_id])
			.filter(file => file);
		setOpenFiles(newOpenFile);
	};

	useEffect(addOpenedFile, [selectedFileId]);
	useEffect(setOpenedFile, [clickedIndex, openFiles]);
	useEffect(updateOpenedFile, [files]);

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
