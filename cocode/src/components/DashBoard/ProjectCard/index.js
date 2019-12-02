import React, { useState, useRef } from 'react';
import * as Styled from './style';
import DropDownMenu from 'components/Common/DropDownMenu';
import moment from 'moment';
import { KEY_CODE_ENTER } from 'constants/keyCode';
import {
	selectAllTextAboutFocusedDom,
	changeDivEditable
} from 'utils/domControl';

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
	const renameMenu = [
		{
			value: 'rename',
			onClick: () => handleEditCoconutNameStart()
		}
	];

	const [_, setCoconutName] = useState(name);
	const nameInput = useRef(null);

	const handleEditCoconutNameStart = () => {
		changeDivEditable(nameInput.current, true);
	};
	const handleEditCoconutNameEnd = () => {
		const changedName = nameInput.current.value;
		setCoconutName(changedName);
		console.log('end');

		nameInput.current.contentEditable = false;
	};

	const handleKeyDown = ({ keyCode }) => {
		if (keyCode === KEY_CODE_ENTER) {
			handleEditCoconutNameEnd();
		}
	};

	return (
		<Styled.ProjectArticle>
			<Styled.ProjectTitle
				ref={nameInput}
				onFocus={selectAllTextAboutFocusedDom}
				onKeyDown={handleKeyDown}
			>
				{name}
			</Styled.ProjectTitle>
			<Styled.ProjectDescription>
				<Styled.ProjectTimeLabel>
					Edited {moment(updatedAt).fromNow()}
				</Styled.ProjectTimeLabel>
				<DropDownMenu menuItems={renameMenu}>
					<MenuButton />
				</DropDownMenu>
			</Styled.ProjectDescription>
		</Styled.ProjectArticle>
	);
}

export default ProjectCard;
