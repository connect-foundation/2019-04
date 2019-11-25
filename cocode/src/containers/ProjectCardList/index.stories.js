import React from 'react';
import ProjectCardList from '.';

export default {
	title: 'DashboardContainer'
};

const coconut = [
	{
		title: '안녕 난희라',
		edited: new Date(),
		menuItems: [
			{
				value: 'open',
				onClick: () => alert('open')
			},
			{
				value: 'rename',
				onClick: () => alert('rename')
			},
			{
				value: 'remove',
				onClick: () => alert('remove')
			}
		]
	},
	{
		title: '안녕 난혜',
		edited: new Date(),
		menuItems: [
			{
				value: 'open',
				onClick: () => alert('open')
			},
			{
				value: 'rename',
				onClick: () => alert('rename')
			},
			{
				value: 'remove',
				onClick: () => alert('remove')
			}
		]
	},
	{
		title: '안녕 난준표',
		edited: new Date(),
		menuItems: [
			{
				value: 'open',
				onClick: () => alert('open')
			},
			{
				value: 'rename',
				onClick: () => alert('rename')
			},
			{
				value: 'remove',
				onClick: () => alert('remove')
			}
		]
	},
	{
		title: '안녕 난지수',
		edited: new Date(),
		menuItems: [
			{
				value: 'open',
				onClick: () => alert('open')
			},
			{
				value: 'rename',
				onClick: () => alert('rename')
			},
			{
				value: 'remove',
				onClick: () => alert('remove')
			}
		]
	}
];

function cardContainer() {
	return <ProjectCardList coconuts={coconut} />;
}

export { cardContainer };
