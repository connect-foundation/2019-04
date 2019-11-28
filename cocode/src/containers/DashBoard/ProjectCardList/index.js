import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import * as Style from './style';
import ProjectCard from 'components/DashBoard/ProjectCard';
import CreateButton from 'components/DashBoard/CreateCoconut';
import { PROJECT_CARD_THEME } from 'constants/theme';
import { DashBoardContext } from 'contexts';

function ProjectCardList() {
	const { coconuts } = useContext(DashBoardContext);
	return (
		<Style.Main>
			<Style.Title>
				Coconuts
				<Style.CoconutCount>{coconuts.length}</Style.CoconutCount>
			</Style.Title>
			<Style.CardList>
				<Link to="/project">
					<CreateButton />
				</Link>
				{coconuts.map((coconut, index) => (
					<ProjectCard
						{...coconut}
						key={index}
						theme={PROJECT_CARD_THEME}
					/>
				))}
			</Style.CardList>
		</Style.Main>
	);
}

export default ProjectCardList;
