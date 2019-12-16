import React, { useContext, useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';
import Modify from './modify.svg';

import { KEY_CODE_ENTER } from 'constants/keyCode';
import ProjectContext from 'contexts/ProjectContext';
import { updateCoconutsAPICreator } from 'apis/DashBoard';
import { updateProjectInfoActionCreator } from 'actions/Project';
import {
	selectAllTextAboutFocusedDom,
	changeDivEditable
} from 'utils/domControl';
import useFetch from 'hooks/useFetch';

const INFO_TAB_TITLE = 'COCONUT INFO';
const OK = 200;

function Info({ title, content, dispatchProject }) {
	const { projectId } = useParams();
	const [{ status }, setRequest] = useFetch({});

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
		if (status === OK) {
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
				) : ''}
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
	const { project, dispatchProject } = useContext(ProjectContext);
	const { name, description, author } = project;

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
					dispatchProject={dispatchProject}
				/>
				<Info
					title="description"
					content={description}
					project={project}
					dispatchProject={dispatchProject}
				/>
				<Info
					title="author"
					content={author}
					project={project}
					dispatchProject={dispatchProject}
				/>
				<Styled.Button>Delete Coconut</Styled.Button>
			</Styled.TabBody>
		</>
	);
}

export default InfoTab;
