import React, { useState, useRef, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';

import addToast from 'components/Common/Toast';
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
import * as NOTIFICATION from 'constants/notificationMessage';

import useFetch from 'hooks/useFetch';

import { deleteFileAPICreator, updateFileAPICreator } from 'apis/File';

import { DELETE_FILE, UPDATE_FILE_NAME } from 'actions/types';

import ProjectContext from 'contexts/ProjectContext';

// Constants
const API_NOTIFICATION = {
	[DELETE_FILE]: NOTIFICATION.FAIL_TO_DELETE_FILE,
	[UPDATE_FILE_NAME]: NOTIFICATION.FAIL_TO_UPDATE_FILE_NAME
};

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
		[UPDATE_FILE_NAME]: () => {
			const changedName = nameEditReferenece.current.textContent;
			setFileName(changedName);
			handleEditFileName(changedName);
		}
	};

	// Event handlers
	const handleClick = () => handleSelectFile(_id);

	const handleEditFileNameStart = e => {
		e.stopPropagation();
		if (isProtectedFile) {
			addToast.error(NOTIFICATION.FILE_IS_NOT_EDITABLE);
			return;
		}

		changeDivEditable(nameEditReferenece.current, true);
		setToggleEdit(true);
	};

	const handleEditFileNameEnd = ({ currentTarget }) => {
		setToggleEdit(false);
		currentTarget.contentEditable = false;
		const changedName = currentTarget.textContent;
		const updateFileId = _id;

		if (isNotChangeableFileName({ files, parentId, changedName })) {
			currentTarget.textContent = fileName;
			addToast.error(NOTIFICATION.FILE_IS_DUPLICATED);
			return;
		}

		const updateFileAPI = updateFileAPICreator(projectId, updateFileId, {
			name: changedName
		});

		setRequest(updateFileAPI);
		setRequestedAPI(UPDATE_FILE_NAME);
	};

	const handleDeleteFileButtonClick = e => {
		e.stopPropagation();
		if (isProtectedFile) {
			addToast.error(NOTIFICATION.FILE_IS_NOT_REMOVABLE);
			return;
		}

		const acceptDeleteThisFile = confirm(NOTIFICATION.CONFIRM_DELETE_FILE);
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
		if (!error) return;
		addToast.error(API_NOTIFICATION[requestedAPI]);
		setRequestedAPI(null);
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
