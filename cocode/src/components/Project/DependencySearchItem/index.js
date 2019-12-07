import React, { useEffect, useContext } from 'react';
import * as Styled from './style';

import PlusImage from 'components/Project/PlusImage';
import GitHubLogo from 'components/Project/GitHubLogo';
import NpmLogo from 'components/Project/NpmLogo';
import DependencySelector from 'components/Project/DependencySelector';

import { getModule } from 'apis/Dependency';
import useFetch from 'hooks/useFetch';

import {
	installDependencyActionCreator,
	waitingInstallDependencyActionCreator
} from 'actions/Project';
import { ProjectContext } from 'contexts';

function DependencySearchItem({ name, latestVersion, github, npm }) {
	const { project, dispatchProject } = useContext(ProjectContext);
	const [{ data, loading }, setRequest] = useFetch({});

	const handleFetchModule = () => {
		const moduleName = name;
		const moduleVersion = latestVersion;
		setRequest(getModule(moduleName, moduleVersion));
	};
	const { dependency } = project;

	const successInstallDependency = dependency => {
		Object.entries(dependency).forEach(([key, value]) => {
			fileSystem[key] = value;
		});
		dispatchProject(
			installDependencyActionCreator({
				moduleName: name,
				moduleVersion: latestVersion
			})
		);
	};

	const handleSuccesResponse = () => {
		if (data)
			setTimeout(successInstallDependency.bind(undefined, data), 1000);
	};

	const handleStartInstall = () => {
		if (!loading) return;
		dispatchProject(waitingInstallDependencyActionCreator());
	};

	useEffect(handleSuccesResponse, [data]);
	useEffect(handleStartInstall, [loading]);

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
