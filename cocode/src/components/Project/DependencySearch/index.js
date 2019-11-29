import React from 'react';
import * as Styled from './style';

import DependencySearchItem from 'components/Project/DependencySearchItem';

import { dependencySearchList } from './dummy';

function DependencySearch() {
	return (
		<article>
			<Styled.SearchBar />
			<Styled.DependencySearchList>
				{dependencySearchList.map(
					({ name, latestVersion, versions, github, npm }, index) => {
						return (
							<DependencySearchItem
								key={`dependency${index}`}
								name={name}
								latestVersion={latestVersion}
								versions={versions}
								github={github}
								npm={npm}
							/>
						);
					}
				)}
			</Styled.DependencySearchList>
		</article>
	);
}

export default DependencySearch;
