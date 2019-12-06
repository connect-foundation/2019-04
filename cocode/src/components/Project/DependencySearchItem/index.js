import React, { useEffect, useContext } from 'react';
import * as Styled from './style';

import PlusImage from 'components/Project/PlusImage';
import GitHubLogo from 'components/Project/GitHubLogo';
import NpmLogo from 'components/Project/NpmLogo';
import DependencySelector from 'components/Project/DependencySelector';

import { getModule } from 'apis/Dependency';
import useFetch from 'hooks/useFetch';

import { installDependencyActionCreator } from 'actions/Project';
import { ProjectContext } from 'contexts';

function DependencySearchItem({ name, latestVersion, github, npm }) {
	const { project, dispatchProject } = useContext(ProjectContext);
	const [{ data }, setRequest] = useFetch({});
	const handleFetchModule = () => {
		const moduleName = name;
		const moduleVersion = latestVersion;
		setRequest(getModule(moduleName, moduleVersion));
	};
	const { dependency } = project;

	useEffect(() => {
		if (data) {
			Object.entries(data).forEach(([key, value]) => {
				fileSystem[key] = value;
			});
			dispatchProject(
				installDependencyActionCreator({
					moduleName: name,
					moduleVersion: latestVersion
				})
			);
		}
	}, [data]);

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
