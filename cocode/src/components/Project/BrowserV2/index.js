import React, {
	useState,
	useEffect,
	useContext,
	useRef,
	useCallback
} from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';

import addToast from 'components/Common/Toast';

import { ProjectContext } from 'contexts';

import { installDependencyActionCreator } from 'actions/Project';

import { updateFileAPICreator } from 'apis/File';

import useFetch from 'hooks/useFetch';

import getUpdatedPackageJSON from 'pages/Project/getUpdatedPackageJSON';

import { COCONUT_SERVER } from 'config';

import * as NOTIFICATION from 'constants/notificationMessage';

// Constants
const MIN_WAIT_TIME = 1500;
const UPDATE_PROJECT = 'updateProject';

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

	const endInstallDependency = useCallback(dependency => {
		setTimeout(() => {
			const installDependencyAction = installDependencyActionCreator({
				moduleName: dependency.name,
				moduleVersion: dependency.version
			});
			dispatchProject(installDependencyAction);
		}, MIN_WAIT_TIME);
	});

	const handleUpdateDependency = () => {
		if (!isReadyToReceiveMessage) return;
		if (!dependencyInstalling) return;

		const dependency = dependencyInstalling;
		setDependency(dependency);

		if (projectId === 'new') {
			endInstallDependency(dependency);
			return;
		}

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
	};

	const handleUpdateFile = () => {
		if (!isReadyToReceiveMessage) return;

		const data = {
			command: UPDATE_PROJECT,
			project
		};

		iframeReference.current.contentWindow.postMessage(data, '*');
	};

	const handleSuccessResponse = () => {
		if (!data) return;

		endInstallDependency(dependency);
	};

	const handleErrorResponse = () => {
		if (!error) return;
		addToast.error(NOTIFICATION.FAIL_INSTALL_DEPENDENCY);
	};

	const handleIframeOnLoad = useCallback(() => {
		setIsReadyToReceiveMessage(true);

		if (projectId !== 'new') return;
		const data = {
			command: UPDATE_PROJECT,
			project
		};

		iframeReference.current.contentWindow.postMessage(data, '*');
	}, [project]);

	useEffect(handleUpdateDependency, [dependencyInstalling]);
	useEffect(handleUpdateFile, [files]);

	useEffect(handleSuccessResponse, [data]);
	useEffect(handleErrorResponse, [error]);

	return (
		<Styled.Frame>
			<Styled.BrowserV2
				ref={iframeReference}
				src={`${COCONUT_SERVER}/${projectId}`}
				onLoad={handleIframeOnLoad}
				{...props}
			/>
		</Styled.Frame>
	);
}

export default BrowserV2;
