import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import * as Styled from './style';

function MonacoEditor({
	isFilesEmpty,
	code,
	handleEditorDidMount,
	handleUpdateCode,
	...props
}) {
	return (
		<Styled.MonacoEditor isFilesEmpty={isFilesEmpty} {...props}>
			<ControlledEditor
				value={code}
				language="javascript"
				theme="vs-dark"
				options={{
					fontSize: '16px'
				}}
				onChange={handleUpdateCode}
				editorDidMount={handleEditorDidMount}
			/>
		</Styled.MonacoEditor>
	);
}

export default MonacoEditor;
