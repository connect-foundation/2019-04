import React, { useEffect } from 'react';
import * as Styled from './style';

import PlusImage from 'components/Project/PlusImage';
import GitHubLogo from 'components/Project/GitHubLogo';
import NpmLogo from 'components/Project/NpmLogo';
import DependencySelector from 'components/Project/DependencySelector';

import { getModule } from 'apis/Dependency';
import useFetch from 'hooks/useFetch';

function DependencySearchItem({ name, latestVersion, github, npm }) {
	const [{ data }, setRequest] = useFetch({});
	const handleFetchModule = () => {
		const moduleName = name;
		const moduleVersion = latestVersion;
		setRequest(getModule(moduleName, moduleVersion));
	};

	useEffect(() => {
		if (data) {
			Object.entries(data).forEach(([key, value]) => {
				fileSystem[key] = value;
			});
		}
	}, [data]);

	return (
		<Styled.Item>
			{name}
			<Styled.Description>
				{/*<DependencySelector options={versions} />*/}
				<div onClick={handleFetchModule}>
					<PlusImage />
				</div>
				<GitHubLogo href={github} />
				<NpmLogo href={npm} />
			</Styled.Description>
		</Styled.Item>
	);
}

export default DependencySearchItem;
