import React, { useReducer, useEffect, useState } from 'react';
import * as Styled from './style';

import Header from 'containers/Common/Header';
import TabBar from 'containers/Project/TabBar';
import TabContainer from 'containers/Project/TabContainer';
import Editor from 'containers/Project/Editor';
import BrowserV1 from 'components/Project/BrowserV1';
import { SplitPaneContainer } from 'components/Common/SplitPane';

import ProjectReducer from 'reducers/ProjectReducer';
import ProjectContext from 'contexts/ProjectContext';
import { fetchProjectActionCreator } from 'actions/Project';

import { TAB_BAR_THEME } from 'constants/theme';

import projectDummyData from 'dummy/Project';

const DEFAULT_CLICKED_TAB_INDEX = 0;

function Project() {
	// temp state : custom hook 만들면 대체할 예정
	const [isFetched, setIsFetched] = useState(false);
	const [clickedTabIndex, setClickedTabIndex] = useState(
		DEFAULT_CLICKED_TAB_INDEX
	);
	const [project, dispatchProject] = useReducer(ProjectReducer, {});

	const handleFetchProject = () => {
		const fetchProjectAction = fetchProjectActionCreator({
			project: projectDummyData
		});
		dispatchProject(fetchProjectAction);
		setIsFetched(true);
	};

	useEffect(handleFetchProject, []);

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
							<BrowserV1 code={project.code} id="coconut-root" />
						</SplitPaneContainer>
					</SplitPaneContainer>
				</Styled.Main>
			)}
		</ProjectContext.Provider>
	);
}

export default Project;
