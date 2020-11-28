const path = require('path')
const webpack = require('webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ExtensionReloader = require('webpack-extension-reloader')
const { VueLoaderPlugin } = require('vue-loader')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const pathResolve = function(targetPath) {
  return path.resolve(__dirname, targetPath)
}
const isDev = process.env.NODE_ENV === 'development'
const base = {
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
  devtool: isDev ? 'eval-source-map' : false,
  module: {
    rules: [
      // ... 其它规则
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          extractCSS: !isDev
        },
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: [
          isDev ? 'vue-style-loader' : MiniCssExtractPlugin.loader,
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
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
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

if(isDev) {
  base.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new ExtensionReloader({
      contentScript: 'contentScripts',
      background: 'background',
      extensionPage: 'popup',
      options: 'options'
    })
  )
} else {
  base.plugins.push(
    new MiniCssExtractPlugin({
      filename: '[name].css',
    })
  )
}
module.exports = base