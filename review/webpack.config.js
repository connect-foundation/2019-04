const path = require('path');
const webpack = require('webpack');

const dotenv = require('dotenv');
const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});

module.exports = {
	devtool: 'cheap-module-eval-source-map',
	entry: __dirname + '/src/index.js',
	output: {
		path: __dirname + '/public',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.(js)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.(css)$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.css']
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.DefinePlugin(envKeys)
	],
	devServer: {
		clientLogLevel: 'silent',
		disableHostCheck: true,
		contentBase: path.join(__dirname, 'public'),
		compress: false,
		inline: true,
		hot: true,
		liveReload: false,
		watchContentBase: false,
		// noInfo: false,
		stats: 'minimal',
		overlay: {
			warnings: true,
			errors: true
		},
		port: 3000
	}
};
