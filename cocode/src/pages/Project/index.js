import React, { useReducer, useEffect } from 'react';
import * as Styled from './style';

import Header from 'containers/Header';
import TabBar from 'components/TabBar';
import ProjectTab from 'containers/ProjectTab';
import Editor from 'containers/Editor';
import BrowserV1 from 'components/BrowserV1';

import ProjectReducer from 'reducers/ProjectReducer';
import ProjectContext from 'contexts/ProjectContext';
import { fetchProjectActionCreator } from 'actions/Project';

import { TAB_BAR_THEME } from 'constants/theme';

function Project() {
	const [project, dispatchProject] = useReducer(ProjectReducer, {});

	const handleFetchProject = () => {
		const fetchProjectAction = fetchProjectActionCreator();
		dispatchProject(fetchProjectAction);
	};

	useEffect(handleFetchProject, []);

	return (
		<ProjectContext.Provider value={{ project, dispatchProject }}>
			<Header />
			<Styled.Main>
				<TabBar theme={TAB_BAR_THEME} />
				<ProjectTab />
				<Editor />
				<BrowserV1
					code={project.code}
					id="coconut-root"
					className="Project-main-stretch"
				/>
			</Styled.Main>
		</ProjectContext.Provider>
	);
}

export default Project;
