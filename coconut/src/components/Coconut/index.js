import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';

import * as bundler from 'bundler';

import {
	checkSupportBrowser,
	connectToIDB,
	updateData,
	getData,
	getDataFilterByKeys
} from 'indexedDB';

import CoconutSpinner from 'components/CoconutSpinner';
import Logo from 'components/Logo';

import ProjectReducer from 'reducers/ProjectReducer';

import useFetch from 'hooks/useFetch';

import { getModule } from 'apis/Dependency';
import { getProjectInfoAPICreator } from 'apis/Project';

import {
	fetchProjectActionCreator,
	cloneProjectActionCreator
} from 'actions/Project';

const COCONUT_IDBNAME = 'Coconut';
const DEPENDENCY_IDBNAME = 'Dependency';

const initilaBuildState = {
	state: 'loading',
	description: 'Please wait to build complete...'
};

const BUILD_END = 'buildEnd';

function Coconut() {
	const { projectId } = useParams();

	const [fetchProjectRequest, setFetchProjectRequest] = useFetch({});
	const [dependencyRequest, setDependencyRequest] = useFetch({});
	const [project, dispatchProject] = useReducer(ProjectReducer, undefined);
	const [projectIDBConnection, setProjectIDBConnection] = useState(undefined);
	const [dependencyIDBConnection, setDependencyIDBConnection] = useState(
		undefined
	);
	const [needToInstallDependency, setNeedToInstallDependency] = useState(
		undefined
	);
	const [isReadyToBuild, setIsReadyToBuild] = useState(false);

	const [messageFromCocode, setMessageFromCocode] = useState(undefined);

	const [buildState, setBuildState] = useState(initilaBuildState);

	/* Coconut Build Life cycle */
	// Component did mount
	const handleComponentDidMount = useCallback(() => {
		if (!checkSupportBrowser()) return;

		const cleanUpComponent = () => {
			projectIDBConnection && projectIDBConnection.close();
			dependencyIDBConnection && dependencyIDBConnection.close();

			setProjectIDBConnection(undefined);
			setDependencyIDBConnection(undefined);
		};

		const receiveMsgFromCocode = ({ data }) => {
			if (!data.command) return;
			setMessageFromCocode(data);
		};

		window.addEventListener('message', receiveMsgFromCocode);

		const successHandler = connection => {
			setProjectIDBConnection(connection);
		};
		connectToIDB({
			idbName: COCONUT_IDBNAME,
			successHandler
		});

		return cleanUpComponent;
	}, [projectIDBConnection, dependencyIDBConnection]);

	// Check project data in IDB
	const handleCheckProjectData = useCallback(() => {
		if (!projectIDBConnection) return;
		if (projectId === 'new') {
			return;
		}

		const fetchProject = () => {
			const getProjectInfoAPI = getProjectInfoAPICreator(projectId);
			setFetchProjectRequest(getProjectInfoAPI);
		};

		const successHandler = result => {
			if (!result) {
				fetchProject();
				return;
			}

			const project = result;
			const cloneProjectAction = cloneProjectActionCreator({ project });
			dispatchProject(cloneProjectAction);
		};
		getData({
			idbConnection: projectIDBConnection,
			key: projectId,
			successHandler
		});
	}, [projectId, setFetchProjectRequest, projectIDBConnection]);

	// Response about fetch project to server
	const handleFetchProjectResponse = useCallback(() => {
		const { data, error } = fetchProjectRequest;
		if (error) {
			window.parent.postMessage({ command: BUILD_END }, '*');
			setBuildState({
				state: 'error',
				description: 'Error: fail to fetch project'
			});
			return;
		}

		if (!data) return;

		const fetchProjectAction = fetchProjectActionCreator({ project: data });
		dispatchProject(fetchProjectAction);
	}, [fetchProjectRequest]);

	// After project data fetch
	const handleProjectFetched = useCallback(() => {
		if (!project) return;

		const successHandler = connection => {
			setDependencyIDBConnection(connection);
		};
		connectToIDB({
			idbName: DEPENDENCY_IDBNAME,
			successHandler
		});
	}, [project]);

	// Check dependency in IDB
	const handleCheckDependency = useCallback(() => {
		if (!dependencyIDBConnection) return;
		const { dependency } = project;

		const successHandler = result => {
			const { installed, needToInstall } = result;

			Object.entries(installed).forEach(([_, value]) => {
				Object.entries(value).forEach(([key, value]) => {
					window.fileSystem[key] = value;
				});
			});

			setNeedToInstallDependency(needToInstall);
		};

		const filterKeys = Object.values(dependency).map(({ name, version }) =>
			JSON.stringify([name, version])
		);

		getDataFilterByKeys({
			idbConnection: dependencyIDBConnection,
			filterKeys,
			successHandler
		});
	}, [project, dependencyIDBConnection]);

	// After check dependency : install dependency from server
	const handleInstallDependency = useCallback(() => {
		if (!needToInstallDependency) return;
		if (!needToInstallDependency.length) {
			setIsReadyToBuild(true);
			setNeedToInstallDependency(undefined);
			return;
		}

		const [name, version] = JSON.parse(needToInstallDependency[0]);
		const getModuleAPI = getModule(name, version);
		setDependencyRequest(getModuleAPI);
	}, [needToInstallDependency, setDependencyRequest]);

	// Response from server, when install dependency
	const handleInstallDependencyResponse = useCallback(() => {
		const { data, error } = dependencyRequest;

		if (error) {
			window.parent.postMessage({ command: BUILD_END }, '*');
			setBuildState({
				state: 'error',
				description: 'Error: fail ato install dependency'
			});
			return;
		}

		if (!data) return;

		const updateDependencyToIDB = (key, value) => {
			const successHandler = () => {
				/* success to update IDB */
			};
			updateData({
				idbConnection: dependencyIDBConnection,
				key,
				value,
				successHandler
			});
		};

		const [key] = needToInstallDependency;
		updateDependencyToIDB(key, data);

		Object.entries(data).forEach(([key, value]) => {
			window.fileSystem[key] = value;
		});
		setNeedToInstallDependency(
			needToInstallDependency.filter((_, index) => index !== 0)
		);
	}, [dependencyIDBConnection, dependencyRequest, needToInstallDependency]);

	// Build project
	const fileParser = useCallback(
		(path, id) => {
			const { files } = project;

			if (files[id].type !== 'directory') {
				window.fileSystem[path] = {
					contents: files[id].contents
				};
				delete window.exports[path];
			} else if (files[id].child) {
				files[id].child.forEach(id => {
					const path = files[id].path;
					fileParser(path, id);
				});
			}
		},
		[project]
	);

	const buildProject = useCallback(() => {
		setBuildState(initilaBuildState);
		const { files, root } = project;

		const rootPath = files[root].path;
		if (project) fileParser(rootPath, root);

		try {
			bundler.init();
			bundler.require('./index.js');

			setBuildState(undefined);
		} catch (error) {
			setBuildState({
				state: 'build error',
				description: error.stack
			});
		}

		window.parent.postMessage({ command: BUILD_END }, '*');
		setIsReadyToBuild(false);
	}, [project, fileParser]);

	const handleBuildProject = useCallback(() => {
		if (!isReadyToBuild) return;
		buildProject();
	}, [isReadyToBuild, buildProject]);

	// Handle message from parent
	const updateFile = useCallback(() => {
		const { project } = messageFromCocode;

		window.fileSystem = {};

		const cloneProjectAction = cloneProjectActionCreator({ project });
		dispatchProject(cloneProjectAction);

		window.parent.postMessage({ command: BUILD_END }, '*');
	}, [messageFromCocode]);

	const createNewProject = useCallback(() => {
		if (project) return;

		const cloneProjectAction = cloneProjectActionCreator({
			project: messageFromCocode.project
		});
		dispatchProject(cloneProjectAction);
	}, [project, messageFromCocode]);

	const handleMessageFromCocode = useCallback(() => {
		if (!messageFromCocode) return;

		const { command } = messageFromCocode;
		const coconutActions = {
			updateFile,
			createNewProject
		};
		coconutActions[command] && coconutActions[command]();
	}, [messageFromCocode, createNewProject, updateFile]);

	useEffect(handleComponentDidMount, []);
	useEffect(handleCheckProjectData, [projectIDBConnection]);
	useEffect(handleFetchProjectResponse, [fetchProjectRequest]);
	useEffect(handleProjectFetched, [project]);
	useEffect(handleCheckDependency, [dependencyIDBConnection]);
	useEffect(handleInstallDependency, [needToInstallDependency]);
	useEffect(handleInstallDependencyResponse, [dependencyRequest]);
	useEffect(handleBuildProject, [isReadyToBuild]);

	useEffect(handleMessageFromCocode, [messageFromCocode]);

	return (
		<>
			{buildState && (
				<Styled.BuildStateOverlay>
					{buildState.state === 'loading' && <CoconutSpinner />}
					{buildState.state === 'error' && <Logo />}
					<p className="Is-build-error">{buildState.description}</p>
				</Styled.BuildStateOverlay>
			)}
			<div id="coconut-root" />
		</>
	);
}

export default Coconut;
