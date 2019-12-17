import React, {
	useEffect,
	useRef,
	useContext,
	useState,
	useMemo,
	useCallback
} from 'react';
import { useHistory } from 'react-router-dom';
import * as Styled from './style';
import DropDownMenu from 'components/Common/DropDownMenu';
import CoconutSpinner from 'components/Common/CoconutSpinner';
import addToast from 'components/Common/Toast';

import {
	updateCoconutNameActionCreator,
	deleteCoconutActionCreator
} from 'actions/Dashboard';
import DashBoardContext from 'contexts/DashBoardContext';
import useFetch from 'hooks/useFetch';
import {
	updateCoconutsAPICreator,
	deleteCoconutsAPICreator
} from 'apis/DashBoard';

import {
	selectAllTextAboutFocusedDom,
	changeDivEditable
} from 'utils/domControl';
import moment from 'moment';
import { KEY_CODE_ENTER } from 'constants/keyCode';
import {
	CONFIRM_DELETE_COCONUT,
	LOADING_UPDATE_PROJECT_CARD,
	FAIL_TO_UPDATE_PROJECT_CARD
} from 'constants/notificationMessage';

function MenuButton({ onClick }) {
	return (
		<Styled.ProjectMenuButton onClick={onClick}>
			<Styled.ProjectMenuButtonDot />
			<Styled.ProjectMenuButtonDot />
			<Styled.ProjectMenuButtonDot />
		</Styled.ProjectMenuButton>
	);
}

function LoadingDisplay() {
	return (
		<Styled.SpinnerContainer>
			<CoconutSpinner />
			<Styled.LoadingPhrase>
				{LOADING_UPDATE_PROJECT_CARD}
			</Styled.LoadingPhrase>
		</Styled.SpinnerContainer>
	);
}

function ProjectCard({ _id, name, updatedAt }) {
	const history = useHistory();
	const { dispatchDashboard } = useContext(DashBoardContext);
	const [modifying, setModifying] = useState(false);
	const [deleting, setDeleting] = useState(false);
	const nameInput = useRef(false);
	const [{ data, loading, error, status }, setRequest] = useFetch({});

	const handleClickOpen = useCallback(
		() => history.push(`../project/${_id}`),
		[_id]
	);

	const handleEditCoconutNameStart = useCallback(() => {
		setModifying(true);
		changeDivEditable(nameInput.current, true);
	});

	const handleEditCoconutNameEnd = useCallback(() => {
		nameInput.current.contentEditable = false;
		const name = nameInput.current.textContent;
		setRequest(updateCoconutsAPICreator(_id, { name }));
	});

	const handleRemoveCoconut = useCallback(() => {
		const acceptDeleteThisCoconut = confirm(CONFIRM_DELETE_COCONUT);
		if (!acceptDeleteThisCoconut) return;

		setDeleting(true);
		setRequest(deleteCoconutsAPICreator(_id));
	});

	const handleKeyDown = useCallback(e => {
		if (e.keyCode === KEY_CODE_ENTER) handleEditCoconutNameEnd();
	});

	const renameMenu = useMemo(() => [
		{
			value: 'open',
			handleClick: handleClickOpen
		},
		{
			value: 'rename',
			handleClick: handleEditCoconutNameStart
		},
		{
			value: 'remove',
			handleClick: handleRemoveCoconut
		}
	]);

	const handleUseAPI = () => {
		if (loading) return;

		if (modifying && data) {
			setModifying(false);
			dispatchDashboard(updateCoconutNameActionCreator(data));
		}

		if (deleting) {
			setDeleting(false);
			dispatchDashboard(deleteCoconutActionCreator(_id));
		}
	};

	const handleAlertError = useCallback(() => {
		if (error) addToast.error(FAIL_TO_UPDATE_PROJECT_CARD);
	});

	useEffect(handleUseAPI, [loading, status]);
	useEffect(handleAlertError, [error]);

	return (
		<Styled.ProjectArticle onClick={handleClickOpen}>
			{loading && <LoadingDisplay />}
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
