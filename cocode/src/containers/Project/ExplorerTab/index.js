import React from 'react';
import * as Styled from './style';

import {
	NewFolderIcon,
	NewFileIcon
} from 'components/Project/ExplorerTabIcons';

import File from 'components/Project/File';

const TabTitle = 'EXPLOLER';

const mockData = [
	{
		type: 'folder',
		src: 'https://codesandbox.io/static/media/folder.30a30d83.svg',
		depth: 1,
		name: 'public'
	},
	{
		type: 'folder_open',
		src: 'https://codesandbox.io/static/media/folder-open.df474ba4.svg',
		depth: 1,
		name: 'src'
	},
	{
		type: 'javascript',
		src:
			'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/javascript.svg',
		depth: 2,
		name: 'index.js'
	}
];

function TabHeader() {
	return (
		<Styled.TabHeader>
			<Styled.Title>{TabTitle}</Styled.Title>
			<Styled.SideIcons className="Tab-header-Side-icons">
				<NewFolderIcon></NewFolderIcon>
				<NewFileIcon></NewFileIcon>
			</Styled.SideIcons>
		</Styled.TabHeader>
	);
}

function ExplorerTab() {
	// temp handler
	const handleEditName = index => console.log('edit', index);
	const handleCreateNewFolder = () => console.log('create folder');
	const handleCreateNewFile = () => console.log('create file');
	const handleDelete = index => console.log('delete', index);

	return (
		<Styled.ExplorerTab>
			<TabHeader />
			{mockData.map((data, index) => {
				return (
					<File
						key={`file_${index}`}
						index={index}
						handleEditName={handleEditName}
						handleCreateNewFolder={handleCreateNewFolder}
						handleCreateNewFile={handleCreateNewFile}
						handleDelete={handleDelete}
						{...data}
					/>
				);
			})}
		</Styled.ExplorerTab>
	);
}

export default ExplorerTab;
