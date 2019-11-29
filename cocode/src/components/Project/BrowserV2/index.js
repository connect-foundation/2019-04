import React, { useEffect, useContext } from 'react';
import * as Styled from './style';

import ProjectContext from 'contexts/ProjectContext';
// import { require } from 'bundler';

function BrowserV2({ ...props }) {
	const { project } = useContext(ProjectContext);
	const { files } = project;

	useEffect(() => {
		console.log(files);
	}, [files]);

	return <Styled.BrowserV2 {...props}></Styled.BrowserV2>;
}

export default BrowserV2;
