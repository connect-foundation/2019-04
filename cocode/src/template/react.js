const template = {
	css:
		'.App {\n' +
		'  font-family: sans-serif;\n' +
		'  text-align: center;\n' +
		'}\n',
	html:
		'<!DOCTYPE html>\n' +
		'<html lang="en">\n' +
		'\n' +
		'<head>\n' +
		'\t<meta charset="utf-8">\n' +
		'\t<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">\n' +
		'\t<meta name="theme-color" content="#000000">\n' +
		'\t<!--\n' +
		'      manifest.json provides metadata used when your web app is added to the\n' +
		'      homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/\n' +
		'    -->\n' +
		'\t<link rel="manifest" href="%PUBLIC_URL%/manifest.json">\n' +
		'\t<link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">\n' +
		'\t<!--\n' +
		'      Notice the use of %PUBLIC_URL% in the tags above.\n' +
		'      It will be replaced with the URL of the `public` folder during the build.\n' +
		'      Only files inside the `public` folder can be referenced from the HTML.\n' +
		'\n' +
		'      Unlike "/favicon.ico" or "favicon.ico", "%PUBLIC_URL%/favicon.ico" will\n' +
		'      work correctly both with client-side routing and a non-root public URL.\n' +
		'      Learn how to configure a non-root public URL by running `npm run build`.\n' +
		'    -->\n' +
		'\t<title>React App</title>\n' +
		'</head>\n' +
		'\n' +
		'<body>\n' +
		'\t<noscript>\n' +
		'\t\tYou need to enable JavaScript to run this app.\n' +
		'\t</noscript>\n' +
		'\t<div id="root"></div>\n' +
		'\t<!--\n' +
		'      This HTML file is a template.\n' +
		'      If you open it directly in the browser, you will see an empty page.\n' +
		'\n' +
		'      You can add webfonts, meta tags, or analytics to this file.\n' +
		'      The build step will place the bundled scripts into the <body> tag.\n' +
		'\n' +
		'      To begin the development, run `npm start` or `yarn start`.\n' +
		'      To create a production bundle, use `npm run build` or `yarn build`.\n' +
		'    -->\n' +
		'</body>\n' +
		'\n' +
		'</html>',
	js:
		'import React from "react";\n' +
		'import ReactDOM from "react-dom";\n' +
		'\n' +
		'import "./styles.css";\n' +
		'\n' +
		'function App() {\n' +
		'  return (\n' +
		'    <div className="App">\n' +
		'      <h1>Hello CodeSandbox</h1>\n' +
		'      <h2>Start editing to see some magic happen!</h2>\n' +
		'    </div>\n' +
		'  );\n' +
		'}\n' +
		'\n' +
		'const rootElement = document.getElementById("root");\n' +
		'ReactDOM.render(<App />, rootElement);\n',
	package:
		'{\n' +
		'  "name": "new",\n' +
		'  "version": "1.0.0",\n' +
		'  "description": "",\n' +
		'  "keywords": [],\n' +
		'  "main": "src/index.js",\n' +
		'  "dependencies": {\n' +
		'    "react": "16.8.6",\n' +
		'    "react-dom": "16.8.6",\n' +
		'    "react-scripts": "3.0.1"\n' +
		'  },\n' +
		'  "devDependencies": {\n' +
		'    "typescript": "3.3.3"\n' +
		'  },\n' +
		'  "scripts": {\n' +
		'    "start": "react-scripts start",\n' +
		'    "build": "react-scripts build",\n' +
		'    "test": "react-scripts test --env=jsdom",\n' +
		'    "eject": "react-scripts eject"\n' +
		'  },\n' +
		'  "browserslist": [">0.2%", "not dead", "not ie <= 11", "not op_mini all"]\n' +
		'}\n',
	version1:
		'// react, react-dom 라이브러리를 좌측 탭에서 설치해주세여.\n' +
		'// 원하시는 라이브러리를 입력하고 enter를 누르시면 검색됩니다.\n' +
		'// + 버튼을 누르면 dependency가 설치됩니다!\n' +
		'import React, { useState } from "react";\n' +
		'import ReactDOM from "react-dom";\n' +
		'\n' +
		'function App() {\n' +
		'	const [state, setState] = useState("Cocode");\n' +
		'\n' +
		'	return(\n' +
		'		<>\n' +
		'			<h1>Hi! {state}</h1>\n' +
		'		</>\n' +
		'	)\n' +
		'}\n' +
		'\n' +
		'ReactDOM.render(<App />, document.getElementById("coconut-root"));\n',
	Apple:
		'function Apple() {\n' +
		'	return(\n' +
		'		<>\n' +
		'			<h1>Apple!</h1>\n' +
		'		</>\n' +
		'	)\n' +
		'}\n' +
		'\n' +
		'export default Apple;\n',
	Banana:
		'function Banana() {\n' +
		'	return(\n' +
		'		<>\n' +
		'			<h1>Banana!</h1>\n' +
		'		</>\n' +
		'	)\n' +
		'}\n' +
		'\n' +
		'export default Banana;\n'
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
			child: [
				'5dd553be4561ae2bae9cb45d',
				'5dd553be4561ae2bae9cb45e',
				'5dd553be4561ae2bae9cb461'
			]
		},
		{
			name: 'index.js',
			projectId: '5dd61901353f4858e1b5a9d0',
			type: 'js',
			contents: getTemplate('version1'),
			_id: '5dd553be4561ae2bae9cb45d'
		},
		{
			name: 'Apple.js',
			projectId: '5dd61901353f4858e1b5a9d0',
			type: 'js',
			contents: getTemplate('Apple'),
			_id: '5dd553be4561ae2bae9cb45e'
		},
		{
			_id: '5dd553be4561ae2bae9cb461',
			projectId: '5dd61901353f4858e1b5a9d0',
			name: 'Component',
			type: 'directory',
			child: ['5dd553be4561ae2bae9cb460']
		},
		{
			name: 'Banana.js',
			projectId: '5dd61901353f4858e1b5a9d0',
			type: 'js',
			contents: getTemplate('Banana'),
			_id: '5dd553be4561ae2bae9cb460'
		},
		{
			name: 'package.json',
			projectId: '5dd61901353f4858e1b5a9d0',
			type: 'npm',
			contents: getTemplate('package'),
			_id: '5dd553be4561ae2bae9cb462'
		}
	]
});

export { reactTemplate };
