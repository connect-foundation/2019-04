import React from 'react';
import * as Styled from './style';
import DropDownMenu from 'components/Common/DropDownMenu';
import moment from 'moment';

//TODO onClick시 api 요청 이벤트 핸들러 추가
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
					Edited {moment(updatedAt).fromNow()}
				</Styled.ProjectTimeLabel>
				<DropDownMenu menuItems={menuItems}>
					<MenuButton />
				</DropDownMenu>
			</Styled.ProjectDescription>
		</Styled.ProjectArticle>
	);
}

export default ProjectCard;
