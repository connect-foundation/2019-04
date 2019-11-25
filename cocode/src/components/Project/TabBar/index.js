import React, { useState } from 'react';
import * as Styled from './style';

import TabIcon from 'components/Project/TabIcon';

import Info from './info.svg';
import Explorer from './explorer.svg';
import Dependency from './dependency.svg';
import Live from './live.svg';

function TabBar({ theme }) {
	const [clickedIndex, setClickedIndex] = useState(0);
	const handleSetClickedIndex = index => setClickedIndex(index);

	const tabIcons = [
		{
			name: 'info',
			icon: Info,
		},
		{
			name: 'explorer',
			icon: Explorer,
		},
		{
			name: 'dependency',
			icon: Dependency,
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
						clicked={index === clickedIndex}
					/>
				);
			})}
		</Styled.TabBar>
	);
}

export default TabBar;
