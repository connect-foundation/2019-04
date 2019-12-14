const { promises } = require('fs');
const path = require('path');

const fs = promises;
const nodeModulesPath = path.join(__dirname, '..', '/node_modules');
const replaceFilesPath = path.join(__dirname);

async function replaceNodeModules(fileName, targetPath) {
	try {
		const fileAbsolutePath = `${replaceFilesPath}${fileName}`;
		const fileContent = await fs.readFile(fileAbsolutePath, {
			encoding: 'utf8'
		});

		const nodeModuleFileAbsolutePath = `${nodeModulesPath}${targetPath}`;
		await fs.writeFile(nodeModuleFileAbsolutePath, fileContent, 'utf8');
		console.log(`change success ${fileName}`);
	} catch (error) {
		console.log(`change fail ${fileName}`);
		console.error(error);
	}
}

const fileList = [
	{
		fileName: '/entry-plugin.js',
		targetPath: '/@babel/preset-env/lib/polyfills/corejs3/entry-plugin.js'
	},
	{
		fileName: '/get-module-list-for-target-version.js',
		targetPath: '/core-js-compat/get-modules-list-for-target-version.js'
	},
	{
		fileName: '/normalize-options.js',
		targetPath: '/@babel/preset-env/lib/normalize-options.js'
	},
	{
		fileName: '/usage-plugin.js',
		targetPath: '/@babel/preset-env/lib/polyfills/corejs3/usage-plugin.js'
	}
];

fileList.forEach(({ fileName, targetPath }) =>
	replaceNodeModules(fileName, targetPath)
);
