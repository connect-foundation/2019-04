import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import ProjectReducer from 'reducers/ProjectReducer';

import * as bundler from 'bundler';

import {
	checkSupportBrowser,
	connectToIDB,
	updateData,
	getData,
	getDataFilterByKeys
} from 'indexedDB';

import useFetch from 'hooks/useFetch';

import { getModule } from 'apis/Dependency';
import { getProjectInfoAPICreator } from 'apis/Project';

import {
	fetchProjectActionCreator,
	cloneProjectActionCreator
} from 'actions/Project';

const COCONUT_IDBNAME = 'Coconut';
const DEPENDENCY_IDBNAME = 'Dependency';

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

	/* Coconut Build Life cycle */
	// Component did mount
	const handleComponentDidMount = useCallback(() => {
		if (!checkSupportBrowser()) return;
		window.addEventListener('message', receiveMsgFromCocode);

		const successHandler = connection => {
			setProjectIDBConnection(connection);
		};
		connectToIDB({
			idbName: COCONUT_IDBNAME,
			successHandler
		});

		return cleanUpComponent;
	}, []);

	const cleanUpComponent = useCallback(() => {
		projectIDBConnection && projectIDBConnection.close();
		dependencyIDBConnection && dependencyIDBConnection.close();

		setProjectIDBConnection(undefined);
		setDependencyIDBConnection(undefined);
	}, [projectIDBConnection, dependencyIDBConnection]);

	const receiveMsgFromCocode = useCallback(({ data }) => {
		if (!data.command) return;
		setMessageFromCocode(data);
	}, []);

	// Check project data in IDB
	const handleCheckProjectData = useCallback(() => {
		if (!projectIDBConnection) return;

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
	}, [projectIDBConnection]);

	const fetchProject = useCallback(() => {
		const getProjectInfoAPI = getProjectInfoAPICreator(projectId);
		setFetchProjectRequest(getProjectInfoAPI);
	}, []);

	// Response about fetch project to server
	const handleFetchProjectResponse = useCallback(() => {
		const { data, error } = fetchProjectRequest;
		if (error) {
			console.log('error: fail to fetch project');
			return;
		}

		if (!data) return;

		const fetchProjectAction = fetchProjectActionCreator({ project: data });
		dispatchProject(fetchProjectAction);
	}, [fetchProjectRequest]);

	// After project data fetch
	const handleProjectFetched = useCallback(() => {
		if (!project) return;
		if (messageFromCocode) {
			setMessageFromCocode(undefined);
			buildProject();
			return;
		}

		const successHandler = connection => {
			setDependencyIDBConnection(connection);
		};
		connectToIDB({
			idbName: DEPENDENCY_IDBNAME,
			successHandler
		});
	}, [project, messageFromCocode]);

	// Check dependency in IDB
	const handleCheckDependency = useCallback(() => {
		if (!dependencyIDBConnection) return;
		const { dependency } = project;

		const successHandler = result => {
			const { installed, needToInstall } = result;

			Object.entries(installed).forEach(([_, value]) => {
				Object.entries(value).forEach(([key, value]) => {
					fileSystem[key] = value;
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
	}, [dependencyIDBConnection]);

	// After check dependency : install dependency from server
	const handleInstallDependency = useCallback(() => {
		if (!needToInstallDependency) return;
		if (needToInstallDependency.length === 0) {
			setIsReadyToBuild(true);
			return;
		}

		const [name, version] = JSON.parse(needToInstallDependency[0]);
		const getModuleAPI = getModule(name, version);
		setDependencyRequest(getModuleAPI);
	}, [needToInstallDependency]);

	// Response from server, when install dependency
	const handleInstallDependencyResponse = useCallback(() => {
		const { data, error } = dependencyRequest;
		if (error) {
			console.log('error: fail to install dependency');
			return;
		}

		if (!data) return;

		const key = needToInstallDependency[0];
		updateDependencyToIDB(key, data);

		Object.entries(data).forEach(([key, value]) => {
			fileSystem[key] = value;
		});
		setNeedToInstallDependency(
			needToInstallDependency.filter((_, index) => index !== 0)
		);
	}, [dependencyRequest, needToInstallDependency]);

	const updateDependencyToIDB = useCallback(
		(key, value) => {
			const successHandler = () => {
				/* success to update IDB */
			};
			updateData({
				idbConnection: dependencyIDBConnection,
				key,
				value,
				successHandler
			});
		},
		[dependencyIDBConnection]
	);

	// Build project
	const handleBuildProject = useCallback(() => {
		if (!isReadyToBuild) return;
		buildProject();
	}, [isReadyToBuild]);

	const buildProject = useCallback(() => {
		const { files, root } = project;

		const rootPath = files[root].path;
		if (project) fileParser(rootPath, root);

		try {
			bundler.init();
			bundler.require('./index.js');
		} catch (error) {
			console.log(error);
		}
	}, [project]);

	const fileParser = useCallback(
		(path, id) => {
			const { files } = project;

			if (files[id].type !== 'directory') {
				fileSystem[path] = {
					contents: files[id].contents
				};
				delete exports[path];
			} else if (files[id].child) {
				files[id].child.forEach(id => {
					const path = files[id].path;
					fileParser(path, id);
				});
			}
		},
		[project]
	);

	const handleMessageFromCocode = useCallback(() => {
		if (!messageFromCocode) return;
		const { command } = messageFromCocode;

		const coconutActions = { updateFile };
		coconutActions[command]();
	}, [messageFromCocode]);

	const updateFile = useCallback(() => {
		const { files } = project;
		const { fileId, file } = messageFromCocode;

		const newProject = {
			...project,
			files: {
				...files,
				[fileId]: file
			}
		};

		const cloneProjectAction = cloneProjectActionCreator({
			project: newProject
		});
		dispatchProject(cloneProjectAction);
	}, [project, messageFromCocode]);

	useEffect(handleComponentDidMount, []);
	useEffect(handleCheckProjectData, [projectIDBConnection]);
	useEffect(handleFetchProjectResponse, [fetchProjectRequest]);
	useEffect(handleProjectFetched, [project]);
	useEffect(handleCheckDependency, [dependencyIDBConnection]);
	useEffect(handleInstallDependency, [needToInstallDependency]);
	useEffect(handleInstallDependencyResponse, [dependencyRequest]);
	useEffect(handleBuildProject, [isReadyToBuild]);

	useEffect(handleMessageFromCocode, [messageFromCocode]);

	return <div id="coconut-root"></div>;
}

export default Coconut;
