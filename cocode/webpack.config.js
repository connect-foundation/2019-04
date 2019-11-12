const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');
const smp = new SpeedMeasurePlugin();

module.exports = smp.wrap({
	devtool: 'cheap-module-eval-source-map',
	mode: 'development',
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
	plugins: [],
	devServer: {
		clientLogLevel: 'silent',
		disableHostCheck: true,
		contentBase: path.join(__dirname, 'public'),
		compress: false,
		inline: true,
		hot: true,
		liveReload: false,
		watchContentBase: false,
		// noInfo: true,
		stats: 'minimal',
		overlay: {
			warnings: true,
			errors: true
		},
		port: 3000
	}
});
