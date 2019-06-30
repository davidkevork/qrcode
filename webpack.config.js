const webpack = require('webpack');
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const packageJson = require('./package.json');

const getMode = () => {
  let stageIndex = process.argv.findIndex(arg => arg === '--mode');
  if (stageIndex !== -1) return process.argv[++stageIndex];
  return 'development';
};

const shouldMinify = () => {
  let minifyIndex = process.argv.findIndex(arg => arg === 'disable-minify');
  return minifyIndex === -1;
};

const nodeEnv = getMode();
const isProduction = nodeEnv === 'production';

const publicUrl = isProduction ? "https://davidkevork.github.io/qrcode" : "";

const config = {
  context: path.join(__dirname, 'src'),
  entry: {
    bundle: [
      './index.tsx',
      'react-hot-loader/index',
    ],
    vendor: [
      'react',
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: '[name].[hash].js.map',
    filename: '[name].[hash].js',
    publicPath: isProduction ? './' : '/',
    pathinfo: false,
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  target: 'web',
  devtool: isProduction ? 'none' : 'cheap-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: false,
          experimentalWatchApi: true,
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader',
        ],
      },
      // static assets
      { test: /\.html$/, use: 'html-loader' },
      { test: /\.(png|svg)$/, use: 'url-loader?limit=10000' },
      { test: /\.(jpg|gif)$/, use: 'file-loader' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file-loader'},
      { test: /\.(woff|woff2)$/, loader: 'url-loader?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
    ],
  },
  devServer: {
    historyApiFallback: true,
    contentBase: path.resolve(__dirname, 'src/assets'),
    hot: true,
    inline: true,
    port: 3030,
  },
  optimization: {
    sideEffects: true,
    minimize: true,
    splitChunks: {
      name: 'vendor',
      filename: 'vendor.[hash].js',
      chunks: 'all',
    },
    runtimeChunk: true,
    minimizer: [],
  },
  plugins: [
    new webpack.ProvidePlugin({
      Promise: 'es6-promise-promise',
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html'),
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(nodeEnv),
      'process.env.SENTRY_DSN': JSON.stringify('https://f7f3e98c453642b69cfda88692c6bc58@sentry.io/1488283'),
      'process.env.VERSION': JSON.stringify(packageJson.version),
      'process.env.PUBLIC_URL': JSON.stringify(publicUrl),
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      cache: false,
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
    new CopyWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(__dirname, 'dist'),
        },
      ],
    ),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};

if (nodeEnv === 'development') {
  config.entry.bundle.push('webpack/hot/only-dev-server');
  config.entry.bundle.push('webpack-dev-server/client?http://localhost:'+config.devServer.port);
}

if (shouldMinify()) {
  config.optimization.minimizer.push(new UglifyJsPlugin({
    sourceMap: false,
    parallel: true,
  }));
}

module.exports = config;
