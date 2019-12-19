import path from 'path';

const DEPENDENCY_PATH = '/node_modules/';

function pathParser(param) {
	const moduleName = param;

	if (param[0] !== '.' && param[0] !== '/') {
		param = `${DEPENDENCY_PATH}${param}`;
	}

	param = path.resolve(window.pathStack[window.pathStack.length - 1], param);
	const extension = param.split('.');

	if (extension[extension.length - 1] === 'js') {
		return [param, path.dirname(param)];
	}
	if (window.fileSystem[`${param}.js`]) {
		return [`${param}.js`, path.dirname(param)];
	}
	if (window.fileSystem[`${param}/index.js`]) {
		return [`${param}/index.js`, param];
	}

	throw Error(`Module not found: '${moduleName}'`);
}

export { pathParser };
