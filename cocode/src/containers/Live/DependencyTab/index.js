import React, { useContext } from 'react';
import * as Styled from './style';

import CoconutSpinner from 'components/Common/CoconutSpinner';
import Dependency from 'components/Project/Dependency';
import DependencyNow from 'components/Project/DependencyNow';
import DependencySearch from 'components/Project/DependencySearch';

import { ProjectContext } from 'contexts';

const TabTitleFirst = 'DEPENDENCIES';
const TabTitleSecond = 'SEARCH DEPENDENCY';

function InstallingDisplay() {
	return (
		<Styled.InstallingDisplay>
			<CoconutSpinner />
			<Styled.InstallPhrase>
				Please wait to install module...
			</Styled.InstallPhrase>
		</Styled.InstallingDisplay>
	);
}

function DependencyTab() {
	const { project } = useContext(ProjectContext);
	const { dependencyInstalling } = project;

	return (
		<Styled.Frame>
			{dependencyInstalling && <InstallingDisplay />}
			<Styled.DependencyArea>
				<Dependency title={TabTitleFirst}>
					<DependencyNow />
				</Dependency>
				<Dependency title={TabTitleSecond}>
					<DependencySearch />
				</Dependency>
			</Styled.DependencyArea>
		</Styled.Frame>
	);
}

export default DependencyTab;
