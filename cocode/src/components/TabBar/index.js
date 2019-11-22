import React from 'react';
import * as Styled from './style';

import ProjectIcon from 'components/ProjectIcon';

function TabBar({ theme }) {
	return (
		<Styled.TabBar backGroundColor={theme.tabBarBGColor}>
			<Styled.TabBarItem>
				<ProjectIcon fillColor={theme.tabBarSelectedItemBGColor} />
			</Styled.TabBarItem>
		</Styled.TabBar>
	);
}

export default TabBar;
