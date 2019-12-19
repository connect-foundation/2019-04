import { pathStack } from './global';
import { pathParser } from './pathParserInMain';
import { transformCode } from './core';
import { executeCodeTemplate } from './codeTemplate';

function requireInMain(path) {
	if (path === '.' || path === './')
		throw Error('Recursive path parsing error');
	const [newPath, newPathParent] = pathParser(path);

	if (window.exports[newPath]) return window.exports[newPath];

	pathStack.push(newPathParent);
	const code = transformCode(window.fileSystem[newPath].contents).value;

	let result = null;
	let stackLength = 0;
	try {
		stackLength = pathStack.length;
		result = eval(executeCodeTemplate(code));
	} catch (error) {
		while (stackLength < pathStack.length) pathStack.pop();
		result = eval(executeCodeTemplate(code));
	}

	window.exports[newPath] = result;
	pathStack.pop();

	return result;
}

export { requireInMain };
