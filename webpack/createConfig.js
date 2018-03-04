function createConfig(params) {
  const isProduction = params.isProduction;
  const min = isProduction ? ".min" : "";

  const webpack = require("webpack");
  const ExtractTextPlugin = require("extract-text-webpack-plugin");
  const WebpackNotifierPlugin = require("webpack-notifier");
  const ParallelUglifyESPlugin = require("webpack-parallel-uglify-es-plugin");
  const WebpackAssetsManifest = require("webpack-assets-manifest");


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

  if (isProduction) {
    output.filename = "[name].[chunkhash].min.js";
    output.path = `${output.path}/build/`;
  }

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


  // plugins
  // --------------------------------------------------------------------------

  let cssPath = `app${min}.css`;

  if (isProduction) {
    cssPath = `app.[hash]${min}.css`;
  }

  plugins = [
    new ExtractTextPlugin(cssPath, {
      allChunks: true
    }),
    new WebpackNotifierPlugin(),
  ];

  if (isProduction) {
    // minify css
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
      })
    )

    // minify js
    plugins.push(
      new ParallelUglifyESPlugin({
        compress: {
          warnings: false,
        },
      })
    );

    plugins.push(
      new WebpackAssetsManifest({})
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
