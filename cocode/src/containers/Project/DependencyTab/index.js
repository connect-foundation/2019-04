import React from 'react';

import Dependency from 'components/Project/Dependency';
import DependencyNow from 'components/Project/DependencyNow';
import DependencySearch from 'components/Project/DependencySearch';

const TabTitleFirst = 'DEPENDENCIES';
const TabTitleSecond = 'SEARCH DEPENDENCY';

function DependencyTab() {
	return (
		<>
			<Dependency title={TabTitleFirst}>
				<DependencyNow />
			</Dependency>
			<Dependency title={TabTitleSecond}>
				<DependencySearch />
			</Dependency>
		</>
	);
}

export default DependencyTab;
