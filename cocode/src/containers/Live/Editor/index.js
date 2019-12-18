import React, { useState, useContext, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';

import FileTabBar from 'components/Project/FileTabBar';
import MonacoEditor from 'components/Project/MonacoEditor';

import { LiveContext, UserContext, ProjectContext } from 'contexts';
import {
	updateCodeActionCreator,
	saveFileActionCreator
} from 'actions/Project';

import useFetch from 'hooks/useFetch';
import { updateFileAPICreator } from 'apis/File';

import { isPressCtrlAndS } from 'utils/keyDownEvent';


class CursorWidget {
    constructor(editor, userName, position) {
        this.editor = editor;
        this.id = userName;
        this.domNode = null;
        this.position = position;
    }

    getId() {
        return this.id;
    }

    getDomNode() {
        if (!this.domNode) {
            this.domNode = document.createElement('div');
            this.domNode.innerHTML = this.id;
            this.domNode.style.background = 'grey';
            this.domNode.id = this.id;
        }
        return this.domNode;
    }

    getPosition() {
        return {
            position: this.position,
            preference: [0]
        };
    }
    updatePosition(position) {
        this.position = position;
        this.editor.layoutContentWidget(this);
    }
}

// Constatnts
let timer;
const DEBOUNCING_TIME = 800;
const userCursor = {};

function Editor({ handleForkCoconut }) {
	const { user } = useContext(UserContext);
	const { projectId } = useParams();
	const { project, dispatchProject } = useContext(ProjectContext);
	const { socket, dispatchLive } = useContext(LiveContext);
	const [code, setCode] = useState(project.editingCode);
	const [isEditorMounted, setIsEditorMounted] = useState(false);
	const [_, setRequest] = useFetch({});

	const [fileSelectFlag, setFileSelectFlag] = useState(undefined);
	const { selectedFileId } = project;

	const editorRef = useRef();
	const isBusy = useRef(true);
	const pendingEvent = useRef(false);

	const handleOnChangeCodeInMonaco = (_, changedCode) => {
		// if (timer) clearTimeout(timer);

		// timer = setTimeout(() => {
		// 	setCode(changedCode);
		// }, DEBOUNCING_TIME);
	};

	const handleChangedSelectedFile = () => setCode(project.editingCode);

	const handleRequestUpdateCode = () => {
		if (!isEditorMounted) return;

		const updateFileAPI = updateFileAPICreator(projectId, selectedFileId, {
			contents: project.editingCode
		});
		setRequest(updateFileAPI);
	};

	const handleOnKeyDown = e => {
		if (!isPressCtrlAndS(e)) return;

		e.preventDefault();
		const { files, selectedFileId } = project;
		if (!files[selectedFileId].isEditing) return;

		if (user.username !== project.author) {
			handleForkCoconut();
			return;
		}

		handleRequestUpdateCode();
		dispatchProject(saveFileActionCreator());
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
        if (pendingEvent.current) handleEmit(e, timeStamp);
        const change = e.changes[0];
        const operation = {
            rangeLength: change.rangeLength,
            rangeOffset: change.rangeOffset,
            text: change.text.replace(/\r\n/g, '\n'),
            timeStamp: timeStamp
		};
        socket.emit('change', operation);
    };

    const handleCursor = e => {
        socket.emit('moveCursor', e.position);
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
		if (!socket) return;
		isBusy.current = false;
		socket.on('change', (socketId, op) => {
			if (socket.id === socketId) {
				setTimeout(() => {
					pendingEvent.current = false;
				}, 10);
			} else {
				const rangeOffset = op.rangeOffset;
				const rangeLength = op.rangeLength;
				const text = op.text;

				const startPosition = editorRef.current
					.getModel()
					.getPositionAt(rangeOffset);
				const endPosition = editorRef.current
					.getModel()
					.getPositionAt(rangeOffset + rangeLength);
				isBusy.current = true;
				editorRef.current.executeEdits(socketId, [
					{
						range: {
							startLineNumber: startPosition.lineNumber,
							startColumn: startPosition.column,
							endLineNumber: endPosition.lineNumber,
							endColumn: endPosition.column
						},
						text,
						forceMoveMarkers: true
					}
				]);
				isBusy.current = false;
			}
		});

		socket.on('moveCursor', (username, position) => {
			if (!userCursor[username]) {
				const widget = new CursorWidget(
					editorRef.current,
					username,
					position
				);
				userCursor[username] = widget;
				editorRef.current.addContentWidget(widget);
				return;
			}
			userCursor[username].updatePosition(position);
		});
	}, [socket]);

	return (
		<Styled.Editor>
			<FileTabBar />
			<MonacoEditor
				isFilesEmpty={!project.selectedFileId}
				code={code}
				handleUpdateCode={handleOnChangeCodeInMonaco}
				handleEditorDidMount={handleEditorDidMount}
				className="Stretch-width"
				onKeyDown={handleOnKeyDown}
			/>
		</Styled.Editor>
	);
}


export default Editor;
