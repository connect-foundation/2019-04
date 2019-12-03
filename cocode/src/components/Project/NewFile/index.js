import * as React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import * as Styled from './style';

import ProjectContext from 'contexts/ProjectContext';
import { createFileActionCreator } from 'actions/Project';

import { changeDivEditable } from 'utils/domControl';

import FileImagesSrc from 'constants/fileImagesSrc';
import { KEY_CODE_ENTER } from 'constants/keyCode';

function NewFile({ depth, type, parentId, handleEndCreateFile }) {
	const {
		project: { files },
		dispatchProject
	} = useContext(ProjectContext);
	const [fileName, setFileName] = useState('');
	const fileNameInputReferenece = useRef(null);

	const isDuplicatedFileName = fileName => {
		return files[parentId].child
			.map(id => files[id].name)
			.some(name => name === fileName);
	};

	const writeEnd = e => {
		const name = e.currentTarget.textContent;
		if (isDuplicatedFileName(name)) {
			e.preventDefault();
			return;
		}

		const createFileAction = createFileActionCreator({
			name,
			parentId,
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
