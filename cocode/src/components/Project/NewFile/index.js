import * as React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import ObjectID from 'bson-objectid';
import * as Styled from './style';

import addToast from 'components/Common/Toast';

import { ProjectContext } from 'contexts';
import { createFileActionCreator } from 'actions/Project';

import { getFileExtension } from 'utils';
import { changeDivEditable } from 'utils/domControl';

import FileImagesSrc from 'constants/fileImagesSrc';
import { KEY_CODE_ENTER } from 'constants/keyCode';
import * as NOTIFICATION from 'constants/notificationMessage';

import useFetch from 'hooks/useFetch';

import { createFileAPICreator } from 'apis/File';

function NewFile({ depth, type, parentId, handleEndCreateFile }) {
	const { projectId } = useParams();

	const {
		project: { files },
		dispatchProject
	} = useContext(ProjectContext);
	const [fileName, setFileName] = useState('');
	const fileNameInputReference = useRef(null);
	const [{ data, error }, setRequest] = useFetch({});

	const isIncorrectFileName = fileName => {
		return (
			fileName.trim() === '' ||
			files[parentId].child
				.map(id => files[id].name)
				.some(name => name === fileName)
		);
	};

	const updateFileState = newFileId => {
		const createFileAction = createFileActionCreator({
			newFileId,
			name: fileName,
			parentId,
			type
		});
		dispatchProject(createFileAction);
		changeDivEditable(fileNameInputReference.current, false);
	};

	const requestCreateFile = e => {
		const name = e.currentTarget.textContent;
		if (isIncorrectFileName(name)) {
			e.preventDefault();
			addToast.error(NOTIFICATION.FILE_NAME_IS_INCORRECT);
			return;
		}

		if (projectId === 'new') {
			const newFileId = ObjectID().str;
			updateFileState(newFileId);

			return;
		}

		const createFileAPI = createFileAPICreator(projectId, {
			name,
			parentId,
			type: type === 'directory' ? type : getFileExtension(name)
		});
		setRequest(createFileAPI);
	};

	const handleWriteFileName = ({ currentTarget: { textContent } }) => {
		setFileName(textContent);
	};

	const handleBlur = () => handleEndCreateFile();

	const handleKeyDown = e => {
		if (e.keyCode === KEY_CODE_ENTER) {
			requestCreateFile(e);
			e.preventDefault();
		}
	};

	const handleSetNewFileState = () => {
		if (!data) return;

		const { newFileId } = data;
		updateFileState(newFileId);
	};

	const handleErrorResponse = () => {
		if (!error) return;
		addToast.error(NOTIFICATION.FAIL_TO_CREATE_FILE);
		changeDivEditable(fileNameInputReference.current, false);
	};

	useEffect(() => {
		fileNameInputReference.current.focus();
	}, []);
	useEffect(handleSetNewFileState, [data]);
	useEffect(handleErrorResponse, [error]);

	return (
		<Styled.NewFile depth={depth}>
			<Styled.Icon src={FileImagesSrc[type]} alt="newFile" />
			<Styled.FileNameInput
				ref={fileNameInputReference}
				onBlur={handleBlur}
				onKeyDown={handleKeyDown}
				onInput={handleWriteFileName}
				contentEditable={true}
				textContent={fileName}
			/>
		</Styled.NewFile>
	);
}

export default NewFile;
