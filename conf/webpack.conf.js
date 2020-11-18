'use strict'

const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserJSPlugin = require('terser-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

const exampleName = process.argv[process.argv.length - 1]

if (!['datetime', 'gender', 'product'].includes(exampleName)) {
  console.error('Not give example name, you can enter\n' +
    'npm run build/dev product\n' +
    'Example names: product, datetime, gender')
  return 5
}

module.exports = function (args, options) {
  const PROD_MODE = options.mode === 'production'
  return {
    entry: {
      'index': path.join(__dirname, '../example/' + exampleName)
    },
    output: {
      publicPath: './',
      filename: 'index.js',
      path: path.join(__dirname, '../example/' + exampleName + '/dist')
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        'example': path.resolve(__dirname, '../example'),
        'product': path.resolve(__dirname, '../example/product'),
        'datetime': path.resolve(__dirname, '../example/datetime'),
        'gender': path.resolve(__dirname, '../example/gender')
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
            path.join(__dirname, '../example')
          ],
          exclude: /node_modules/
        },
        {
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader'
          ]
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
          include: path.join(__dirname, '../example'),
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
        filename: 'style.css'
      })
    ]
  }
}
