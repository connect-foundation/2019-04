import React from 'react';
import * as Styled from './style';

import Dependency from 'containers/Project/Dependency';
import DependencyNow from 'components/Project/DependencyNow';
import DependencySearch from 'components/Project/DependencySearch';

const TabTitleFirst = 'DEPENDENCIES';
const TabTitleSecond = 'SEARCH DEPENDENCY';

function DependencyTab() {
	return (
		<Styled.DependencyTab>

			<Dependency title={TabTitleFirst}>
				<DependencyNow />
			</Dependency>
			<Dependency title={TabTitleSecond}>
				<DependencySearch />
			</Dependency>

		</Styled.DependencyTab>
	);
}

export default DependencyTab;
