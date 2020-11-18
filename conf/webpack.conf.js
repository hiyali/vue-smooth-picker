'use strict'

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = function (args, options) {
  const PROD_MODE = options.mode === 'production'
  return {
    entry: {
      'vue-smooth-picker': './src'
    },
    output: {
      path: path.join(__dirname, '../dist'),
      publicPath: './',
      filename: '[name].js',
      library: 'VueSmoothPicker',
      libraryTarget: 'umd'
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        'src': path.resolve(__dirname, '../src'),
        'smooth-picker': path.resolve(__dirname, '../src')
      }
    },
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.(vue|js)$/,
          exclude: /node_modules|\.min\.js$/,
          loader: 'eslint-loader'
        },
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          include: [
            path.join(__dirname, '../src')
          ],
          exclude: /node_modules/
        },
        {
          test: /\.styl(us)?$/,
          use: [
            PROD_MODE
              ? MiniCssExtractPlugin.loader
              : 'vue-style-loader',
            { loader: 'css-loader', options: { importLoaders: 1 }},
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [require('autoprefixer')({
                  'browsers': ['> 4%', 'last 10 versions']
                })]
              }
            },
            'stylus-loader'
          ],
          include: path.join(__dirname, '../src'),
          exclude: /node_modules/
        }
      ]
    },
    optimization: {
      minimize: PROD_MODE,
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'css/style.css'
      })
    ]
  }
}
