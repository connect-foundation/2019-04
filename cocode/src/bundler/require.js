import { pathStack } from './global';
import { pathParser } from './pathParser';
import { transformCode } from './core';

const executeCodeTemplate = code => /*javascript*/ `
(() => {
	const exports = {};
	try {
		${code}
		return Object.keys(exports).length ? exports : module.exports;
	} catch (e) {
		const ignoreErrorList = [
			'Cannot redefine property',
			'Cannot read property',
			'Cannot set property default of #<Object> which has only a getter'
		];
		const errorType = e.message;
		const isExistInIgnoreList = ignoreErrorList.some(ignoreError =>
			errorType.startsWith(ignoreError)
		);

		if(!isExistInIgnoreList) throw e;
	}
})()`;

function require(path) {
	if (path === '.' || path === './')
		throw Error('Recursive path parsing error');
	const [newPath, newPathParent] = pathParser(path);

	if (exports[newPath]) return exports[newPath];

	pathStack.push(newPathParent);
	const code = transformCode(fileSystem[newPath].contents).value;

	let result = null;
	let stackLength = 0;
	try {
		stackLength = pathStack.length;
		result = eval(executeCodeTemplate(code));
	} catch (error) {
		while (stackLength < pathStack.length) pathStack.pop();
		result = eval(executeCodeTemplate(code));
	}

	exports[newPath] = result;
	pathStack.pop();
	return result;
}

export { require };
