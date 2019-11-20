import React from 'react';

import FileTabBar from 'components/FileTabBar';
import MonacoEditor from 'components/MonacoEditor';

function Editor() {
    return (
        <>
            <FileTabBar />
            <MonacoEditor />
        </>
    );
}

export default Editor;