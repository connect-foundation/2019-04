import { useState, useEffect, useCallback } from 'react';

import { getData } from 'indexedDB';

import { useFetch } from 'hooks';

import { getProjectInfoAPICreator } from 'apis/Project';
import { fetchProjectActionCreator } from 'actions/Project';

const initialState = {
	success: false,
	loading: true,
	error: false,
	project: undefined
};

const getDataFailState = {
	...initialState,
	error: true,
	loading: false
};

const getDataSuccessState = project => ({
	...initialState,
	success: true,
	loading: false,
	project
});

function useUpdateProject(idbConnection, projectId, project, dispatchProject) {
	const [projectState, setProjectState] = useState(undefined);
	const [response, setRequest] = useFetch({});

	const fetchProject = useCallback(() => {
		const getProjectInfoAPI = getProjectInfoAPICreator(projectId);
		setRequest(getProjectInfoAPI);
	}, [projectId, setRequest]);

	const handleFetchProject = useCallback(() => {
		if (!idbConnection) return;
		if (projectId === 'new') return;

		const handleSuccessToGetProjectData = project => {
			if (!project) {
				fetchProject();
				return;
			}

			setProjectState(getDataSuccessState(project));
		};

		const handleFailToGetProjectData = () => {
			setProjectState(getDataFailState);
		};

		getData({ idbConnection, key: projectId })
			.then(handleSuccessToGetProjectData)
			.catch(handleFailToGetProjectData);
	}, [idbConnection, projectId, fetchProject]);

	const handleRequestProjectAPI = useCallback(() => {
		if (!response) return;

		const { data, loading, error } = response;
		if (loading || !data) return;
		if (error) {
			setProjectState(getDataFailState);
			return;
		}

		const fetchProjectAction = fetchProjectActionCreator({ project: data });
		dispatchProject(fetchProjectAction);
	}, [response, dispatchProject]);

	const handleProjectStateUpdated = useCallback(() => {
		if (project) setProjectState(getDataSuccessState(project));
	}, [project]);

	useEffect(handleFetchProject, [idbConnection]);
	useEffect(handleRequestProjectAPI, [response]);
	useEffect(handleProjectStateUpdated, [project]);

	return [projectState];
}

export default useUpdateProject;
