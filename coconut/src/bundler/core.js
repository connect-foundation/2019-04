import * as babel from '@babel/core';
import presetEnv from '@babel/preset-env';
import presetReact from '@babel/preset-react';
import { pathStack } from './global';

function transformCode(code) {
	try {
		const result = babel.transform(code, {
			presets: [presetEnv, presetReact],
			compact: true,
			minified: true
		});
		return {
			state: true,
			value: result.code
		};
	} catch (error) {
		return {
			state: false,
			value: error.message
		};
	}
}

function init() {
	while (pathStack.length) pathStack.pop();
	pathStack.push('/root/src/');
}

export { transformCode, init };