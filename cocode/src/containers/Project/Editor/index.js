import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';
import { useHistory } from 'react-router-dom';

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
import { UserContext } from 'contexts';
import copyProject from 'template/copyProject';
import { forkProjectAPICreator } from 'apis/Project';

// Constatnts
let timer;
const DEBOUNCING_TIME = 1000;

const isPressCtrlAndS = e =>
	(window.navigator.platform.match('Mac') ? e.metaKey : e.ctrlKey) &&
	e.which === KEY_CODE_S;

const parseProjectForRequest = (project, user) => {
	const { dependency, entry, name, root, _id } = project;
	const projectInfo = JSON.parse(
		JSON.stringify({ dependency, entry, name, root, _id })
	);
	const files = [];
	Object.entries(project.files).forEach(([_, file]) => {
		const { child, name, projectId, type, _id, contents } = file;
		files.push({ child, name, projectId, type, _id, contents });
	});
	const parsingProject = copyProject({ ...projectInfo, files });

	parsingProject.author = user.username;

	return parsingProject;
};

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
		const parsingProject = parseProjectForRequest(project, user);

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
