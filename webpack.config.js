const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

const pathResolve = function(targetPath) {
  return path.resolve(__dirname, targetPath)
}
// const isDev = process.env.NODE_ENV === 'devlopment'

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    options: './src/options/index.js',
    popup: './src/popup/index.js',
    background: './src/background/index.js',
    contentScripts: './src/contentScripts/index.js',
    injectScript: './src/injectScript/index.js'
  },
  output: {
    path: pathResolve('dist'),
    publicPath: './',
    filename: '[name].js'
  },
  resolve: {
    alias: {
      '@': pathResolve('src')
    }
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader',
        ],
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
        ],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: true }),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: pathResolve('src/assets'), to: 'assets' },
        { from: pathResolve('src/_locales'), to: '_locales'},
        { from: pathResolve('src/manifest.json'), to: 'manifest.json', flatten: true },
      ]
    }),
    new HtmlWebpackPlugin({
      title: 'Options',
      template: 'src/index.template.html',
      filename: 'options.html',
      chunks: ['options'],
    }),
    new HtmlWebpackPlugin({
      title: 'Popup',
      template: 'src/index.template.html',
      filename: 'popup.html',
      chunks: ['popup'],
    }),
  ]
}