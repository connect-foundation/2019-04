import React, { useState, useEffect, useContext } from 'react';
import * as Styled from './style';

import ProjectContext from 'contexts/ProjectContext';
// import { updateCodeActionCreator } from 'actions/Project';
// import * as bundler from 'bundler';

// import * as babel from '@babel/core';
// import reactPreset from '@babel/preset-react';

function BrowserV1({ code, ...props }) {
	const { project, dispatchProject } = useContext(ProjectContext);
	const { files, entry, selectedFileId } = project;
	const [fileSystem, setFileSystem] = useState({});
	// const buildCode = () => {
	// 	try {
	// 		const parsedCode = babel.transform(code, {
	// 			presets: [reactPreset]
	// 		});
	// 		eval(parsedCode.code);
	// 	} catch (e) {
	// 		console.log(e);
	// 	}
	// };

	// useEffect(buildCode, [files]);
	// useEffect(() => {
	// 	const fileTemp = {};
	// 	Object.keys(bundler.exports).forEach(key => {
	// 		delete bundler.exports[key];
	// 	});
	// 	function fileParser(id, path = '') {
	// 		if (files[id].type !== 'directory') {
	// 			fileTemp[`${path}/${files[id].name}`] = {
	// 				contents: files[id].contents
	// 			};
	// 			bundler.exports[`${path}/${files[id].name}`] = {
	// 				contents: files[id].contents
	// 			};
	// 		} else {
	// 			files[id].child.forEach(file => {
	// 				fileParser(file, `${path}/${files[id].name}`);
	// 			});
	// 		}
	// 	}
	// 	if (project) fileParser(project.root);

	// 	setFileSystem(fileTemp);
	// }, [files]);

	// useEffect(() => {
	// 	console.log(fileSystem);
	// 	try {
	// 		bundler.init();
	// 		bundler.require('/root/src/index');
	// 	} catch (error) {
	// 		console.log(error);
	// 	}
	// }, [fileSystem]);
	return <Styled.BrowserV1 {...props}></Styled.BrowserV1>;
}

export default BrowserV1;
