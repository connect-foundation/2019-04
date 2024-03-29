import React, { useReducer, useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as Styled from './style';

import Header from 'containers/Common/Header';
import TabBar from 'containers/Project/TabBar';
import TabContainer from 'containers/Project/TabContainer';
import Editor from 'containers/Project/Editor';
import LoadingSpinner from 'containers/Common/LoadingSpinner';
import BrowserV2 from 'components/Project/BrowserV2';
import { SplitPaneContainer } from 'components/Common/SplitPane';
import addToast from 'components/Common/Toast';

import { ProjectReducer } from 'reducers';
import { ProjectContext, UserContext } from 'contexts';
import { fetchProjectActionCreator } from 'actions/Project';

import { TAB_BAR_THEME } from 'constants/theme';

import useFetch from 'hooks/useFetch';
import { reactTemplate } from 'template/react';
import copyProject from 'template/copyProject';
import { getProjectInfoAPICreator, forkProjectAPICreator } from 'apis/Project';
import parseProject from 'pages/Project/parseProject';
import { CREATED, CONFLICT } from 'constants/statusCode';
import {
	SUCCESS_FORK,
	CONFLICT_FORK,
	LOADING_PROJECT
} from 'constants/notificationMessage';

const DEFAULT_CLICKED_TAB_INDEX = 1;

function Project() {
	const { user } = useContext(UserContext);
	const { projectId } = useParams();
	const history = useHistory();
	const [{ data, loading, error, status }, setRequest] = useFetch({});
	const [isLive, setIsLive] = useState(false);
	const [isFetched, setIsFetched] = useState(false);
	const [clickedTabIndex, setClickedTabIndex] = useState(
		DEFAULT_CLICKED_TAB_INDEX
	);
	const [project, dispatchProject] = useReducer(ProjectReducer, {});
	const isNotMyProject = !user || user.username !== project.author;

	const forkCoconut = ({ live, info }) => {
		if (!isNotMyProject) return false;

		const parsedProject = preTreatBeforeFork({ live, info });
		const forkProjectInfoAPI = forkProjectAPICreator(parsedProject);
		setRequest(forkProjectInfoAPI);

		handleSetProjectState(parsedProject);
		return parsedProject._id;
	};

	const preTreatBeforeFork = ({ live, info }) => {
		if (live) setIsLive(true);

		const username = user ? user.username : 'anonymous';
		let parsedProject = parseProject(project, username);

		if (info) {
			Object.entries(info).forEach(([title, value]) => {
				parsedProject[title] = value;
			});
		}
		return parsedProject;
	};

	const handleFetchProject = () => {
		if (projectId !== 'new') {
			const getProjectInfoAPI = getProjectInfoAPICreator(projectId);
			setRequest(getProjectInfoAPI);
			return;
		}

		const project = copyProject(reactTemplate());
		handleSetProjectState(project);
	};

	const handleSetProjectState = project => {
		const fetchProjectAction = fetchProjectActionCreator({ project });
		dispatchProject(fetchProjectAction);
		setIsFetched(true);
	};

	const handleChangeHistoryAtForked = () => {
		if (status === CONFLICT) addToast.error(CONFLICT_FORK);
		if (status !== CREATED) return;

		const url = isLive ? `../live/${data._id}` : `../project/${data._id}`;
		projectId !== 'new' ? history.push(url) : history.replace(url);

		addToast.info(SUCCESS_FORK);
	};

	const handleSetProject = () => {
		if (!data) return;

		if (!isFetched) handleSetProjectState(data);
	};

	useEffect(handleFetchProject, []);

	useEffect(handleSetProject, [data]);

	useEffect(handleChangeHistoryAtForked, [status]);

	if (loading) return <LoadingSpinner message={LOADING_PROJECT} />;
	if (error) history.push('/weAreSorry');

	return (
		<ProjectContext.Provider
			value={{
				project,
				dispatchProject,
				clickedTabIndex,
				setClickedTabIndex,
				forkCoconut
			}}
		>
			<Header name={project.name} />
			{isFetched && (
				<Styled.Main>
					<TabBar theme={TAB_BAR_THEME} />
					<SplitPaneContainer split="vertical" defaultSize="20vw">
						<TabContainer />
						<SplitPaneContainer split="vertical" defaultSize="40vw">
							<Editor />
							<BrowserV2 />
						</SplitPaneContainer>
					</SplitPaneContainer>
				</Styled.Main>
			)}
		</ProjectContext.Provider>
	);
}

export default Project;
