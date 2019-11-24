import React from 'react';
import * as Style from './style';
import ProjectCard from 'components/ProjectCard';
import CreateButton from 'components/CreateCoconut';
import { PROJECT_CARD_THEME } from 'constants/theme';

function ProjectCardList({ coconuts = [] }) {
	return (
		<Style.CardList>
			<Style.CardItem>
				<CreateButton />
			</Style.CardItem>

			{coconuts.map((coconut, index) => (
				<Style.CardItem>
					<ProjectCard
						{...coconut}
						key={index}
						theme={PROJECT_CARD_THEME}
					/>
				</Style.CardItem>
			))}
		</Style.CardList>
	);
}

export default ProjectCardList;
