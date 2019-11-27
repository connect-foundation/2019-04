import React from 'react';
import * as Styled from './style';
import DropDownMenu from 'components/Common/DropDownMenu';

const defaultMenuItems = [
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
];

function MenuButton({ onClick }) {
	return (
		<Styled.ProjectMenuButton onClick={onClick}>
			<Styled.ProjectMenuButtonDot />
			<Styled.ProjectMenuButtonDot />
			<Styled.ProjectMenuButtonDot />
		</Styled.ProjectMenuButton>
	);
}

function ProjectCard({ name, updatedAt, menuItems = defaultMenuItems }) {
	return (
		<Styled.ProjectArticle>
			<Styled.ProjectTitle>{name}</Styled.ProjectTitle>
			<Styled.ProjectDescription>
				<Styled.ProjectTimeLabel>
					{/*TODO 날짜 계산 유틸 구현*/}
					Edited {`${updatedAt}`} ago
				</Styled.ProjectTimeLabel>
				<DropDownMenu menuItems={menuItems}>
					<MenuButton />
				</DropDownMenu>
			</Styled.ProjectDescription>
		</Styled.ProjectArticle>
	);
}

export default ProjectCard;
