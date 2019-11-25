import React from 'react';
import * as Styled from './style';
import DropDownMenu from 'components/DropDownMenu';

function MenuButton({ onClick }) {
	return (
		<Styled.ProjectMenuButton onClick={onClick}>
			<Styled.ProjectMenuButtonDot />
			<Styled.ProjectMenuButtonDot />
			<Styled.ProjectMenuButtonDot />
		</Styled.ProjectMenuButton>
	);
}

function ProjectCard({ title, edited, menuItems }) {
	return (
		<Styled.ProjectCard>
			<Styled.ProjectArticle>
				{/*TODO 22자 이상시 말줄임표 유틸 구현*/}
				<Styled.ProjectTitle>{title}</Styled.ProjectTitle>
				<Styled.ProjectDescription>
					<Styled.ProjectTimeLabel>
						{/*TODO 날짜 계산 유틸 구*/}
						Edited {`${Date.now() - edited}`} ago
					</Styled.ProjectTimeLabel>
					<DropDownMenu menuItems={menuItems}>
						<MenuButton />
					</DropDownMenu>
				</Styled.ProjectDescription>
			</Styled.ProjectArticle>
		</Styled.ProjectCard>
	);
}

export default ProjectCard;
