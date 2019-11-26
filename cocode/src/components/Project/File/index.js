import React, { useEffect } from 'react';
import * as Styled from './style';

import {
	EditIcon,
	DeleteIcon,
	NewFolderIcon,
	NewFileIcon
} from 'components/Project/ExplorerTabIcons';

const FILE_IMAGES = {
	directory: 'https://codesandbox.io/static/media/folder.30a30d83.svg',
	directoryOpen:
		'https://codesandbox.io/static/media/folder-open.df474ba4.svg',
	js:
		'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/javascript.svg',
	css:
		'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/css.svg',
	html:
		'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/html.svg',
	npm:
		'https://cdn.jsdelivr.net/gh/PKief/vscode-material-icon-theme@master/icons/npm.svg'
};

function isFolder(type) {
	return type.substring(0, 9) === 'directory';
}

function File({ type, name, depth, handleClick, ...props }) {
	const src = FILE_IMAGES[type];

	return (
		<Styled.File
			depth={depth}
			onClick={handleClick ? handleClick : undefined}
			{...props}
		>
			<Styled.Icon src={src} alt={`${name}_${type}`} />
			<Styled.Name>{name}</Styled.Name>
			<Styled.SideIcons className="Side-icons-visibility">
				<EditIcon />
				{isFolder(type) && <NewFolderIcon />}
				{isFolder(type) && <NewFileIcon />}
				<DeleteIcon />
			</Styled.SideIcons>
		</Styled.File>
	);
}

export default File;
