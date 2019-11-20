import React from 'react';
import { ControlledEditor } from '@monaco-editor/react';
import * as Styled from './style';

function MonacoEditor() {
    return (
        <Styled.MonacoEditor>
            <ControlledEditor
                height="100vh"
                language="javascript"
                theme="vs-dark"
            />
        </Styled.MonacoEditor>
    );
}

export default MonacoEditor;