import React, { useState } from 'react';
import * as Styled from './style';
import FileTab from '../FileTab';

const DEFAULT_OPENED_FILE_INDEX = 0;

function FileTabBar() {
    const [ clickedIndex, setClickedIndex ] = useState(DEFAULT_OPENED_FILE_INDEX);

    const files = [
		{
			name: 'index.html',
			type: 'html',
			icon: 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/html.svg'
		},
		{
			name: 'index.js',
			type: 'js',
			icon: 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/javascript.svg'
		},
		{
			name: 'app.js',
			type: 'js',
			icon: 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/javascript.svg'
		},
		{
			name: 'app.css',
			type: 'css',
			icon: 'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/css.svg'
		},
	];

    const handleSetClickedIndex = (index) => setClickedIndex(index);

    return (
		<Styled.TabBar>
			{files.map(({ name, icon, type }, index) => {
				return (
					<FileTab
						key={index}
						index={index}
						FileName={name}
						icon={icon}
						type={type}
						className={index === clickedIndex ? 'clicked' : ''}
						onClick={handleSetClickedIndex}
					/>
				);
			})}
		</Styled.TabBar>
	);
}

export default FileTabBar;