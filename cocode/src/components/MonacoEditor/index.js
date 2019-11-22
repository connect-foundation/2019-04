import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import * as Styled from './style';

function MonacoEditor({ code, onChange, ...props }) {
	return (
		<Styled.MonacoEditor {...props}>
			<ControlledEditor
				value={code ? code : '// 🥥 welcome to cocode 🥥 //\n'}
				language="javascript"
				theme="vs-dark"
				options={{
					fontSize: '16px'
				}}
				onChange={onChange}
			/>
		</Styled.MonacoEditor>
	);
}

export default MonacoEditor;
