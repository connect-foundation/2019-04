import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams } from 'react-router-dom';
import * as Styled from './style';

import ProjectContext from 'contexts/ProjectContext';

function BrowserV2({ ...props }) {
	const { projectId } = useParams();

	const { project } = useContext(ProjectContext);
	const { files, dependencyInstalling } = project;
	const [isReadyToReceiveMessage, setIsReadyToReceiveMessage] = useState(
		false
	);
	const iframeReference = useRef();

	const handleUpdateFile = () => {
		if (!isReadyToReceiveMessage) return;
		const data = {
			command: 'updateFile',
			fileId: project.selectedFileId,
			file: project.files[project.selectedFileId]
		};
		iframeReference.current.contentWindow.postMessage(data, '*');
	};

	useEffect(handleUpdateDependency, [dependencyInstalling]);
	useEffect(handleUpdateFile, [files]);

	return (
		<Styled.Frame>
			<Styled.BrowserV2
				ref={iframeReference}
				src={`/coconut/${projectId}`}
				onLoad={() => {
					setIsReadyToReceiveMessage(true);
				}}
				{...props}
			></Styled.BrowserV2>
		</Styled.Frame>
	);
}

export default BrowserV2;
