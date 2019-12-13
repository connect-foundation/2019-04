import React, { useContext } from 'react';
import * as Styled from './style';

import PlusImage from 'components/Project/PlusImage';
import GitHubLogo from 'components/Project/GitHubLogo';
import NpmLogo from 'components/Project/NpmLogo';
import DependencySelector from 'components/Project/DependencySelector';

import { waitingInstallDependencyActionCreator } from 'actions/Project';
import { ProjectContext } from 'contexts';

function DependencySearchItem({ name, latestVersion, github, npm }) {
	const { project, dispatchProject } = useContext(ProjectContext);
	const { dependency } = project;

	const handleFetchModule = () => {
		const moduleName = name;
		const moduleVersion = latestVersion;

		dispatchProject(
			waitingInstallDependencyActionCreator({ moduleName, moduleVersion })
		);
	};

	return (
		<Styled.Item>
			{name}
			<Styled.Description>
				{/*<DependencySelector options={versions} />*/}
				{!dependency[name] && <PlusImage onClick={handleFetchModule} />}
				<GitHubLogo href={github} />
				<NpmLogo href={npm} />
			</Styled.Description>
		</Styled.Item>
	);
}

export default DependencySearchItem;
