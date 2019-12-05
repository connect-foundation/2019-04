const babel = require('@babel/core');
const presetEnv = require('@babel/preset-env');
const presetReact = require('@babel/preset-react');

function transpileCode(code) {
	return babel.transform(code, {
		presets: [presetEnv, presetReact]
	}).code;
}

module.exports = transpileCode;
