import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Styled from './style';

import CoconutSpinner from 'components/CoconutSpinner';
import Logo from 'components/Logo';

import {
	useConnectToIDB,
	useUpdateProject,
	useUpdateDependency,
	useBuildProject,
	useCommunicateCocode
} from 'hooks';

import ProjectReducer from 'reducers/ProjectReducer';

import BuildWorker from 'worker/build.worker.js';
import { requireInMain } from 'bundler/requireInMain';

const PROJECT_IDBNAME = 'Coconut';
const DEPENDENCY_IDBNAME = 'Dependency';

const BUILD_END = 'buildEnd';
const BUILD_ERROR = 'buildError';

const initilaBuildState = {
	success: false,
	loading: true,
	error: false,
	description: 'Please wait to load project...'
};

const installDependencyBuildState = {
	success: false,
	loading: true,
	error: false,
	description: 'Please wait to install dependency...'
};

const buildProjectBuildState = {
	success: false,
	loading: true,
	error: false,
	description: 'Please wait to build project...'
};

const successBuildState = {
	...initilaBuildState,
	success: true,
	loading: false
};

const loadProjectFailState = {
	success: false,
	loading: false,
	error: true,
	description: 'Fail to load project...'
};

const loadDependencyFailState = {
	success: false,
	loading: false,
	error: true,
	description: 'Fail to load dependency...'
};

const buildProjectFailState = errorPhrase => ({
	success: false,
	loading: false,
	error: true,
	description: errorPhrase
});

const scriptTemplate = innerCode => /*javascript*/ `
	try {
		${innerCode}
	} catch (error) {
		const errorDescription = error.stack;
		self.postMessage({ command: '${BUILD_ERROR}', errorDescription }, '*');
	}
`;

let worker = new BuildWorker();

function Coconut() {
	const { projectId } = useParams();

	const [innerCode, setInnerCode] = useState('');

	const [buildState, setBuildState] = useState(initilaBuildState);
	const [project, dispatchProject] = useReducer(ProjectReducer, undefined);

	const [sendToCocode] = useCommunicateCocode(dispatchProject);
	const [iDBConnectionState, closeConnections] = useConnectToIDB({
		projectIDBName: PROJECT_IDBNAME,
		dependencyIDBName: DEPENDENCY_IDBNAME
	});
	const { projectIDB, dependencyIDB } = iDBConnectionState;
	const [projectState] = useUpdateProject(
		projectIDB,
		projectId,
		project,
		dispatchProject
	);

	const displayInstallLoading = () =>
		setBuildState(installDependencyBuildState);
	const [dependencyState, installDependency] = useUpdateDependency(
		dependencyIDB,
		displayInstallLoading
	);
	const [buildResult, buildProject] = useBuildProject();

	const handleConnectToIDB = useCallback(() => {
		const { loading, error } = iDBConnectionState;
		if (loading) return;
		if (error) {
			setBuildState(loadProjectFailState);
			return;
		}

		window.require = requireInMain;
		return () => closeConnections();
	}, [iDBConnectionState, closeConnections]);

	const handleUpdateProject = useCallback(() => {
		if (!projectState) return;

		const { loading, error } = projectState;
		if (loading) return;
		if (error) {
			setBuildState(loadProjectFailState);
			return;
		}

		const { dependency } = project;
		installDependency(dependency);
	}, [projectState, project, installDependency]);

	const handleUpdateDependency = useCallback(() => {
		if (!dependencyState) return;

		const { loading, error } = dependencyState;
		if (loading) return;
		if (error) {
			setBuildState(loadDependencyFailState);
			return;
		}

		const displayBuildLoading = () => setBuildState(buildProjectBuildState);
		buildProject(project, worker, displayBuildLoading);
	}, [dependencyState, buildProject, project]);

	const handleBuildProject = useCallback(() => {
		if (!buildResult) return;

		const { error, bundledCode } = buildResult;
		const resultBuildState = error
			? buildProjectFailState(error)
			: successBuildState;
		setBuildState(resultBuildState);

		sendToCocode({ command: BUILD_END });
		if (error) return;

		setInnerCode(bundledCode);
	}, [buildResult, sendToCocode]);

	const handleBuildError = useCallback(() => {
		const receiveBuildError = ({ data }) => {
			const { command, errorDescription } = data;
			if (command !== BUILD_ERROR) return;

			const buildErrorState = buildProjectFailState(errorDescription);
			setBuildState(buildErrorState);
		};

		window.addEventListener('message', receiveBuildError);
	}, []);

	useEffect(handleConnectToIDB, [iDBConnectionState]);
	useEffect(handleUpdateProject, [projectState]);
	useEffect(handleUpdateDependency, [dependencyState]);
	useEffect(handleBuildProject, [buildResult]);
	useEffect(handleBuildError, []);

	return (
		<>
			{!buildState.success && (
				<Styled.BuildStateOverlay>
					{buildState.loading && <CoconutSpinner />}
					{buildState.error && <Logo />}
					<p className="Is-build-error">{buildState.description}</p>
				</Styled.BuildStateOverlay>
			)}
			<div id="coconut-root" />
			<Helmet>
				<script>{scriptTemplate(innerCode)}</script>
			</Helmet>
		</>
	);
}

export default Coconut;
