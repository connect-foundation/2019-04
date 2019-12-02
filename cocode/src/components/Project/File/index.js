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

// Constants
const ACCEPT_DELETE_NOTIFICATION = '이 파일을 지우시겠습니까?';

function File({
	isDirectory,
	_id,
	type,
	name,
	depth,
	handleSelectFile,
	handleCreateFile,
	handleEditFileName,
	handleDeleteFile,
	...props
}) {
	const [fileName, setFileName] = useState(name);
	const [toggleEdit, setToggleEdit] = useState(false);
	const nameEditReferenece = useRef(null);

	// Event handlers
	const handleClick = () => handleSelectFile(_id);

	const handleEditFileNameStart = () => {
		changeDivEditable(nameEditReferenece.current, true);
		setToggleEdit(true);
	};

	const handleEditFileNameEnd = ({ currentTarget }) => {
		const changedName = currentTarget.textContent;
		setFileName(changedName);
		handleEditFileName(changedName);

		setToggleEdit(false);
		nameEditReferenece.current.contentEditable = false;
	};

	const handleDeleteFileButtonClick = e => {
		const acceptDeleteThisFile = confirm(ACCEPT_DELETE_NOTIFICATION);
		if (!acceptDeleteThisFile) return;

		e.stopPropagation();
		handleDeleteFile(_id);
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
			<Styled.Icon src={FileImagesSrc[type]} alt={`${name}_${type}`} />
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
				<DeleteIcon onClick={handleDeleteFileButtonClick} />
			</Styled.SideIcons>
		</Styled.File>
	);
}

export default File;
