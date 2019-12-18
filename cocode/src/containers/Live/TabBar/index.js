import React, { useContext } from 'react';
import * as Styled from './style';

import ProjectContext from 'contexts/ProjectContext';
import TabIcon from 'components/Project/TabIcon';
import Explorer from './explorer.svg';
import Live from './live.svg';

function TabBar({ theme }) {
	const { clickedTabIndex, setClickedTabIndex } = useContext(ProjectContext);

	const handleSetClickedIndex = index => setClickedTabIndex(index);

	const tabIcons = [
		{
			name: 'explorer',
			icon: Explorer
		},
		{
			name: 'live',
			icon: Live,
		}
	];

	return (
		<Styled.TabBar tabBarBGColor={theme.tabBarBGColor}>
			{tabIcons.map(({ name, icon }, index) => {
				return (
					<TabIcon
						theme={theme}
						key={index}
						index={index}
						name={name}
						icon={icon}
						onClick={handleSetClickedIndex}
						clicked={index === clickedTabIndex}
					/>
				);
			})}
		</Styled.TabBar>
	);
}

export default TabBar;
