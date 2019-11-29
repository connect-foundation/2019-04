import React, { useState, useContext, useEffect } from 'react';
import * as Styled from './style';

import FileTabBar from 'components/Project/FileTabBar';
import MonacoEditor from 'components/Project/MonacoEditor';

function Editor() {
	return (
		<Styled.Editor>
			<FileTabBar />
			<MonacoEditor className="Stretch-width" />
		</Styled.Editor>
	);
}

export default Editor;
