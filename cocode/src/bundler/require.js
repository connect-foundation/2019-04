import { pathStack } from './global';
import { pathParser } from './pathParser';
import { transformCode } from './core';

function require(path) {
	if (path.length < 3) throw Error('path error');
	const [newPath, newPathParent] = pathParser(path);
	if (exports[newPath]) {
		return exports[newPath];
	}
	pathStack.push(newPathParent);
	const code = transformCode(fileSystem[newPath].contents).value;

	let result = null;
	let stackLength = 0;
	try {
		stackLength = pathStack.length;
		result = eval(`
	(() =>{const exports = {};
	try {
		${code}
		return Object.keys(exports).length ? exports : module.exports 
	}catch(e) {}
	})()`);
	} catch (error) {
		while (stackLength < pathStack.length) pathStack.pop();
		result = eval(code);
	}
	exports[newPath] = result;
	pathStack.pop();

	return result;
}

export { require };
