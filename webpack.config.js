const path = require("path");
const fs = require("fs");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { ABSOLUTE_PUBLIC_PATH } = require("./env");

const argvModeIndex = process.argv.findIndex((v) => v === "--mode");
const mode =
  argvModeIndex !== "-1" ? process.argv[argvModeIndex + 2] : undefined;
//local dev environment
const isDevMode = mode === "--env.local=dev";
const isBuildDev = mode === "--env.build=dev";
const isBuildProd = mode === "--env.build=prod";
console.log("==============");
console.log(`loclal devServer: ${isDevMode}`);
console.log(`build in ${isBuildDev ? "dev" : "prod"}`);
const extractTextPlugin = new ExtractTextPlugin(
  isDevMode ? `css/[name].css` : `css/[name]-one.[hash].css`
);

//构建分页
const pages = fs
  .readdirSync(path.resolve(__dirname, "src/page/"))
  .filter((name) => /^[^.]+$/.test(name));
const entries = {};
const changeFirststr2Lowercase = (str) =>
  str.charAt(0).toLowerCase() + str.substring(1);
pages.forEach(
  (name) =>
    (entries[changeFirststr2Lowercase(name)] = "./page/" + name + "/index.js")
);

const context = path.resolve(__dirname, "src");
const config = {
  context,
  // TODO: evn.prod
  // devtool: "source-map",
  entry: { ...entries, common: "./public/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: isDevMode ? "js/[name].js" : `js/[name].[hash].js`,
    publicPath: isDevMode ? "" : ABSOLUTE_PUBLIC_PATH,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader",
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: { minimize: !isDevMode },
          },
        ],
      },
      {
        test: /\.less$/i,
        include: /node_modules/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader?javascriptEnabled=true",
        ],
      },
      {
        test: /\.less$/i,
        exclude: /node_modules/,
        use: isDevMode
          ? [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  // minimize: !isDevMode,
                  sourceMap: isDevMode,
                  // modules: true,
                  // localIdentName: "[name]__[local]___[hash:base64:5]",
                },
              },
              "postcss-loader",
              {
                loader: "less-loader",
                options: { javascriptEnabled: true },
              },
            ]
          : extractTextPlugin.extract({
              fallback: "style-loader",
              use: [
                {
                  loader: "css-loader",
                  options: {
                    minimize: !isDevMode,
                    sourceMap: isDevMode,
                    // modules: true,
                    // localIdentName: "[name]__[local]___[hash:base64:5]",
                  },
                },
                {
                  loader: "postcss-loader",
                },
                {
                  loader: "less-loader",
                  options: { javascriptEnabled: true },
                },
              ],
            }),
      },
      {
        test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              fallback: isDevMode
                ? "file-loader"
                : "file-loader?name=img/[name][hash].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: (isDevMode
    ? [new webpack.HotModuleReplacementPlugin()]
    : [
        new webpack.HashedModuleIdsPlugin({
          hashFunction: "sha256",
          hashDigest: "hex",
          hashDigestLength: 20,
        }),
        /*new CleanWebpackPlugin([path.resolve(__dirname, './dist')]),*/
        // new BundleAnalyzerPlugin(),
      ]
  ).concat([
    ...pages.map(
      (name) =>
        new HtmlWebpackPlugin({
          filename:
            (isDevMode ? "" : "page/") +
            changeFirststr2Lowercase(name) +
            ".htm",
          template: path.resolve(__dirname, "./src/public/index.html"),
          // chunksSortMode: "manual",
          // chunks: [
          //   "[name]-one.css",
          //   "[name].css",
          //   changeFirststr2Lowercase(name),
          //   "common",
          // ],
        })
    ),
    // new myPlugin(),
    new webpack.DefinePlugin({
      __DEV: JSON.stringify(isDevMode),
      __BUILD__DEV: JSON.stringify(isBuildDev),
      __BUILD__PROD: JSON.stringify(isBuildProd),
    }),
    new MiniCssExtractPlugin({
      filename: `css/[name].css`,
      chunkFilename: "[id].css",
    }),
    extractTextPlugin,
  ]),
  optimization: {
    minimizer: isBuildProd ? [new UglifyJsPlugin()] : [],
    splitChunks: {
      chunks(chunk) {
        return chunk.name !== "common";
      },
      name: true,
    },
  },
  externals: {
    ...(isDevMode
      ? {}
      : {
          // "react": "React",
          // "react-dom": "ReactDOM",
          // "react-router-dom": "ReactRouterDOM",
        }),
  },
  resolve: {
    alias: {
      src: path.resolve(__dirname, "src"),
      assets: path.resolve(__dirname, "src/assets"),
      components: path.resolve(__dirname, "src/components"),
      store: path.resolve(__dirname, "src/store"),
      util: path.resolve(__dirname, "src/util"),
      source: path.resolve(__dirname, "src/source"),
      imageExporter: path.resolve(__dirname, "src/imageExporter"),
    },
  },
};

module.exports = (env, argv) => {
  if (argv.mode === "development") {
    // config.devtool = "inline-source-map";
    config.devtool = "eval-cheap-module-source-map";
    config.devServer = {
      port: "9010",
      hot: true,
      host: "0.0.0.0",
      disableHostCheck: true,

      proxy: [
        {
          compress: true,
          context: ["/match"],
          target: isDevMode
            ? "http://activity-test.tuwan.com"
            : "http://activity.tuwan.com",
          changeOrigin: true,
          secure: false,
          logLevel: "debug",
          withCredentials: true,
        },
      ],
    };
  }

  return config;
};
