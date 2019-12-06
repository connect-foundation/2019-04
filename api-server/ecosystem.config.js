'use strict';
module.exports = {
	apps: [
		{
			name: 'app',
			script: 'babel-node src/app.js',
			watch: false,
			env: {
				NODE_ENV: 'development'
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
