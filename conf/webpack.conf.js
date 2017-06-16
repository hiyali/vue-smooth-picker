var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require('extract-text-webpack-plugin')

var exampleMode = false
var exampleName = 'product'
if (process.argv.indexOf('--example') > -1) {
  exampleMode = true
  if (process.argv[8]) {
    exampleName = process.argv[8]
  } else {
    console.error('Not give example name, you can enter\n' +
                 'npm run example product\n' +
                 'Example names: product, datetime, gender')
    return 0
  }
}

module.exports = {
  entry: exampleMode ? { 'index': './example/' + exampleName } : { 'smooth-picker': './src' },
  output: Object.assign({
    publicPath: '',
    filename: '[name].js'
  }, exampleMode ? {
    path: './example/' + exampleName + '/dist'
  } : {
    path: './dist',
    library: 'SmoothPicker',
    libraryTarget: 'umd'
  }),
  resolve: {
    extensions: ['', '.js', '.vue'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
      'src': path.resolve(__dirname, '../src'),
      'smooth-picker': path.resolve(__dirname, '../src'),
      'example': path.resolve(__dirname, '../example')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: [
          path.join(__dirname, '../src'),
          path.join(__dirname, '../example')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: [
          path.join(__dirname, '../src'),
          path.join(__dirname, '../example')
        ],
        exclude: /node_modules|\.min\.js$/
      }
    ],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        include: [
          path.join(__dirname, '../src'),
          path.join(__dirname, '../example')
        ],
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 2 * 1024,
          name: 'dist/img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: 'dist/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  eslint: {
    formatter: require('eslint-friendly-formatter')
  },
  stylus: {
    use: [
      require('poststylus')([ 'autoprefixer', 'rucksack-css' ])
    ]
  },
  vue: {
    loaders: {
      css: ExtractTextPlugin.extract("css"),
      stylus: ExtractTextPlugin.extract('css!stylus')
    },
    postcss: [
      require('autoprefixer')({
        browsers: ['last 8 versions']
      })
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      beautify: false,
      compress: {
        warnings      : false,
        sequences     : true,  // join consecutive statemets with the “comma operator”
        properties    : true,  // optimize property access: a["foo"] → a.foo
        dead_code     : true,  // discard unreachable code
        drop_debugger : !exampleMode,  // discard “debugger” statements
        drop_console  : !exampleMode,  // discard “console” statements
        unsafe        : true, // some unsafe optimizations (see below)
        conditionals  : true,  // optimize if-s and conditional expressions
        comparisons   : true,  // optimize comparisons
        evaluate      : true,  // evaluate constant expressions
        booleans      : true,  // optimize boolean expressions
        loops         : true,  // optimize loops
        unused        : true,  // drop unused variables/functions
        hoist_funs    : true,  // hoist function declarations
        hoist_vars    : true, // hoist variable declarations
        if_return     : true,  // optimize if-s followed by return/continue
        join_vars     : true,  // join var declarations
        cascade       : true,  // try to cascade `right` into `left` in sequences
        side_effects  : true,  // drop side-effect-free statements
        global_defs   : {},
        keep_fnames: true
      },
      output: {
        comments: exampleMode
      }
    }),
    new ExtractTextPlugin(exampleMode ? 'style.css' : 'css/style.css')
  ]
}
