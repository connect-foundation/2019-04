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

const initilaBuildState = {
	success: false,
	loading: true,
	error: false,
	description: 'Please wait to load project...'
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
	const [dependencyState, installDependency] = useUpdateDependency(
		dependencyIDB
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

		buildProject(project, worker);
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

	useEffect(handleConnectToIDB, [iDBConnectionState]);
	useEffect(handleUpdateProject, [projectState]);
	useEffect(handleUpdateDependency, [dependencyState]);
	useEffect(handleBuildProject, [buildResult]);

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
				<script>{innerCode}</script>
			</Helmet>
		</>
	);
}

export default Coconut;
