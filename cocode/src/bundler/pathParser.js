import { pathStack } from './global';
import path from 'path';

const DEPENDENCY_PATH = '/node_modules/';
function pathParser(param) {
	if (param[0] !== '.' && param[0] !== '/') {
		param = `${DEPENDENCY_PATH}${param}`;
	}
	param = path.resolve(pathStack[pathStack.length - 1], param);
	const extension = param.split('.');

	if (extension[extension.length - 1] !== 'js') {
		if (fileSystem[`${param}.js`]) {
			return [`${param}.js`, path.dirname(param)];
		} else if (fileSystem[`${param}/index.js`]) {
			return [`${param}/index.js`, param];
		} else {
			throw Error('path error');
		}
	} else {
		return [param, path.dirname(param)];
	}
}

export { pathParser };
