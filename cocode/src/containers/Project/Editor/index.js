import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';

import FileTabBar from 'components/Project/FileTabBar';
import MonacoEditor from 'components/Project/MonacoEditor';

import ProjectContext from 'contexts/ProjectContext';
import {
	updateCodeActionCreator,
	saveFileActionCreator
} from 'actions/Project';

import useFetch from 'hooks/useFetch';

import { updateFileAPICreator } from 'apis/File';

import { KEY_CODE_S } from 'constants/keyCode';

// Constatnts
let timer;
const DEBOUNCING_TIME = 1000;

const isPressCtrlAndS = e =>
	(window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) &&
	e.which === KEY_CODE_S;

function Editor() {
	const { projectId } = useParams();
	const { project, dispatchProject } = useContext(ProjectContext);
	const [code, setCode] = useState(project.editingCode);
	const [isEditorMounted, setIsEditorMounted] = useState(false);
	const [_, setRequest] = useFetch({});

	const [fileSelectFlag, setFileSelectFlag] = useState(undefined);
	const { selectedFileId } = project;

	const handleOnChangeCodeInMonaco = (_, changedCode) => {
		if (timer) clearTimeout(timer);

		timer = setTimeout(setCode(changedCode), DEBOUNCING_TIME);
	};

	const handleChangedSelectedFile = () => setCode(project.editingCode);

	const handleRequestUpdateCode = () => {
		if (!isEditorMounted) return;

		const updateFileAPI = updateFileAPICreator(projectId, selectedFileId, {
			contents: project.editingCode
		});
		setRequest(updateFileAPI);
	};

	const handleOnKeyDown = e => {
		if (isPressCtrlAndS(e)) {
			e.preventDefault();
			const { files, selectedFileId } = project;
			if (files[selectedFileId].isEditing) {
				handleRequestUpdateCode();
				dispatchProject(saveFileActionCreator());
			}
		}
	};

	const handleUpdateCode = () => {
		if (fileSelectFlag !== selectedFileId) {
			setFileSelectFlag(selectedFileId);
			return;
		}
		const updateCodeAction = updateCodeActionCreator({
			changedCode: code
		});
		dispatchProject(updateCodeAction);
	};

	useEffect(handleUpdateCode, [code]);
	useEffect(handleChangedSelectedFile, [project.selectedFileId]);

	const handleEditorDidMount = () => {
		setIsEditorMounted(true);
	};
	return (
		<Styled.Editor>
			<FileTabBar />
			<MonacoEditor
				isFilesEmpty={!project.selectedFileId}
				code={code}
				handleUpdateCode={handleOnChangeCodeInMonaco}
				handleEditorDidMount={handleEditorDidMount}
				className="Stretch-width"
				onKeyDown={handleOnKeyDown}
			/>
		</Styled.Editor>
	);
}

export default Editor;
