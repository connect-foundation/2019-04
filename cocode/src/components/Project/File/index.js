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
const WARNING_PREVENT_NOTIFICATION =
	'해당 파일은 이름을 변경하거나 삭제할 수 없습니다.';

function File({
	isDirectory,
	isProtectedFile,
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

	// Functions
	const checkThisFileIsProtected = () =>
		isProtectedFile && !alert(WARNING_PREVENT_NOTIFICATION);

	// Event handlers
	const handleClick = () => handleSelectFile(_id);

	const handleEditFileNameStart = e => {
		e.stopPropagation();
		if (checkThisFileIsProtected()) return;

		changeDivEditable(nameEditReferenece.current, true);
		setToggleEdit(true);
	};

	const handleEditFileNameEnd = ({ currentTarget }) => {
		setToggleEdit(false);
		nameEditReferenece.current.contentEditable = false;
		const changedName = currentTarget.textContent;
		setFileName(changedName);
		handleEditFileName(changedName);
	};

	const handleDeleteFileButtonClick = e => {
		e.stopPropagation();
		if (checkThisFileIsProtected()) return;

		const acceptDeleteThisFile = confirm(ACCEPT_DELETE_NOTIFICATION);
		if (!acceptDeleteThisFile) return;

		handleDeleteFile(_id);
	};

	const handleKeyDown = e => {
		if (e.keyCode === KEY_CODE_ENTER) {
			setToggleEdit(false);
			nameEditReferenece.current.contentEditable = false;
		}
	};

	const handleDragStart = e => {
		e.dataTransfer.setData('text', _id);
		e.stopPropagation();
	};

	const handleDragOver = e => e.preventDefault();

	return (
		<Styled.File
			draggable={true}
			toggleEdit={toggleEdit}
			depth={depth}
			onClick={handleSelectFile ? handleClick : undefined}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
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
