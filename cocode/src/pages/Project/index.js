import React, { useReducer, useEffect, useState } from 'react';
import * as Styled from './style';

import Header from 'containers/Common/Header';
import TabBar from 'components/Project/TabBar';
import ExplorerTab from 'containers/Project/ExplorerTab';
import Editor from 'containers/Project/Editor';
import BrowserV1 from 'components/Project/BrowserV1';

import ProjectReducer from 'reducers/ProjectReducer';
import ProjectContext from 'contexts/ProjectContext';
import { fetchProjectActionCreator } from 'actions/Project';

import { TAB_BAR_THEME } from 'constants/theme';

function Project() {
	// temp state : custom hook 만들면 대체할 예정
	const [isFetched, setIsFetched] = useState(false);
	const [project, dispatchProject] = useReducer(ProjectReducer, {});

	const handleFetchProject = () => {
		const fetchProjectAction = fetchProjectActionCreator();
		dispatchProject(fetchProjectAction);
		setIsFetched(true);
	};

	useEffect(handleFetchProject, []);

	return (
		<ProjectContext.Provider value={{ project, dispatchProject }}>
			<Header />
			{isFetched && (
				<Styled.Main>
					<TabBar theme={TAB_BAR_THEME} />
					<ExplorerTab />
					<Editor />
					<BrowserV1
						code={project.files[project.entry].contents}
						id="coconut-root"
						className="Project-main-stretch"
					/>
				</Styled.Main>
			)}
		</ProjectContext.Provider>
	);
}

export default Project;
