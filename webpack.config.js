const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pathResolve = (targetPath) => path.resolve(__dirname, targetPath);
const isDev = process.env.NODE_ENV === 'development';
const base = {
  mode: process.env.NODE_ENV,
  entry: {
    options: './src/options/index.ts',
    popup: './src/popup/index.ts',
    background: './src/background/index.ts',
    contentScripts: './src/contentScripts/index.ts',
    injectScript: './src/injectScript/index.ts'
  },
  output: {
    path: pathResolve('dist'),
    publicPath: './',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '@': pathResolve('src'),
      vue: 'vue/dist/vue.esm-bundler.js'
    },
    mainFiles: ['index'],
    extensions: ['.wasm', '.ts', '.tsx', '.js', '.jsx', '.mjs', '.json']
  },
  devtool: isDev ? 'eval-source-map' : false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-typescript'
              ],
              plugins: ['@vue/babel-plugin-jsx']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/]
            }
          }
        ],
        exclude: /node_modules/
      },
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: true
        }
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'style-loader',
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'less-loader', // 将 Less 文件编译为 CSS 文件
            options: {
              lessOptions: {
                javascriptEnabled: true
              }
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|ttf|woff)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: './[name].[ext]?[hash]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: pathResolve('src/assets'), to: 'assets' },
        { from: pathResolve('src/_locales'), to: '_locales' },
        { from: pathResolve('src/manifest.json'), to: '[name][ext]' }
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Options',
      template: 'src/index.template.html',
      filename: 'options.html',
      chunks: ['options']
    }),
    new HtmlWebpackPlugin({
      title: 'Popup',
      template: 'src/index.template.html',
      filename: 'popup.html',
      chunks: ['popup']
    })
  ]
};

if (isDev) {
  base.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}
module.exports = base;
