const scriptCodeTemplate = (code, newPath, parentPath) => /*javascript*/ `
exports['${newPath}'] = (() => {
	if(window === undefined) return {};
	window.pathStack = [];
	pathStack.push('${parentPath}');

	let exports = {};
	let module = { exports: {} };
	
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

const executeCodeTemplate = code => /*javascript*/ `
(() => {
	let exports = {};
	try {
		${code}
		return Object.keys(exports).length ? exports : module.exports;
	} catch (e) {
		const ignoreErrorList = [
			'Cannot redefine property',
			'Cannot read property',
			'Cannot set property default of #<Object> which has only a getter',
			'document is not defined'
		];
		const assignEmptyErrorType = "Module not found: 'path'";

		const errorType = e.message;
		if(errorType.startsWith(assignEmptyErrorType)) 
			return Object.keys(exports).length ? exports : module.exports;
		const isExistInIgnoreList = ignoreErrorList.some(ignoreError =>
			errorType.startsWith(ignoreError)
		);

		if(!isExistInIgnoreList) throw e;
	}
})()`;

export { scriptCodeTemplate, executeCodeTemplate };
