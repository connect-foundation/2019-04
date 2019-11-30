import * as babel from '@babel/core';
import presetEnv from '@babel/preset-env';
import presetReact from '@babel/preset-react';
import { pathStack, exports } from './global';

function transformCode(code) {
	try {
		const result = babel.transform(code, {
			presets: [presetEnv, presetReact]
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
	pathStack.push('');
}

export { transformCode, init };
