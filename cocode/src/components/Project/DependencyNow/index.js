import React from 'react';
import * as Styled from './style';

import DependencyItem from 'components/Project/DependencyItem';

import { dependencyList } from './dummy';

function DependencyNow() {
	return (
		<Styled.DependencyNow>
			{dependencyList.map(({ name, version, versions }, index) => {
				return (
					<DependencyItem
						key={`dependency${index}`}
						index={index}
						name={name}
						version={version}
						versions={versions}
					/>
				);
			})}
		</Styled.DependencyNow>
	);
}

export default DependencyNow;
