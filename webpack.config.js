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
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { ABSOLUTE_PUBLIC_PATH } = require('./env');

const argvModeIndex = process.argv.findIndex(v => v === '--mode');
const mode = argvModeIndex !== '-1' ? process.argv[argvModeIndex + 1] : undefined;
const isDevMode = mode === 'development';
const staticPublicPath = isDevMode 
? { js: 'js', css: 'css' }
: { js: `js`, css: `css`}
const extractTextPlugin = new ExtractTextPlugin(`${staticPublicPath.css}/[name]-one.css`);

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
  entry: { ... entries, common: './public/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${staticPublicPath.js}/[name].js`,
    publicPath: isDevMode ? '' : ABSOLUTE_PUBLIC_PATH,
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
      { test: /\.less$/i,
        // include: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader?javascriptEnabled=true'],
      },
      // {
      //   test: /\.less$/i,
      //   exclude: /node_modules/,
      //   use: 
      //   // isDevMode ? 
      //   (
      //     ['style-loader', {
      //       loader: 'css-loader',
      //       options: { minimize: !isDevMode, sourceMap: isDevMode, modules: true, localIdentName: "[name]__[local]___[hash:base64:5]" }
      //     }, 'postcss-loader', {
      //       loader: 'less-loader',
      //       options: { javascriptEnabled: true}
      //     }]
      //   ) 
      //   // :
      //   // extractTextPlugin.extract({
      //   //     fallback: 'style-loader',
      //   //     use: [{
      //   //       loader: 'css-loader',
      //   //       options: { minimize: !isDevMode, sourceMap: isDevMode, modules: true, localIdentName: "[name]__[local]___[hash:base64:5]" }
      //   //     },{
      //   //       loader: 'postcss-loader',
      //   //     },{
      //   //       loader: 'less-loader',
      //   //       options: { javascriptEnabled: true}
      //   //     }],
      //   // })
      // },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 8192,
            fallback: isDevMode ? 'file-loader' : 'file-loader?name=img/[name].[ext]'
          }
        }]
      }
    ]
  },
  plugins: 
    (isDevMode ? [
      new webpack.HotModuleReplacementPlugin(),
    ] : [/*new CleanWebpackPlugin([path.resolve(__dirname, './dist')]),*/ new BundleAnalyzerPlugin() ])
    .concat([
      new CopyWebpackPlugin([
        { from: 'assets', to: 'staticQRM' }
      ]),
    ... pages.map(name => ( new HtmlWebpackPlugin(
      { filename: (isDevMode ? '' : 'page/') + changeFirststr2Lowercase(name) + '.html',
        template: path.resolve(__dirname, './src/public/index.html'),
        chunksSortMode: 'manual',
        chunks: ['[name]-one.css', '[name].css', changeFirststr2Lowercase(name), 'common']})
    )),
    new myPlugin(),
    new webpack.DefinePlugin({
      __DEV: JSON.stringify(isDevMode),
    }),
    new MiniCssExtractPlugin({
      filename: `${staticPublicPath.css}/[name].css`,
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
      name: true,
    }  
  },
  externals: {
    ...(isDevMode ? {} : {
      // "react": "React",
      // "react-dom": "ReactDOM",
      // "react-router-dom": "ReactRouterDOM",
    })
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, 'src'),
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      store: path.resolve(__dirname, 'src/store'),
      util: path.resolve(__dirname, 'src/util'),
      source: path.resolve(__dirname, 'src/source'),
    }
  },
};

module.exports = (env, argv) => {
  if (argv.mode === 'development'){
    config.devtool = 'inline-source-map';
    config.devServer = {
      port: '9009',
      hot: true,
      proxy:[{
        context: ['/match'],
        target: isDevMode
          ? 'http://activity-test.tuwan.com'
          : 'http://activity.tuwan.com',
        changeOrigin: true,
        secure: false,
        logLevel: 'debug',
      }]
    };
  }

  return config;
};
