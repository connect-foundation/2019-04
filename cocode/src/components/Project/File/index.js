import React, { useState, useRef, useEffect, useContext } from 'react';
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

import { deleteFileAPICreator, updateFileAPICreator } from 'apis/File';

import { DELETE_FILE, UPDATE_FILE_NAME } from 'actions/types';

import ProjectContext from 'contexts/ProjectContext';

// Constants
const ACCEPT_DELETE_NOTIFICATION = '이 파일을 지우시겠습니까?';
const WARNING_PREVENT_NOTIFICATION =
	'해당 파일은 이름을 변경하거나 삭제할 수 없습니다.';

function isNotChangeableFileName({ files, changedName, parentId }) {
	const childsOfParent = files[parentId].child;

	return childsOfParent
		.map(id => files[id].name)
		.some(name => name === changedName);
}

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

	const {
		project: { files }
	} = useContext(ProjectContext);

	// Variables
	const successHandler = {
		[DELETE_FILE]: handleDeleteFile,
		[UPDATE_FILE_NAME]: handleEditFileName
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
		currentTarget.contentEditable = false;
		const changedName = currentTarget.textContent;
		const updateFileId = _id;

		if (isNotChangeableFileName({ files, parentId, changedName })) {
			const originFileName = files[updateFileId].name;
			currentTarget.textContent = originFileName;
			return;
		}

		const updateFileAPI = updateFileAPICreator(projectId, updateFileId, {
			name: changedName
		});

		successHandler[UPDATE_FILE_NAME] = () => {
			setFileName(changedName);
			handleEditFileName(changedName);
		};

		setRequest(updateFileAPI);
		setRequestedAPI(UPDATE_FILE_NAME);
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

		if (requestedAPI === UPDATE_FILE_NAME) successHandler[requestedAPI]();
		if (requestedAPI === DELETE_FILE) successHandler[requestedAPI](_id);
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
				isEditing={files[_id].isEditing}
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
