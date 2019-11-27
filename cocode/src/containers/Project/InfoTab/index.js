import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
import * as Styled from './style';
import { KEY_CODE_ENTER } from 'constants/keyCode';

import Modify from './modify.svg';

const INFO_TAB_TITLE = 'COCONUT INFO';

function Info({ title, context }) {
	const input = useRef();
	const [isEditable, setIsEditable] = useState(false);
	const [value, setValue] = useState(context);

	const handleAbleEdit = () => {
		setIsEditable(true);
		if (input.current) input.current.focus();
	};
	const handleOnChage = event => setValue(event.target.innerText);

	const handleOnSubmit = () => setIsEditable(false);

	const handleOnKeyDown = event => {
		if (event.keyCode === KEY_CODE_ENTER) {
			handleOnSubmit();
			event.preventDefault();
		}
	};

	const handleOnFocus = event => {
		const target = event.target;
		const range = document.createRange();
		const selection = window.getSelection();
		range.setStart(target, 1);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
		target.focus();
	};

	useEffect(() => {
		if (isEditable) input.current.focus();
	}, [isEditable]);
	return (
		<Styled.Info>
			<Styled.InfoTitleTab>
				<h2>{title}</h2>
				<Styled.Icon
					onClick={handleAbleEdit}
					src={Modify}
					alt="modify.svg"
				/>
			</Styled.InfoTitleTab>
			<div
				ref={input}
				contentEditable={isEditable}
				className={title}
				onChange={handleOnChage}
				onBlur={handleOnSubmit}
				onFocus={handleOnFocus}
				onKeyDown={handleOnKeyDown}
			>
				{value}
			</div>
		</Styled.Info>
	);
}

function InfoTab({ name, description, author }) {
	return (
		<Styled.InfoTab>
			<Styled.Title>{INFO_TAB_TITLE}</Styled.Title>
			<Info title="name" context={name} />
			<Info title="description" context={description} />
			<Info title="author" context={author} />
			<Styled.Button>Delete Coconut</Styled.Button>
		</Styled.InfoTab>
	);
}

export default InfoTab;
