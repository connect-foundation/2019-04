import React, { useState, useEffect, useReducer, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';

import CoconutSpinner from 'components/CoconutSpinner';
import Logo from 'components/Logo';

import { useConnectToIDB, useUpdateProject } from 'hooks';

import ProjectReducer from 'reducers/ProjectReducer';

const PROJECT_IDBNAME = 'Coconut';
const DEPENDENCY_IDBNAME = 'Dependency';

const initilaBuildState = {
	success: false,
	loading: true,
	error: false,
	description: 'Please wait to load project...'
};

const loadProjectFailState = {
	success: false,
	loading: false,
	error: true,
	description: 'Fail to load project...'
};

function Coconut() {
	const { projectId } = useParams();

	const [buildState, setBuildState] = useState(initilaBuildState);
	const [project, dispatchProject] = useReducer(ProjectReducer, undefined);

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

	const handleConnectToIDB = useCallback(() => {
		const { loading, error } = iDBConnectionState;
		if (loading) return;
		if (error) {
			setBuildState(loadProjectFailState);
			return;
		}

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
	}, [projectState]);

	useEffect(handleConnectToIDB, [iDBConnectionState]);
	useEffect(handleUpdateProject, [projectState]);

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
		</>
	);
}

export default Coconut;
