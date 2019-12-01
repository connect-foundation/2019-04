import React, { useState, useContext } from 'react';
import * as Styled from './style';
import FileTab from '../FileTab';

import FileImagesSrc from 'constants/fileImagesSrc';

import ProjectContext from 'contexts/ProjectContext';

const DEFAULT_OPENED_FILE_INDEX = 0;

// TODO: 현재 하나의 파일만 바뀌어주는 것만 구현되어 있음. 추후에 파일 리스트에서 하도록 변경 필요.
function FileTabBar() {
	const { project } = useContext(ProjectContext);
	const { files, selectedFilePath } = project;

	const [clickedIndex, setClickedIndex] = useState(DEFAULT_OPENED_FILE_INDEX);
	//TODO 현재 더미데이터 fileList를 넣은 값으로, 추후 props에서 넘겨온 openFileList가 초기값이 될 예정입니다.
	const [openFiles, setOpenFiles] = useState([selectedFilePath]);

	const handleSetClickedIndex = index => setClickedIndex(index);
	const handleCloseFile = index =>
		setOpenFiles(openFiles.filter((file, i) => i !== index));

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
