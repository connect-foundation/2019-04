import React, { useState, useContext, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as Styled from './style';

import FileTabBar from 'components/Project/FileTabBar';
import MonacoEditor from 'components/Project/MonacoEditor';

import { UserContext, ProjectContext } from 'contexts';
import {
	updateCodeActionCreator,
	saveFileActionCreator
} from 'actions/Project';

import useFetch from 'hooks/useFetch';
import { updateFileAPICreator } from 'apis/File';
import { forkProjectAPICreator } from 'apis/Project';

import parseProject from './parseProject';
import { isPressCtrlAndS } from 'utils/keyDownEvent';

// Constatnts
let timer;
const DEBOUNCING_TIME = 1000;

function Editor() {
	const history = useHistory();
	const { user } = useContext(UserContext);
	const { projectId } = useParams();
	const { project, dispatchProject } = useContext(ProjectContext);
	const [code, setCode] = useState(project.editingCode);
	const [isEditorMounted, setIsEditorMounted] = useState(false);
	const [{ status }, setRequest] = useFetch({});
	const [tmpProject, setProject] = useState(false);

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

	const handleForkCoconut = () => {
		const parsingProject = parseProject(project, user);

		setProject(parsingProject);
		const forkProjectInfoAPI = forkProjectAPICreator(parsingProject);
		setRequest(forkProjectInfoAPI);

		return project;
	};

	useEffect(() => {
		if (status === 201) {
			history.push(`../project/${tmpProject._id}`);
		}
	}, [history, status, tmpProject._id]);

	const handleOnKeyDown = e => {
		if (isPressCtrlAndS(e)) {
			e.preventDefault();
			const { files, selectedFileId } = project;
			if (files[selectedFileId].isEditing) {
				if (user.username !== project.author) {
					handleForkCoconut();
					return;
				}

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
