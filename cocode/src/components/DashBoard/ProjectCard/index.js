import React, { useEffect, useRef, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Styled from './style';
import moment from 'moment';
import DropDownMenu from 'components/Common/DropDownMenu';
import {
	updateCoconutNameActionCreator,
	deleteCoconutActionCreator
} from 'actions/Dashboard';
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

const ACCEPT_DELETE_NOTIFICATION = '이 프로젝트 지우시겠습니까?';

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
	let history = useHistory();
	const { dispatchDashboard } = useContext(DashBoardContext);
	const [modifying, setModifying] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const nameInput = useRef(false);

	//TODO loading 시 Circular, error시 토스트 띄우기
	const [{ data, loading, error, status }, setRequest] = useFetch({});

	const handleClickOpen = () => history.push(`../project/${_id}`);

	const handleEditCoconutNameStart = () => {
		setModifying(true);
		changeDivEditable(nameInput.current, true);
	};

	const handleEditCoconutNameEnd = () => {
		nameInput.current.contentEditable = false;
		const name = nameInput.current.textContent;
		setRequest(updateCoconutsAPICreator(_id, { name }));
	};

	const handleRemoveCoconut = () => {
		const acceptDeleteThisCoconut = confirm(ACCEPT_DELETE_NOTIFICATION);
		if (!acceptDeleteThisCoconut) return;

		setDeleting(true);
		setRequest(deleteCoconutsAPICreator(_id));
	};

	const handleKeyDown = e => {
		if (e.keyCode === KEY_CODE_ENTER) handleEditCoconutNameEnd();
	};

	useEffect(() => {
		if (loading) return;

		if (modifying && data) {
			setModifying(false);
			dispatchDashboard(updateCoconutNameActionCreator(data));
		}

		if (deleting) {
			setDeleting(false);
			dispatchDashboard(deleteCoconutActionCreator(_id));
		}
	}, [loading, status]);

	return (
		<Styled.ProjectArticle onClick={handleClickOpen}>
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
