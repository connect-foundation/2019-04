import * as React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import * as Styled from './style';

import ProjectContext from 'contexts/ProjectContext';
import { createFileActionCreator } from 'actions/Project';

import { changeDivEditable } from 'utils/domControl';

import FileImagesSrc from 'constants/fileImagesSrc';
import { KEY_CODE_ENTER } from 'constants/keyCode';

function NewFile({ depth, type, parentDirectoryId, handleEndCreateFile }) {
	const {
		project: { files },
		dispatchProject
	} = useContext(ProjectContext);
	const [fileName, setFileName] = useState('');
	const fileNameInputReferenece = useRef(null);

	const writeEnd = e => {
		const name = e.currentTarget.textContent;

		const isDuplicated = Object.values(files)
			.map(file => file.name)
			.some(fileName => fileName === name);
		if (isDuplicated) {
			e.preventDefault();
			return;
		}

		const createFileAction = createFileActionCreator({
			name,
			parentDirectoryId,
			type
		});

		dispatchProject(createFileAction);
		changeDivEditable(fileNameInputReferenece.current, false);
	};

	const handleWriteFileName = ({ currentTarget: { textContent } }) => {
		setFileName(textContent);
	};

	const handleBlur = () => handleEndCreateFile();

	const handleKeyDown = e => {
		if (e.keyCode === KEY_CODE_ENTER) writeEnd(e);
	};

	useEffect(() => {
		fileNameInputReferenece.current.focus();
	}, []);

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
