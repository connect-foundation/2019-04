import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';

import FileTabBar from 'components/Project/FileTabBar';
import MonacoEditor from 'components/Project/MonacoEditor';

import { LiveContext, UserContext, ProjectContext } from 'contexts';
import {
	updateCodeActionCreator,
	updateCodeFromFileIdActionCreator
} from 'actions/Project';

import useFetch from 'hooks/useFetch';

import { CursorWidget } from 'utils/monacoWidget';

let timer;
const DEBOUNCING_TIME = 1000;
const EVENT_DELAY = 10;

const MAX_RANGE = {
	startLineNumber: 1,
	startColumn: 1,
	endLineNumber: 9999,
	endColumn: 9999
};

const userCursor = {};

function Editor({ handleForkCoconut }) {
	const { user } = useContext(UserContext);
	const { projectId } = useParams();
	const { project, dispatchProject } = useContext(ProjectContext);
	const { socket } = useContext(LiveContext);
	const [code, setCode] = useState(project.editingCode);
	const [isEditorMounted, setIsEditorMounted] = useState(false);
	const [_, setRequest] = useFetch({});

	const [fileSelectFlag, setFileSelectFlag] = useState(undefined);
	const { selectedFileId, files } = project;

	const editorRef = useRef();
	const isBusy = useRef(true);
	const pendingEvent = useRef(false);
	const selectedRef = useRef();
	const filesRef = useRef();

	const handleOnChangeCodeInMonaco = (_, changedCode) => {
		if (timer) clearTimeout(timer);

		timer = setTimeout(() => {
			setCode(changedCode);
		}, DEBOUNCING_TIME);
	};

	const handleChnageSelectedFileMonaco = (
		source,
		text,
		range = MAX_RANGE
	) => {
		isBusy.current = true;
		if (editorRef.current) {
			editorRef.current.executeEdits(source, [
				{
					range,
					text,
					forceMoveMarkers: true
				}
			]);
		}
		setTimeout(() => {
			isBusy.current = false;
		}, 0);
	};

	const handleChangedSelectedFile = () => {
		if (!project) return;
		if (!filesRef.current) return;
		selectedRef.current = selectedFileId;
		setCode(project.editingCode);

		handleChnageSelectedFileMonaco(
			'changeFile',
			filesRef.current[selectedFileId].contents
		);
	};

	const handleUpdateCode = () => {
		if (fileSelectFlag !== selectedFileId) {
			setFileSelectFlag(selectedFileId);
			return;
		}
		const updateCodeAction = updateCodeActionCreator({
			changedCode: code
		});
		dispatchProject(updateCodeAction);
	};

	const handleEmit = (e, timeStamp) => {
		if (isBusy.current) return;
		if (!timeStamp) timeStamp = Date();
		// if (pendingEvent.current) handleEmit(e, timeStamp);
		const change = e.changes[0];
		const operation = {
			rangeLength: change.rangeLength,
			rangeOffset: change.rangeOffset,
			text: change.text.replace(/\r\n/g, '\n'),
			timeStamp: timeStamp
		};
		if (!socket) return;
		// pendingEvent.current = true;
		socket.emit('change', selectedRef.current, operation);
	};

	const handleCursor = e => {
		if (!socket) return;
		socket.emit('moveCursor', selectedRef.current, e.position);
	};

	const handleEditorDidMount = (_, editor) => {
		editorRef.current = editor;
		editor.onDidChangeModelContent(handleEmit);
		editor.onDidChangeCursorPosition(handleCursor);
		setIsEditorMounted(true);
	};

	useEffect(handleUpdateCode, [code]);
	useEffect(handleChangedSelectedFile, [project.selectedFileId]);

	useEffect(() => {
		if (!isEditorMounted) return;
		selectedRef.current = selectedFileId;
		isBusy.current = true;
		handleChnageSelectedFileMonaco('initial', project.editingCode);
	}, [isEditorMounted]);

	useEffect(() => {
		//initialize
		if (!socket) return;
		if (!isEditorMounted) return;
		isBusy.current = false;
		filesRef.current = JSON.parse(JSON.stringify(files));
		socket.on('change', handleOnChangeCode);
		socket.on('moveCursor', handleMoveCursor);
	}, [socket, isEditorMounted]);

	const handleOnChangeCode = (socketId, fileId, op) => {
		if (socket.id === socketId) {
			setTimeout(() => {
				pendingEvent.current = false;
			}, EVENT_DELAY);
			return;
		}

		if (selectedRef.current !== fileId) {
			const originCode = filesRef.current[fileId].contents;

			const str1 = originCode.slice(0, op.rangeOffset);
			const str2 = originCode.slice(op.rangeOffset + op.rangeLength);
			const changedCode = `${str1}${op.text}${str2}`;
			filesRef.current[fileId].contents = changedCode;
			const updateCodeFromFileIdAction = updateCodeFromFileIdActionCreator(
				{
					fileId,
					changedCode
				}
			);
			dispatchProject(updateCodeFromFileIdAction);
			return;
		}

		const rangeOffset = op.rangeOffset;
		const rangeLength = op.rangeLength;
		const text = op.text;

		const startPosition = editorRef.current
			.getModel()
			.getPositionAt(rangeOffset);
		const endPosition = editorRef.current
			.getModel()
			.getPositionAt(rangeOffset + rangeLength);

		handleChnageSelectedFileMonaco(socketId, text, {
			startLineNumber: startPosition.lineNumber,
			startColumn: startPosition.column,
			endLineNumber: endPosition.lineNumber,
			endColumn: endPosition.column
		});
	};

	const handleMoveCursor = (username, fileId, position) => {
		if (!userCursor[username]) {
			const widget = new CursorWidget(
				editorRef.current,
				username,
				position
			);
			userCursor[username] = widget;
			editorRef.current.addContentWidget(widget);
		}
		if (selectedRef.current === fileId)
			userCursor[username].showCursor(position);
		else userCursor[username].hiddenCursor();
	};

	return (
		<Styled.Editor>
			<FileTabBar />
			<MonacoEditor
				isFilesEmpty={!project.selectedFileId}
				code={''}
				handleUpdateCode={handleOnChangeCodeInMonaco}
				handleEditorDidMount={handleEditorDidMount}
				className="Stretch-width"
			/>
		</Styled.Editor>
	);
}

export default Editor;
