import React, { useState } from 'react';
import * as Styled from './style';
import FileTab from '../FileTab';

const DEFAULT_OPENED_FILE_INDEX = 0;

function FileTabBar() {
	const openFileList = [
		{
			name: 'index.html',
			type: 'html',
			icon:
				'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/html.svg'
		},
		{
			name: 'index.js',
			type: 'js',
			icon:
				'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/javascript.svg'
		},
		{
			name: 'app.js',
			type: 'js',
			icon:
				'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/javascript.svg'
		},
		{
			name: 'app.css',
			type: 'css',
			icon:
				'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/css.svg'
		}
	];

	const [clickedIndex, setClickedIndex] = useState(DEFAULT_OPENED_FILE_INDEX);
	//TODO 현재 더미데이터 fileList를 넣은 값으로, 추후 props에서 넘겨온 openFileList가 초기값이 될 예정입니다.
	const [openFiles, setOpenFiles] = useState(openFileList);

	const handleSetClickedIndex = index => setClickedIndex(index);
	const handleCloseFile = index =>
		setOpenFiles(openFiles.filter((file, i) => i !== index));

	return (
		<Styled.TabBar>
			{openFiles.map(({ name, icon, type }, index) => {
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
