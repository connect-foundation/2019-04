import React from 'react';
import * as Styled from './style';

import FileTabBar from 'components/FileTabBar';
import MonacoEditor from 'components/MonacoEditor';

function Editor() {
	return (
		<Styled.Editor>
			<FileTabBar />
			<MonacoEditor className="Stretch-width" />
		</Styled.Editor>
	);
}

export default Editor;
