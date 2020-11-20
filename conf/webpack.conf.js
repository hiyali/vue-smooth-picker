'use strict'

const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = function (args) { // , options , options.mode
  const IS_PRODUCTION = process.env.NODE_ENV === 'production'
  console.log('IS_PRODUCTION:', IS_PRODUCTION)

  return {
    mode: IS_PRODUCTION ? 'production' : 'development',
    devtool: IS_PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',
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
        // 'vue': 'vue/dist/vue.esm-bundler.js', // 'vue/dist/vue.runtime.esm-bundler.js',
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
            IS_PRODUCTION
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
      minimize: IS_PRODUCTION,
      minimizer: [
        new TerserJSPlugin({}),
        new OptimizeCSSAssetsPlugin({})
      ]
    },
    plugins: [
      new VueLoaderPlugin(),
      new MiniCssExtractPlugin({
        filename: 'beauty.css'
      })
    ]
  }
}
