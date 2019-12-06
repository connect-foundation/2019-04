import React, { useContext } from 'react';
import * as Styled from './style';

import DependencyItem from 'components/Project/DependencyItem';

import { ProjectContext } from 'contexts';

function DependencyNow() {
	const { project } = useContext(ProjectContext);
	const { dependency } = project;

	return (
		<Styled.DependencyNow>
			{Object.entries(dependency).map(
				([key, { name, version }], index) => {
					return (
						<DependencyItem
							key={`dependency-${key}`}
							index={index}
							name={name}
							version={version}
							// {versions={versions}}
						/>
					);
				}
			)}
		</Styled.DependencyNow>
	);
}

export default DependencyNow;
