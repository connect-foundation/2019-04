import React, { useReducer, useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import * as Styled from './style';

import Header from 'containers/Common/Header';
import TabBar from 'containers/Project/TabBar';
import TabContainer from 'containers/Project/TabContainer';
import Editor from 'containers/Project/Editor';
import BrowserV2 from 'components/Project/BrowserV2';
import { SplitPaneContainer } from 'components/Common/SplitPane';

import ProjectReducer from 'reducers/ProjectReducer';
import ProjectContext from 'contexts/ProjectContext';
import { fetchProjectActionCreator } from 'actions/Project';

import { TAB_BAR_THEME } from 'constants/theme';

import UserContext from 'contexts/UserContext';
import useFetch from 'hooks/useFetch';
import reactTemplate from 'template/objectIdMapper';
import { getProjectInfoAPICreator, forkProjectAPICreator } from 'apis/Project';
import { LiveStore } from 'stores';

const DEFAULT_CLICKED_TAB_INDEX = 0;

function Project() {
	const { user } = useContext(UserContext);
	const history = useHistory();
	const { projectId } = useParams();
	const [{ data, loading, error }, setRequest] = useFetch({});
	const [isFetched, setIsFetched] = useState(false);
	const [clickedTabIndex, setClickedTabIndex] = useState(
		DEFAULT_CLICKED_TAB_INDEX
	);
	const [project, dispatchProject] = useReducer(ProjectReducer, {});

	const handleFetchProject = () => {
		if (projectId !== 'new') {
			const getProjectInfoAPI = getProjectInfoAPICreator(projectId);
			setRequest(getProjectInfoAPI);
			return;
		}

		const name = prompt('프로젝트 이름을 입력해주세요');
		if (!name) {
			history.goBack();
			return;
		}

		const project = handleForkNewCoconut(name);
		handleSetProjectState(project);
		history.push(`../project/${project._id}`);
	};

	const handleForkNewCoconut = name => {
		const project = reactTemplate();
		project.name = name;
		project.author = user.username;
		const forkProjectInfoAPI = forkProjectAPICreator(project);
		setRequest(forkProjectInfoAPI);

		return project;
	};

	const handleSetProjectState = project => {
		const fetchProjectAction = fetchProjectActionCreator({ project });
		dispatchProject(fetchProjectAction);
		setIsFetched(true);
	};

	useEffect(handleFetchProject, []);

	useEffect(() => {
		if (!data) return;

		if (!isFetched) handleSetProjectState(data);
	}, [data]);

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
								<Editor />
								<BrowserV2 id="coconut-root" />
							</SplitPaneContainer>
						</SplitPaneContainer>
					</Styled.Main>
				)}
			</LiveStore>
		</ProjectContext.Provider>
	);
}

export default Project;
