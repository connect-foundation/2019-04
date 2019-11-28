import React, { useReducer, useEffect } from 'react';
import * as Styled from './style';

import MonacoEditor from 'components/Project/MonacoEditor';
import BrowserV1 from 'components/Project/BrowserV1';
import { SplitPaneContainer } from 'components/Common/SplitPane';

import ProjectReducer from 'reducers/ProjectReducer';

import projectDummyData from 'dummy/Project';

import {
	fetchProjectActionCreator,
	updateCodeActionCreator
} from 'actions/Project';

function Version1() {
	const [project, dispatchProject] = useReducer(ProjectReducer, {});

	const handleFetchProject = () => {
		const fetchProjectAction = fetchProjectActionCreator({
			project: projectDummyData
		});
		dispatchProject(fetchProjectAction);
	};

	const handleChangeCode = (_, changedCode) => {
		const updateCodeAction = updateCodeActionCreator(changedCode);
		dispatchProject(updateCodeAction);
	};

	useEffect(handleFetchProject, []);

	return (
		<Styled.Main>
			<SplitPaneContainer split="vertical" defaultSize="50vw">
				<MonacoEditor
					className="Stretch-item"
					code={project.code}
					onChange={handleChangeCode}
				/>
				<BrowserV1
					className="Stretch-item"
					code={project.code}
					id="coconut-root"
				/>
			</SplitPaneContainer>
		</Styled.Main>
	);
}

export default Version1;