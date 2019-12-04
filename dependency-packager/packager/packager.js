const fs = require('fs');
const path = require('path');
const child_process = require('child_process');

const transpileCode = require('./transpiler');
const { requireRegexp, pathRegexp, maskQuotationRegexp } = require('./regex');

const packageTemplate = require('./package-template');

function main(moduleName, moduleVersion) {
	const dirName = moduleName.replace(/[/]{1}/g, '-');
	const PATH_PREFIX = path.resolve(`${dirName}/node_modules`);
	const PATH_STACK = [PATH_PREFIX];
	const Bundle = {};

	const command = `
    mkdir ${dirName} && cd ${dirName} && echo '${packageTemplate}' >> package.json && yarn add ${moduleName}${
		moduleVersion ? '@' + moduleVersion : ''
	}`;

	child_process.execSync(command);
	if (!moduleVersion) {
		const file = fs.readFileSync(path.resolve(`${dirName}/package.json`), {
			encoding: 'utf-8'
		});
		moduleVersion = JSON.parse(file)['dependencies'][moduleName].replace(
			'^',
			''
		);
	}
	bundle();
	child_process.execSync(`rm -rf ${dirName}`);
	return [Bundle, moduleVersion];

	function bundle() {
		const entries = [];
		try {
			fs.statSync(pathParser(moduleName));
			entry.push(moduleName);
		} catch (error) {
			const file = fs.readFileSync(
				pathParser(`${moduleName}/package.json`),
				{
					encoding: 'utf-8'
				}
			);
			JSON.parse(file)['main']
				? entries.push(
						path.resolve(
							PATH_PREFIX,
							moduleName,
							JSON.parse(file)['main']
						)
				  )
				: '';
			JSON.parse(file)['module']
				? entries.push(
						path.resolve(
							PATH_PREFIX,
							moduleName,
							JSON.parse(file)['module']
						)
				  )
				: '';
		}
		entries.forEach(entry => {
			core(entry);
		});
	}

	function core(path) {
		const parsedPath = pathParser(path);
		const key = pathKeyParser(parsedPath);
		if (Bundle[key]) return;
		try {
			const file = fs.readFileSync(parsedPath, { encoding: 'utf-8' });
			const transpiledCode = transpileCode(file);
			Bundle[key] = transpiledCode;
			PATH_STACK.push(getParentName(parsedPath));
			const child = requirePathParser(transpiledCode);
			if (child.length) {
				child.forEach(val => core(val));
			}
			PATH_STACK.pop();
		} catch (error) {}
	}

	function requirePathParser(code) {
		const requires = code.match(requireRegexp);
		if (requires) {
			return requires.reduce((acc, current) => {
				acc.push(
					pathRegexp.exec(current)[0].replace(maskQuotationRegexp, '')
				);
				return acc;
			}, []);
		}
		return [];
	}

	function pathParser(param) {
		return extensionParser(indexParser(nodeModuleParser(param)));
	}

	function extensionParser(path) {
		const FILE_EXTENSION = ['js', 'css', 'jsx', 'json'];
		const splitedPath = path.split('.');
		const extension = splitedPath[splitedPath.length - 1];

		if (!FILE_EXTENSION.some(ex => ex === extension)) {
			return `${path}.js`;
		} else {
			return `${path}`;
		}
	}

	function nodeModuleParser(param) {
		if (isNodeModule(param)) {
			return path.resolve(PATH_PREFIX, param);
		}
		return path.resolve(getLastElementPathStack(), param);
	}

	function indexParser(path) {
		if (isDir(path)) {
			return `${path}/index.js`;
		}
		return path;
	}

	function isNodeModule(path) {
		if (path[0] === '.' || path[0] === '/') return false;
		return true;
	}

	function isDir(path) {
		try {
			return fs.statSync(path).isDirectory();
		} catch (error) {
			try {
				return fs.statSync(`${path}.js`).isDirectory();
			} catch (error) {
				return false;
			}
		}
	}

	function getLastElementOfArray(array) {
		return array[array.length - 1];
	}

	function getLastElementPathStack() {
		return getLastElementOfArray(PATH_STACK);
	}

	function getParentName(path) {
		const splitedPath = path.split('/');
		splitedPath.pop();
		return splitedPath.reduce((acc, current) => {
			if (current === '') return acc;
			return (acc += `/${current}`);
		}, '');
	}

	function pathKeyParser(path) {
		const NODE_MODULE_PATH = '/node_modules/';
		const temp = path.split(NODE_MODULE_PATH);
		return `${NODE_MODULE_PATH}${temp[1]}`;
	}
}

module.exports = main;
