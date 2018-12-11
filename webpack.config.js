const path = require('path');
const fs = require('fs');
const webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const myPlugin = require('./plugin.js');
const extractTextPlugin = new ExtractTextPlugin('[name].css');

const argvModeIndex = process.argv.findIndex(v => v === '--mode');
const mode = argvModeIndex !== '-1' ? process.argv[argvModeIndex + 1] : undefined;
const isDevMode = mode === 'development';

//构建分页
const pages = fs.readdirSync(path.resolve(__dirname, 'src/page/')).filter(
  name => /^[^.]+$/.test(name)
);
const entries = {};
const changeFirststr2Lowercase = str => str.charAt(0).toLowerCase() + str.substring(1);
pages.forEach(name => entries[
  changeFirststr2Lowercase(name)
] = './page/' + name + '/index.js');

const context = path.resolve(__dirname, 'src');
const config = {
  context,
  entry: { common: './public/index.js', ... entries },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "[name].js",
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/, exclude: /node_modules/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },{
          loader: 'css-loader', options: { minimize: !isDevMode }
        }]
      },
      {
        test: /\.less$/i, exclude: /node_modules/,
        use: extractTextPlugin.extract([
          { loader: 'css-loader', options: { minimize: !isDevMode } },
          'postcss-loader',
          { loader: 'less-loader', options: {sourceMap: true} }]
        )
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
          }
        }]
      }
    ]
  },
  plugins: 
    (isDevMode ? [] : [new CleanWebpackPlugin([path.resolve(__dirname, './dist')]), new BundleAnalyzerPlugin() ])
    .concat([
    ... pages.map(name => ( new HtmlWebpackPlugin(
      { filename: changeFirststr2Lowercase(name) + '.html',
        template: path.resolve(__dirname, './src/public/index.html'),
        chunks: [changeFirststr2Lowercase(name),'common', 'common-one.css', 'common.css', '[name].css']})
    )),
    new myPlugin(),
    new webpack.DefinePlugin({
      __DEV: JSON.stringify(isDevMode),
    }),
    new MiniCssExtractPlugin({
      filename: "[name]-one.css",
      chunkFilename: "[id].css"
    }),
    extractTextPlugin,
  ]),
  optimization: {
    minimizer: [
      new UglifyJsPlugin()
    ],
    splitChunks: {
      chunks (chunk) {
        return chunk.name !== 'common';
      },
      name: true
    }  
  },
  externals: {
    ...(isDevMode ? {} : {
      "react": "React",
      "react-dom": "ReactDOM",
      "react-router-dom": "ReactRouterDOM",
    })
  },
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      store: path.resolve(__dirname, 'src/store'),
      util: path.resolve(__dirname, 'src/util'),
      src: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
    }
  },
  node: {
		process: false,
		Buffer: false
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development'){
    config.devtool = 'inline-source-map';
    config.devServer = {
      contentBase: './public/dist/',
      port: '9008',
      // proxy: {
      //   '/rpaserver/portal/rpa': 'http://172.20.14.106:8080/',
      // },
    };
  }

  return config;
};
