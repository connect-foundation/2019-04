import React from 'react';
import * as Styled from './style';
import DropDownMenu from 'components/DropDownMenu';

function MenuButton({ onClick }) {
	return (
		<Styled.ProejctMenuButton onClick={onClick}>
			<Styled.ProjectMenuButtonDot />
			<Styled.ProjectMenuButtonDot />
			<Styled.ProjectMenuButtonDot />
		</Styled.ProejctMenuButton>
	);
}

function ProjectCard({ title, edited, menuItems }) {
	return (
		<Styled.ProjectCard>
			<Styled.ProjectArticle>
				<Styled.ProjectTitle>{title}</Styled.ProjectTitle>
				<Styled.ProjectDescription>
					{/* 임시 시간 출력 */}
					{`${Date.now() - edited}`} ago...
				</Styled.ProjectDescription>
			</Styled.ProjectArticle>
			<DropDownMenu menuItems={menuItems}>
				<MenuButton />
			</DropDownMenu>
		</Styled.ProjectCard>
	);
}

export default ProjectCard;
