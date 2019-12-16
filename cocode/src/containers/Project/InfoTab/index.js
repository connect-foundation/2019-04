import React, { useContext, useState, useRef, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import * as Styled from './style';
import Modify from './modify.svg';

import { KEY_CODE_ENTER } from 'constants/keyCode';
import ProjectContext from 'contexts/ProjectContext';
import { updateProjectInfoActionCreator } from 'actions/Project';
import useFetch from 'hooks/useFetch';
import {
	deleteCoconutsAPICreator,
	updateCoconutsAPICreator
} from 'apis/DashBoard';
import {
	selectAllTextAboutFocusedDom,
	changeDivEditable
} from 'utils/domControl';

const INFO_TAB_TITLE = 'COCONUT INFO';
const UPDATED_OK = 200;
const DELETED_OK = 204;
const ACCEPT_DELETE_NOTIFICATION = '해당 프로젝트를 삭제하시겠습니까?';

function Info({
	title,
	content,
	projectId,
	status,
	setRequest,
	dispatchProject
}) {
	const input = useRef();
	const [isEditable, setIsEditable] = useState(false);
	const [value, setValue] = useState(content);

	const handleAbleEdit = () => {
		setIsEditable(true);
		changeDivEditable(input.current, true);
	};
	const handleOnChange = event => setValue(event.target.innerText);

	const handleOnSubmit = event => {
		setIsEditable(false);
		const newContent = event.currentTarget.textContent;
		if (content === newContent) return;
		setValue(event.currentTarget.textContent);
		setRequest(
			updateCoconutsAPICreator(projectId, { [title]: newContent })
		);
	};

	const handleOnKeyDown = event => {
		if (event.keyCode === KEY_CODE_ENTER) {
			handleOnSubmit(event);
			event.preventDefault();
		}
	};

	useEffect(() => {
		if (status === UPDATED_OK) {
			const payload = { [title]: value };
			dispatchProject(updateProjectInfoActionCreator(payload));
		}
	}, [status]);

	return (
		<Styled.Info>
			<Styled.InfoTitleTab>
				<h2>{title}</h2>
				{title !== 'author' ? (
					<Styled.Icon
						onClick={handleAbleEdit}
						src={Modify}
						alt="modify.svg"
					/>
				) : (
					''
				)}
			</Styled.InfoTitleTab>
			<div
				ref={input}
				contentEditable={isEditable}
				className={title}
				onChange={handleOnChange}
				onBlur={handleOnSubmit}
				onFocus={selectAllTextAboutFocusedDom}
				onKeyDown={handleOnKeyDown}
			>
				{value}
			</div>
		</Styled.Info>
	);
}

function InfoTab() {
	const history = useHistory();
	const { project, dispatchProject } = useContext(ProjectContext);
	const [{ status }, setRequest] = useFetch({});
	const { name, description, author } = project;
	const { projectId } = useParams();

	const handleDeleteCoconut = () => {
		const acceptDeleteThisCoconut = confirm(ACCEPT_DELETE_NOTIFICATION);
		if (!acceptDeleteThisCoconut) return;
		setRequest(deleteCoconutsAPICreator(projectId));
	};

	useEffect(() => {
		if (status === DELETED_OK) history.replace('../dashboard');
	}, [status]);

	return (
		<>
			<Styled.TabHeader>
				<Styled.Title>{INFO_TAB_TITLE}</Styled.Title>
			</Styled.TabHeader>
			<Styled.TabBody>
				<Info
					title="name"
					content={name}
					project={project}
					projectId={projectId}
					status={status}
					setRequest={setRequest}
					dispatchProject={dispatchProject}
				/>
				<Info
					title="description"
					content={description}
					project={project}
					projectId={projectId}
					status={status}
					setRequest={setRequest}
					dispatchProject={dispatchProject}
				/>
				<Info
					title="author"
					content={author}
					project={project}
					projectId={projectId}
					status={status}
					setRequest={setRequest}
					dispatchProject={dispatchProject}
				/>
				<Styled.Button onClick={handleDeleteCoconut}>
					Delete Coconut
				</Styled.Button>
			</Styled.TabBody>
		</>
	);
}

export default InfoTab;
