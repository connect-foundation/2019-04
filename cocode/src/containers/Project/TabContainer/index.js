import React, { useEffect, useContext } from 'react';
import * as Styled from './style';

import ProjectContext from 'contexts/ProjectContext';

import InfoTab from '../InfoTab';
import ExplorerTab from '../ExplorerTab';
import DependencyTab from '../DependencyTab';
import LiveTab from '../LiveTab';

function TabContainer() {
	const { clickedTabIndex } = useContext(ProjectContext);

	const tapMapping = {
		// 0: <InfoTab />,
		0: <ExplorerTab />,
		1: <DependencyTab />
		// 3: <LiveTab/>
	};

	const renderTab = () => tapMapping[clickedTabIndex];

	useEffect(() => {
		renderTab();
	}, [clickedTabIndex]);

	return <Styled.Container>{renderTab()}</Styled.Container>;
}

export default TabContainer;
