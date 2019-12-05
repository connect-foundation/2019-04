import * as React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import * as Styled from './style';

import ProjectContext from 'contexts/ProjectContext';
import { createFileActionCreator } from 'actions/Project';

import { getFileExtension } from 'utils';
import { changeDivEditable } from 'utils/domControl';

import FileImagesSrc from 'constants/fileImagesSrc';
import { KEY_CODE_ENTER } from 'constants/keyCode';

import useFetch from 'hooks/useFetch';

import { createFileAPICreator } from 'apis/File';

function NewFile({ projectId, depth, type, parentId, handleEndCreateFile }) {
	const {
		project: { files },
		dispatchProject
	} = useContext(ProjectContext);
	const [fileName, setFileName] = useState('');
	const fileNameInputReferenece = useRef(null);
	const [{ data, error }, setRequest] = useFetch({});

	const isDuplicatedFileName = fileName => {
		return files[parentId].child
			.map(id => files[id].name)
			.some(name => name === fileName);
	};

	const requestCreateFile = e => {
		const name = e.currentTarget.textContent;
		if (isDuplicatedFileName(name)) {
			e.preventDefault();
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
		const createFileAction = createFileActionCreator({
			newFileId,
			name: fileName,
			parentId,
			type
		});
		dispatchProject(createFileAction);
		changeDivEditable(fileNameInputReferenece.current, false);
	};

	const handleErrorResponse = () => {
		if (!error) return;
		changeDivEditable(fileNameInputReferenece.current, false);
	};

	useEffect(() => {
		fileNameInputReferenece.current.focus();
	}, []);
	useEffect(handleSetNewFileState, [data]);
	useEffect(handleErrorResponse, [error]);

	return (
		<Styled.NewFile depth={depth}>
			<Styled.Icon src={FileImagesSrc[type]} alt="newFile" />
			<Styled.FileNameInput
				ref={fileNameInputReferenece}
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
