import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

import useFetch from 'hooks/useFetch';

import { deleteFileAPICreator } from 'apis/File';

import { DELETE_FILE } from 'actions/types';

// Constants
const ACCEPT_DELETE_NOTIFICATION = '이 파일을 지우시겠습니까?';
const WARNING_PREVENT_NOTIFICATION =
	'해당 파일은 이름을 변경하거나 삭제할 수 없습니다.';

function File({
	isDirectory,
	isProtectedFile,
	_id,
	parentId,
	type,
	name,
	depth,
	handleSelectFile,
	handleEditFileName,
	handleDeleteFile,
	...props
}) {
	const { projectId } = useParams();

	const [fileName, setFileName] = useState(name);
	const [toggleEdit, setToggleEdit] = useState(false);
	const [requestedAPI, setRequestedAPI] = useState(null);

	const nameEditReferenece = useRef(null);
	const [{ data, error }, setRequest] = useFetch({});

	// Variables
	const successHandler = {
		[DELETE_FILE]: handleDeleteFile
	};

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

		const deleteFileId = _id;
		const deleteFileAPI = deleteFileAPICreator(projectId, deleteFileId, {
			parentId
		});
		setRequest(deleteFileAPI);
		setRequestedAPI(DELETE_FILE);
	};

	const handleCreateFile = (type, e) => {
		e.stopPropagation();
		props.handleCreateFile(type);
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

	const handleSetFileState = () => {
		if (!requestedAPI) return;

		successHandler[requestedAPI](_id);
		setRequestedAPI(null);
	};

	const handleErrorResponse = () => {
		error && setRequestedAPI(null);
	};

	useEffect(handleSetFileState, [data]);
	useEffect(handleErrorResponse, [error]);

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
