import React from 'react';
import * as Styled from './style';

import {
	EditIcon,
	DeleteIcon,
	NewFolderIcon,
	NewFileIcon
} from 'components/Project/ExplorerTabIcons';

function isFolder(type) {
	return type.substring(0, 6) === 'folder';
}

function File({
	type,
	src,
	depth,
	name,
	handleEditName,
	handleCreateNewFolder,
	handleCreateNewFile,
	handleDelete
}) {
	return (
		<Styled.File depth={depth}>
			<Styled.Icon src={src} alt={`${name}_${type}`} />
			<Styled.Name>{name}</Styled.Name>
			<Styled.SideIcons className="Side-icons-visibility">
				<EditIcon onClick={handleEditName} />
				{isFolder(type) && (
					<NewFolderIcon onClick={handleCreateNewFolder} />
				)}
				{isFolder(type) && (
					<NewFileIcon onClick={handleCreateNewFile} />
				)}
				<DeleteIcon onClick={handleDelete} />
			</Styled.SideIcons>
		</Styled.File>
	);
}

export default File;
