import React, { useState, useContext } from 'react';
import * as Styled from './style';
import FileTab from '../FileTab';

import FileImagesSrc from 'constants/fileImagesSrc';

import ProjectContext from 'contexts/ProjectContext';

const DEFAULT_OPENED_FILE_INDEX = 0;

function FileTabBar() {
	const { project } = useContext(ProjectContext);
	const { files, selectedFileList } = project;

	const [clickedIndex, setClickedIndex] = useState(DEFAULT_OPENED_FILE_INDEX);
	//TODO 현재 더미데이터 fileList를 넣은 값으로, 추후 props에서 넘겨온 openFileList가 초기값이 될 예정입니다.
	const [openFiles, setOpenFiles] = useState(selectedFileList);

	const handleSetClickedIndex = index => setClickedIndex(index);
	const handleCloseFile = index =>
		setOpenFiles(openFiles.filter((file, i) => i !== index));

	return (
		<Styled.TabBar>
			{openFiles
				.map(path => files[path])
				.map(({ name, type }, index) => {
					const icon = FileImagesSrc[type];
					return (
						<FileTab
							key={index}
							index={index}
							FileName={name}
							icon={icon}
							type={type}
							className={index === clickedIndex ? 'clicked' : ''}
							onClick={handleSetClickedIndex}
							onCloseClick={handleCloseFile}
						/>
					);
				})}
		</Styled.TabBar>
	);
}

export default FileTabBar;
