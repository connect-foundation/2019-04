import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import * as Styled from './style';

function MonacoEditor(props) {
	return (
		<Styled.MonacoEditor {...props}>
			<ControlledEditor
				value={'// 🥥 welcome to cocode 🥥 //\n'}
				language="javascript"
				theme="vs-dark"
				options={{
					fontSize: '16px'
				}}
			/>
		</Styled.MonacoEditor>
	);
}

export default MonacoEditor;
