import React, { useEffect, useRef, useContext, useState } from 'react';
import * as Styled from './style';
import moment from 'moment';
import DropDownMenu from 'components/Common/DropDownMenu';
import { updateCoconutNameActionCreator } from 'actions/Dashboard';
import DashBoardContext from 'contexts/DashBoardContext';
import useFetch from 'hooks/useFetch';
import { KEY_CODE_ENTER } from 'constants/keyCode';
import {
	selectAllTextAboutFocusedDom,
	changeDivEditable
} from 'utils/domControl';
import {
	updateCoconutsAPICreator,
	deleteCoconutsAPICreator
} from 'apis/DashBoard';

function MenuButton({ onClick }) {
	return (
		<Styled.ProjectMenuButton onClick={onClick}>
			<Styled.ProjectMenuButtonDot />
			<Styled.ProjectMenuButtonDot />
			<Styled.ProjectMenuButtonDot />
		</Styled.ProjectMenuButton>
	);
}

function ProjectCard({ _id, name, updatedAt }) {
	const renameMenu = [
		{
			value: 'open',
			onClick: () => alert('open')
		},
		{
			value: 'rename',
			onClick: () => handleEditCoconutNameStart()
		},
		{
			value: 'remove',
			onClick: () => handleRemoveCoconut()
		}
	];

	const { dispatch } = useContext(DashBoardContext);
	const [modifying, setModifying] = useState(false);
	const nameInput = useRef(false);

	//TODO loading 시 Circular, error시 토스트 띄우기
	const [{ data, loading, error }, setRequest] = useFetch({});

	const handleEditCoconutNameStart = () => {
		setModifying(true);
		changeDivEditable(nameInput.current, true);
	};
	const handleEditCoconutNameEnd = e => {
		nameInput.current.contentEditable = false;
		fetchName(e.currentTarget.textContent);
	};

	const fetchName = name => {
		setRequest(updateCoconutsAPICreator(_id, { name }));
	};

	const handleKeyDown = e => {
		if (e.keyCode === KEY_CODE_ENTER) handleEditCoconutNameEnd(e);
	};

	useEffect(() => {
		if (!data) return;

		if (modifying) {
			dispatch(updateCoconutNameActionCreator(data));
			setModifying(false);
		}
	}, [data]);

	return (
		<Styled.ProjectArticle>
			<Styled.ProjectTitle
				ref={nameInput}
				onFocus={selectAllTextAboutFocusedDom}
				onBlur={handleEditCoconutNameEnd}
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
