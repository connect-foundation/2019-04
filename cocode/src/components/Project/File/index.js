import React, { useState, useRef } from 'react';
import * as Styled from './style';

import {
	EditIcon,
	DeleteIcon,
	NewFolderIcon,
	NewFileIcon
} from 'components/Project/ExplorerTabIcons';

import {
	selectAllTextAboutFocusedDom,
	changeDivEditable
} from 'utils/domControl';

import FileImagesSrc from 'constants/fileImagesSrc';
import { KEY_CODE_ENTER } from 'constants/keyCode';

function File({
	isDirectory,
	_id,
	type,
	name,
	depth,
	handleSelectFile,
	handleCreateFile,
	handleEditFimeName,
	...props
}) {
	const [fileName, setFileName] = useState(name);
	const [toggleEdit, setToggleEdit] = useState(false);
	const nameEditReferenece = useRef(null);

	const src = FileImagesSrc[type];

	// Event handlers
	const handleClick = () => handleSelectFile(_id);

	const handleEditFileNameStart = () => {
		changeDivEditable(nameEditReferenece.current, true);
		setToggleEdit(true);
	};

	const handleEditFileNameEnd = e => {
		const changedName = e.currentTarget.textContent;
		setFileName(changedName);
		handleEditFimeName(fileName);

		setToggleEdit(false);
		nameEditReferenece.current.contentEditable = false;
	};

	const handleKeyDown = e => {
		if (e.keyCode === KEY_CODE_ENTER) handleEditFileNameEnd(e);
	};

	return (
		<Styled.File
			toggleEdit={toggleEdit}
			depth={depth}
			onClick={handleSelectFile ? handleClick : undefined}
			{...props}
		>
			<Styled.Icon src={src} alt={`${name}_${type}`} />
			<Styled.NameEdit
				ref={nameEditReferenece}
				onFocus={selectAllTextAboutFocusedDom}
				onBlur={handleEditFileNameEnd}
				onKeyDown={handleKeyDown}
			>
				{fileName}
			</Styled.NameEdit>
			<Styled.SideIcons className="Side-icons-visibility">
				<EditIcon onClick={handleEditFileNameStart} />
				{isDirectory && (
					<>
						<NewFolderIcon
							onClick={handleCreateFile.bind(
								undefined,
								'directory'
							)}
						/>
						<NewFileIcon
							onClick={handleCreateFile.bind(undefined, 'file')}
						/>
					</>
				)}
				<DeleteIcon />
			</Styled.SideIcons>
		</Styled.File>
	);
}

export default File;
