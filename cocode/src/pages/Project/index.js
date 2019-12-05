import React, { useReducer, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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

import reactTemplate from 'template/objectIdMapper';
import useFetch from 'hooks/useFetch';
import { getProjectInfoAPICreator } from 'apis/Project';

const DEFAULT_CLICKED_TAB_INDEX = 1;

function Project() {
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

		const project = reactTemplate();
		handleSetProjectState(project);
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
			<Header />
			{isFetched && (
				<Styled.Main>
					<TabBar theme={TAB_BAR_THEME} />
					<SplitPaneContainer split="vertical" defaultSize="20vw">
						<TabContainer />
						<SplitPaneContainer split="vertical" defaultSize="40vw">
							<Editor />
							<BrowserV2 id="coconut-root" />
						</SplitPaneContainer>
					</SplitPaneContainer>
				</Styled.Main>
			)}
		</ProjectContext.Provider>
	);
}

export default Project;
