import React, { useReducer, useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as Styled from './style';

import Header from 'containers/Common/Header';
import TabBar from 'containers/Project/TabBar';
import TabContainer from 'containers/Project/TabContainer';
import Editor from 'containers/Project/Editor';
import BrowserV2 from 'components/Project/BrowserV2';
import { SplitPaneContainer } from 'components/Common/SplitPane';
import addToast from 'components/Common/Toast';

import ProjectReducer from 'reducers/ProjectReducer';
import ProjectContext from 'contexts/ProjectContext';
import { fetchProjectActionCreator } from 'actions/Project';

import { TAB_BAR_THEME } from 'constants/theme';

import UserContext from 'contexts/UserContext';
import useFetch from 'hooks/useFetch';
import { reactTemplate } from 'template/react';
import copyProject from 'template/copyProject';
import { getProjectInfoAPICreator, forkProjectAPICreator } from 'apis/Project';
import { LiveStore } from 'stores';
import parseProject from 'pages/Project/parseProject';
import { CREATED, CONFLICT } from 'constants/statusCode';

const DEFAULT_CLICKED_TAB_INDEX = 0;

function Project() {
	const { user } = useContext(UserContext);
	const history = useHistory();
	const { projectId } = useParams();
	const [{ data, loading, error, status }, setRequest] = useFetch({});
	const [isFetched, setIsFetched] = useState(false);
	const [clickedTabIndex, setClickedTabIndex] = useState(
		DEFAULT_CLICKED_TAB_INDEX
	);
	const [project, dispatchProject] = useReducer(ProjectReducer, {});

	const handleForkCoconut = () => {
		const parsedProject = parseProject(project, user);
		const forkProjectInfoAPI = forkProjectAPICreator(parsedProject);
		setRequest(forkProjectInfoAPI);

		handleSetProjectState(parsedProject);
		return project;
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
		if (status === CONFLICT) {
			addToast.error('already forked! enjoy Coconut ');
		}

		if (status !== CREATED) return;

		projectId !== 'new'
			? history.push(`../project/${data._id}`)
			: history.replace(`../project/${data._id}`);

		addToast.info('Forked Coconut, Success !');
	};

	const handleSetProject = () => {
		if (!data) return;

		if (!isFetched) handleSetProjectState(data);
	};

	useEffect(handleFetchProject, []);

	useEffect(handleSetProject, [data]);

	useEffect(handleChangeHistoryAtForked, [status]);

	// //TODO loading 컴포넌트 만들기
	if (loading) return <p>Loading...</p>;
	if (error) return <p>다시 시도해주세요.</p>;

	return (
		<ProjectContext.Provider
			value={{
				project,
				dispatchProject,
				clickedTabIndex,
				setClickedTabIndex
			}}
		>
			<LiveStore>
				<Header />
				{isFetched && (
					<Styled.Main>
						<TabBar theme={TAB_BAR_THEME} />
						<SplitPaneContainer split="vertical" defaultSize="20vw">
							<TabContainer />
							<SplitPaneContainer
								split="vertical"
								defaultSize="40vw"
							>
								<Editor handleForkCoconut={handleForkCoconut} />
								<BrowserV2 />
							</SplitPaneContainer>
						</SplitPaneContainer>
					</Styled.Main>
				)}
			</LiveStore>
		</ProjectContext.Provider>
	);
}

export default Project;
