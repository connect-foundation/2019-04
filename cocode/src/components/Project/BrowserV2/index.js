import React, {
	useState,
	useEffect,
	useContext,
	useRef,
	useCallback
} from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';

import open from './open.svg';
import search from './search.svg';
import addToast from 'components/Common/Toast';

import { ProjectContext } from 'contexts';

import { installDependencyActionCreator } from 'actions/Project';

import { updateFileAPICreator } from 'apis/File';

import useFetch from 'hooks/useFetch';

import getUpdatedPackageJSON from 'pages/Project/getUpdatedPackageJSON';

import { COCONUT_SERVER } from 'config';

import * as NOTIFICATION from 'constants/notificationMessage';
import { KEY_CODE_ENTER } from 'constants/keyCode';

// Constants
const MIN_WAIT_TIME = 1500;
const UPDATE_PROJECT = 'updateProject';
const PROTOCOLS = ['http://', 'https://'];
const NEW_COCONUT = `${COCONUT_SERVER}/new`;

function BrowserV2({ ...props }) {
	const { projectId } = useParams();

	const DEFAULT_URL = `${COCONUT_SERVER}/${projectId}`;

	const { project, dispatchProject } = useContext(ProjectContext);
	const [{ data, error }, setRequest] = useFetch({});
	const [isReadyToReceiveMessage, setIsReadyToReceiveMessage] = useState(
		false
	);
	const [dependency, setDependency] = useState(undefined);
	const [addressInputURL, setAddressInput] = useState(DEFAULT_URL);

	const iframeReference = useRef();
	const addressReference = useRef();

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

	const isHaveProtocol = (value) =>
		PROTOCOLS.some(PROTOCOL => value.includes(PROTOCOL));

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

	const handleAddressInputKeyDown = ({ keyCode, target: { value } }) => {
		if (keyCode === KEY_CODE_ENTER) {
			const address = isHaveProtocol(value) ? value : `${PROTOCOLS[0]}${value}`;
			setAddressInput(address);
			addressReference.current.value = address;
		}
	};

	const handleChangeCurrentURL = () => {
		const address = `${COCONUT_SERVER}/${projectId}`;
		setAddressInput(address);
		addressReference.current.value = address;
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

	const handleClickOpenTab = () => {
		const coconutUrl = addressReference.current.value;
		if (NEW_COCONUT === coconutUrl)
			return addToast.error(NOTIFICATION.NEED_TO_SAVE);
		window.open(coconutUrl, '_blank');
	};

	useEffect(handleChangeCurrentURL, [projectId]);
	useEffect(handleUpdateDependency, [dependencyInstalling]);
	useEffect(handleUpdateFile, [files]);

	useEffect(handleSuccessResponse, [data]);
	useEffect(handleErrorResponse, [error]);

	return (
		<Styled.Frame>
			<Styled.AddressContainer>
				<Styled.SearchIcon src={search} />
				<Styled.AddressInput
					type="url"
					ref={addressReference}
					defaultValue={addressInputURL}
					onKeyUp={handleAddressInputKeyDown}
				/>
				<Styled.OpenIcon
					src={open}
					alt="Open New Tab"
					title="Open New Tab"
					onClick={handleClickOpenTab}
				/>
			</Styled.AddressContainer>
			<Styled.BrowserV2
				ref={iframeReference}
				src={addressInputURL}
				onLoad={handleIframeOnLoad}
				{...props}
			/>
		</Styled.Frame>
	);
}

export default BrowserV2;
