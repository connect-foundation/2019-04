import React from 'react';
import styled from 'styled-components';

import ProjectCard from '.';

const Contianer = styled.div`
	& {
		display: flex;
		height: 100vh;
		width: 100vw;
		background-color: black;
		justify-content: center;
		vertical-align: center;
		align-items: center;
	}
`;

export default {
	title: 'ProjectCard'
};

const projectCard = () => {
	const tempData = {
		title: 'project',
		edited: 1574333501591,
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
	};
	return (
		<Contianer>
			<ProjectCard {...tempData}></ProjectCard>
		</Contianer>
	);
};

export { projectCard };
