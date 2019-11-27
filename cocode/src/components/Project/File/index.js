import React, { useState, useRef } from 'react';
import * as Styled from './style';

import {
	EditIcon,
	DeleteIcon,
	NewFolderIcon,
	NewFileIcon
} from 'components/Project/ExplorerTabIcons';

import { selectAllTextAboutFocusedDom } from 'utils/domControl';

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

function File({
	_id,
	type,
	name,
	depth,
	handleClick,
	handleEditFimeName,
	...props
}) {
	const [fileName, setFileName] = useState(name);
	const [toggleEdit, setToggleEdit] = useState(false);
	const nameEditReferenece = useRef(null);

	const src = FILE_IMAGES[type];

	// Event handlers
	const handleFileNameChange = e => {
		const changedName = e.currentTarget.textContent;
		setFileName(changedName);
	};

	const handleEditFileNameStart = e => {
		e.stopPropagation();

		const nameEditNode = nameEditReferenece.current;
		setToggleEdit(!toggleEdit);
		nameEditNode.contentEditable = !toggleEdit;
		nameEditNode.focus();
	};

	const handleEditFileNameEnd = () => {
		handleEditFimeName(fileName);
		setToggleEdit(!toggleEdit);
		nameEditReferenece.current.contentEditable = !toggleEdit;
	};

	return (
		<Styled.File
			toggleEdit={toggleEdit}
			depth={depth}
			onClick={handleClick ? handleClick : undefined}
			{...props}
		>
			<Styled.Icon src={src} alt={`${name}_${type}`} />
			<Styled.NameEdit
				ref={nameEditReferenece}
				onInput={handleFileNameChange}
				onFocus={selectAllTextAboutFocusedDom}
				onBlur={handleEditFileNameEnd}
			>
				{fileName}
			</Styled.NameEdit>
			<Styled.SideIcons className="Side-icons-visibility">
				<EditIcon onClick={handleEditFileNameStart} />
				{isFolder(type) && (
					<>
						<NewFolderIcon />
						<NewFileIcon />
					</>
				)}
				<DeleteIcon />
			</Styled.SideIcons>
		</Styled.File>
	);
}

export default File;
