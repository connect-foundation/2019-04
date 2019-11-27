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
		'}\n'
};

function getTemplate(file) {
	return template[file];
}

export default getTemplate;
