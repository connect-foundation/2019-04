import React from 'react';
import * as Styled from './style';

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

function ExplorerTab() {
	return (
		<Styled.ExplorerTab>
			<Styled.Title>{TabTitle}</Styled.Title>
			{mockData.map(({ type, src, depth, name }, index) => {
				return (
					<Styled.File key={index} depth={depth}>
						<Styled.Icon src={src} alt={type} />
						<Styled.Name>{name}</Styled.Name>
					</Styled.File>
				);
			})}
		</Styled.ExplorerTab>
	);
}

export default ExplorerTab;
