/* eslint no-restricted-globals: 0 */
import * as bundler from 'bundler';

self.process = {};
self.process.env = {};
self.process.env.NODE_MODULE = 'development';

self.exports = {};

self.addEventListener('message', ({ data }) => {
	const { fileSystem, updatedFilePath } = data;

	self.exports[updatedFilePath] = undefined;
	self.fileSystem = fileSystem;
	self.bundledCode = '';

	buildProject();
});

function buildProject() {
	try {
		bundler.init();
		bundler.require('./index.js');

		buildRemainModule();
		self.postMessage({ bundledCode: self.bundledCode });
	} catch (error) {
		self.postMessage({ error: error.stack });
	}
}

function buildRemainModule() {
	const bundledModules = Object.keys(self.exports);
	let remainModules = Object.keys(self.fileSystem).filter(
		path => !bundledModules.includes(path)
	);

	const installList = ['axios'];

	remainModules = remainModules
		.filter(path => installList.includes(path.split('/')[2]))
		.forEach(path => bundler.require(path));
}
