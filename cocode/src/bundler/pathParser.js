import { pathStack, exports } from './global';

function pathParser(path, fileSystem = exports) {
	const [parsedPath, splitedPath] = pathInitializer(path, fileSystem);

	splitedPath.forEach(dir => {
		if (dir === '.') return;
		if (dir === '..') {
			if (parsedPath.length === 0) throw new Error('path error');
			parsedPath.pop();
		} else parsedPath.push(dir);
	});

	const newPath = parsedPath.reduce((acc, current) => {
		if (current === '') return acc;
		acc += `/${current}`;
		return acc;
	}, '');

	parsedPath.pop();
	const newPathParent = parsedPath.reduce((acc, current) => {
		if (current === '') return acc;
		acc += `/${current}`;
		return acc;
	}, '');
	return [`${newPath}.js`, newPathParent];
	// 확장자 관련 코드 필요..
}

function pathInitializer(path) {
	// node_modules 의존성 검사 필요
	const splitedPath = path.split('/').filter(val => val !== '');

	const initialPath = pathStack[pathStack.length - 1]
		.split('/')
		.filter(fileName => fileName !== '');
	return [initialPath, splitedPath];
}

export { pathParser };
