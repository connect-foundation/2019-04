import React, { useEffect, useContext } from 'react';
import * as Styled from './style';

import { ProjectContext } from 'contexts';
import ExplorerTab from '../ExplorerTab';
import LiveTab from '../LiveTab';

function TabContainer() {
	const { clickedTabIndex } = useContext(ProjectContext);

	const tapMapping = {
		0: <ExplorerTab />,
		1: <LiveTab />
	};

	const renderTab = () => tapMapping[clickedTabIndex];

	useEffect(() => {
		renderTab();
	}, [clickedTabIndex]);

	return <Styled.Container>{renderTab()}</Styled.Container>;
}

export default TabContainer;
