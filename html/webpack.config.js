const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');
const path = require("path");

module.exports = {
	mode: 'development',
	entry: {
		accordion: "@minvws/manon/accordion.js",
		expandoRows: "@minvws/manon/expando-rows.js",
		filters: "@minvws/manon/filters.js",
		formHelp: "@minvws/manon/form-help.js",
		navigation: "@minvws/manon/navigation.js",
		sidemenu: "@minvws/manon/sidemenu.js",
		main: "../src/scss/main.scss"
	},
	output: {
		path: __dirname + "/dist",
		filename: 'js/[name].js',
	},
	optimization: {
		removeEmptyChunks: true,
	},
	// resolve: {
	// 	modules: [
	// 		// This is needed when we want to load @minvws/manon from the current node_modules and not the parent directory
	// 		path.resolve(__dirname, 'node_modules')
	// 	],
	// },
	module: {
		rules: [
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				type: "asset/resource",
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							esModule: false,
						}
					},
					{
						loader: 'css-loader',
						options: {
							/**
							 *
							 * @param {string} url
							 */
							url: {
								filter: (url) => !url.startsWith('/'),
							},
							sourceMap: true,
							importLoaders: 2,
						}
					},
					{
						loader: 'resolve-url-loader',
						options: {
							sourceMap: true
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						}
					},
				],
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				type: 'asset/resource',
				generator: {
					filename: 'fonts/[name][ext]'
				}
			},
		],
	},
	plugins: [
		new RemoveEmptyScriptsPlugin({ verbose: true }),
		new MiniCssExtractPlugin({
			filename: "css/[name].css",
		}),
		new CopyPlugin({
			patterns: [
				{
					from: "../static/img/**/*",
					to: "img/[name][ext]",
				},
			],
		}),
	],
};
