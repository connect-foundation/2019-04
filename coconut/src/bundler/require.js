import { pathStack } from './global';
import { pathParser } from './pathParser';
import { transformCode } from './core';
import { scriptCodeTemplate, executeCodeTemplate } from './codeTemplate';

function require(path) {
	if (path === '.' || path === './')
		throw Error('Recursive path parsing error');
	const [newPath, newPathParent] = pathParser(path);

	if (self.exports[newPath]) return self.exports[newPath];

	pathStack.push(newPathParent);
	const code = transformCode(self.fileSystem[newPath].contents).value;

	let result = null;
	let stackLength = 0;
	try {
		stackLength = pathStack.length;
		result = eval(executeCodeTemplate(code));
	} catch (error) {
		while (stackLength < pathStack.length) pathStack.pop();
		result = eval(executeCodeTemplate(code));
	}

	self.bundledCode = `
	${self.bundledCode}\n${scriptCodeTemplate(code, newPath, newPathParent)}`;

	self.exports[newPath] = result;
	pathStack.pop();

	return result;
}

export { require };
