import { pathStack } from './global';
import path from 'path';

const DEPENDENCY_PATH = '/node_modules/';
function pathParser(param) {
	const moduleName = param;

	if (param[0] !== '.' && param[0] !== '/') {
		param = `${DEPENDENCY_PATH}${param}`;
	}
	param = path.resolve(pathStack[pathStack.length - 1], param);
	const extension = param.split('.');

	if (extension[extension.length - 1] !== 'js') {
		if (window.fileSystem[`${param}.js`]) {
			return [`${param}.js`, path.dirname(param)];
		} else if (window.fileSystem[`${param}/index.js`]) {
			return [`${param}/index.js`, param];
		} else {
			throw Error(`Module not found: '${moduleName}'`);
		}
	} else {
		return [param, path.dirname(param)];
	}
}

export { pathParser };
