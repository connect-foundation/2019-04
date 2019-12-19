/* eslint no-restricted-globals: 0 */
import * as bundler from 'bundler';

self.process = {};
self.process.env = {};
self.process.env.NODE_MODULE = 'development';

self.exports = {};

self.addEventListener('message', ({ data: { fileSystem } }) => {
	self.fileSystem = fileSystem;
	self.bundledCode = '';

	buildProject();
});

function buildProject() {
	try {
		bundler.init();
		bundler.require('./index.js');

		self.postMessage({ bundledCode: self.bundledCode });
	} catch (error) {
		self.postMessage({ error: error.stack });
	}
}
