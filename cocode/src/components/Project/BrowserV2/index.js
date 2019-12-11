import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';

import ProjectContext from 'contexts/ProjectContext';

import { installDependencyActionCreator } from 'actions/Project';

import { updateFileAPICreator } from 'apis/File';

import useFetch from 'hooks/useFetch';

import getUpdatedPackageJSON from 'pages/Project/getUpdatedPackageJSON';

// Constants
const MIN_WAIT_TIME = 1500;
const UPDATE_CODE = 'updateFile';
const INSTALL_DEPENDENCY = 'installDependency';

function BrowserV2({ ...props }) {
	const { projectId } = useParams();

	const { project, dispatchProject } = useContext(ProjectContext);
	const [{ data, error }, setRequest] = useFetch({});
	const [isReadyToReceiveMessage, setIsReadyToReceiveMessage] = useState(
		false
	);
	const [dependency, setDependency] = useState(undefined);
	const iframeReference = useRef();

	const { files, root, dependencyInstalling } = project;

	const handleComponentDidMount = () => {
		window.addEventListener('message', receiveMsgFromChild);
	};

	const receiveMsgFromChild = e => {
		const { command } = e.data;

		if (command !== INSTALL_DEPENDENCY) return;

		const { dependency } = e.data;

		const {
			newPackageJSONContents,
			packageJSONFileId
		} = getUpdatedPackageJSON(files, root, dependency);

		const updateFileAPI = updateFileAPICreator(
			projectId,
			packageJSONFileId,
			{
				contents: newPackageJSONContents
			}
		);
		setRequest(updateFileAPI);
		setDependency(dependency);
	};

	const handleUpdateDependency = () => {
		if (!isReadyToReceiveMessage) return;
		if (!dependencyInstalling) return;

		const dependency = dependencyInstalling;
		const data = {
			command: INSTALL_DEPENDENCY,
			dependency
		};
		iframeReference.current.contentWindow.postMessage(data, '*');
	};

	const handleUpdateFile = () => {
		if (!isReadyToReceiveMessage) return;
		const data = {
			command: UPDATE_CODE,
			fileId: project.selectedFileId,
			file: project.files[project.selectedFileId]
		};
		iframeReference.current.contentWindow.postMessage(data, '*');
	};

	const handleSuccessResponse = () => {
		if (!data) return;

		setDependency(undefined);

		setTimeout(() => {
			const installDependencyAction = installDependencyActionCreator({
				moduleName: dependency.name,
				moduleVersion: dependency.version
			});
			dispatchProject(installDependencyAction);
		}, MIN_WAIT_TIME);
	};

	const handleErrorResponse = () => {
		if (!error) return;
		console.log('error: update package json');
	};

	useEffect(handleComponentDidMount, []);
	useEffect(handleUpdateDependency, [dependencyInstalling]);
	useEffect(handleUpdateFile, [files]);

	useEffect(handleSuccessResponse, [data]);
	useEffect(handleErrorResponse, [error]);

	return (
		<Styled.Frame>
			<Styled.BrowserV2
				ref={iframeReference}
				src={`/coconut/${projectId}`}
				onLoad={() => {
					setIsReadyToReceiveMessage(true);
				}}
				{...props}
			></Styled.BrowserV2>
		</Styled.Frame>
	);
}

export default BrowserV2;
