const path = require('path');

module.exports = async ({ config }) => {

	config.resolve.modules = [
		...(config.resolve.modules || []),
		path.resolve(path.join(__dirname), '../src'),
	];
	return config;
};
