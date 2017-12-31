function createConfig(params) {
	const isProduction = params.isProduction;
	const min = isProduction ? ".min" : "";

	const webpack = require("webpack");
	const ExtractTextPlugin = require("extract-text-webpack-plugin");
	const WebpackNotifierPlugin = require("webpack-notifier");
	const ParallelUglifyESPlugin = require("webpack-parallel-uglify-es-plugin");


	// settings common to both `watch` and `build`
	// --------------------------------------------------------------------------

	const entry = {
		app: "./src/app.js",
	};

	const output = {
		path: __dirname + "/../static",
		filename: `[name]${min}.js`,
		publicPath: "./",
	};

	const resolve = {
		extensions: [".webpack.js", ".web.js", ".js", ".jsx", ".scss", ".sass"]
	};

	const module = {
		loaders: [
			// js: use babel
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: ["env"]
					}
				}
			},

			// sass: pull into standalone file
			{
				test: /\.(sass|scss)$/,
				exclude: [/node_modules/],
				loader: ExtractTextPlugin.extract({
					use: ["raw-loader", "sass-loader"],
				})
			},
		]
	};

	plugins = [
		new ExtractTextPlugin(`app${min}.css`, {
			allChunks: true
		}),
		new WebpackNotifierPlugin()
	];


	// production options
	// --------------------------------------------------------------------------

	if (isProduction) {
		plugins.push(
			new webpack.DefinePlugin({
				"process.env": {
					NODE_ENV: JSON.stringify("production")
				}
			})
		);

		plugins.push(
			new ParallelUglifyESPlugin({
				compress: {
					warnings: false,
				},
			})
		);
	}


	// the config object
	// --------------------------------------------------------------------------

	return {
		entry,
		output,
		resolve,
		module,
		plugins,
	};
}

module.exports = createConfig;
