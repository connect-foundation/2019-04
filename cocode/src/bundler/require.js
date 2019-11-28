import { pathStack, exports } from './global';
import { pathParser } from './pathParser';
import { transformCode } from './core';

function require(path, fileSystem = exports) {
	const [newPath, newPathParent] = pathParser(path, fileSystem);
	pathStack.push(newPathParent);
	const code = transformCode(fileSystem[newPath].contents).value;
	const result = eval(`
    (() => {
      const exports = {};
      ${code}
      return exports;
    })();`);
	pathStack.pop();
	return result;
}

export { require };
