const template = {
	'package.json':
		'{\n' +
		'  "name": "new",\n' +
		'  "version": "1.0.0",\n' +
		'  "description": "",\n' +
		'  "keywords": [],\n' +
		'  "main": "src/index.js",\n' +
		'  "dependencies": {\n' +
		'    "react": "16.8.6",\n' +
		'    "react-dom": "16.8.6",\n' +
		'    "styled-components": "4.4.1"\n' +
		'  }\n' +
		'}\n',
	'index.js':
		'import React from "react";\n' +
		'import ReactDOM from "react-dom";\n' +
		'import * as Styled from "./style"\n' +
		'\n' +
		'function App() {\n' +
		'	return (\n' +
		'		<Styled.App>\n' +
		'			<h1>🥥 Hello Cocode World 🥥</h1>\n' +
		'		</Styled.App>\n' +
		'	)\n' +
		'}\n' +
		'\n' +
		'ReactDOM.render(<App />, document.getElementById("coconut-root"));\n',
	'style.js':
		'import styled from "styled-components";\n' +
		'\n' +
		'const App = styled.div`\n' +
		'	text-align: center;\n' +
		'`\n' +
		'\n' +
		'export { App };\n'
};

function getTemplate(file) {
	return template[file];
}

const reactTemplate = () => ({
	_id: '5dd61901353f4858e1b5a9d0',
	name: 'react template',
	description: 'this is react template',
	author: 'New user',
	root: '5dd553be4561ae2bae9cb463',
	entry: '5dd553be4561ae2bae9cb45d',
	files: [
		{
			_id: '5dd553be4561ae2bae9cb463',
			projectId: '5dd61901353f4858e1b5a9d0',
			name: 'root',
			type: 'directory',
			child: ['5dd553be4561ae2bae9cb45f', '5dd553be4561ae2bae9cb462']
		},
		{
			_id: '5dd553be4561ae2bae9cb45f',
			projectId: '5dd61901353f4858e1b5a9d0',
			name: 'src',
			type: 'directory',
			child: ['5dd553be4561ae2bae9cb45d', '5dd553be4561ae2bae9cb45e']
		},
		{
			_id: '5dd553be4561ae2bae9cb45d',
			name: 'index.js',
			projectId: '5dd61901353f4858e1b5a9d0',
			type: 'js',
			contents: getTemplate('index.js')
		},
		{
			_id: '5dd553be4561ae2bae9cb45e',
			name: 'style.js',
			projectId: '5dd61901353f4858e1b5a9d0',
			type: 'js',
			contents: getTemplate('style.js')
		},
		{
			_id: '5dd553be4561ae2bae9cb462',
			name: 'package.json',
			projectId: '5dd61901353f4858e1b5a9d0',
			type: 'npm',
			contents: getTemplate('package.json')
		}
	]
});

export { reactTemplate };
