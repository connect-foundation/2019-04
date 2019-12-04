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

	try {
		child_process.execSync(`rm -rf ${dirName}`);
	} catch (e) {}

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
	bundle(moduleName);
	child_process.execSync(`rm -rf ${dirName}`);
	return [Bundle, moduleVersion];

	function bundle(moduleName) {
		let entry = null;
		const packageKeys = ['browser', 'module', 'main'];
		const file = fs.readFileSync(pathParser(`${moduleName}/package.json`), {
			encoding: 'utf-8'
		});
		const packageObject = JSON.parse(file);
		if (typeof packageObject['browser'] === 'object') {
			Object.entries(packageObject['browser']).forEach(([key, value]) => {
				const abValue = path.resolve(
					`/node_modules/${moduleName}/`,
					value
				);
				const abKey = path.resolve(`/node_modules/${moduleName}/`, key);
				const splitedAbValue = abValue.split('/');
				const splitedAbKey = abKey.split('/');
				while (true) {
					if (splitedAbValue[0] === splitedAbKey[0]) {
						splitedAbKey.shift();
						splitedAbValue.shift();
					} else {
						break;
					}
				}
				let ssPath = '.';
				while (splitedAbKey.length !== 1) {
					splitedAbKey.shift();
					ssPath += '/..';
				}
				splitedAbValue.forEach(p => {
					ssPath += `/${p}`;
				});

				const indexCode = `
				const basiltoast = require('${ssPath}');
				module.exports = basiltoast;`;
				Bundle[path.resolve(`/node_modules/${moduleName}/`, key)] = {
					contents: transpileCode(indexCode)
				};

				core(path.resolve(dirName, 'node_modules', moduleName, value));
			});
		}
		packageKeys.forEach(key => {
			if (entry !== null) return;
			if (packageObject[key] && typeof packageObject[key] === 'string')
				entry = packageObject[key];
		});
		if (!entry) {
			entry = 'index.js';
		}
		const indexEntry = entry;
		entry = path.resolve(dirName, 'node_modules', moduleName, entry);
		core(entry);
		if (!Bundle[`/node_modules/${moduleName}/index.js`]) {
			const indexCode = `
				const basiltoast = require('./${indexEntry}');
				module.exports = basiltoast;`;
			Bundle[`/node_modules/${moduleName}/index.js`] = {
				contents: transpileCode(indexCode)
			};
		}
	}

	function core(param) {
		const parsedPath = pathParser(param);
		const key = pathKeyParser(parsedPath);
		if (Bundle[key]) return;
		try {
			const file = fs.readFileSync(parsedPath, { encoding: 'utf-8' });
			const transpiledCode = transpileCode(file);
			Bundle[key] = { contents: transpiledCode };
			PATH_STACK.push(getParentName(parsedPath));
			const child = requirePathParser(transpiledCode);
			if (child.length) {
				child.forEach(val => core(val));
			}
			PATH_STACK.pop();
		} catch (error) {
			try {
				bundle(param);
			} catch (e) {}
		}
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
