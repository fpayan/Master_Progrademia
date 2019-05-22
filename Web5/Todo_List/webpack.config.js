const path = require('path');
const webpack = require('webpack');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');


const IS_DEV = process.env.NODE_ENV === 'dev';

module.exports = {
  mode:  'development',
  entry: './src/app.js',
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '', // relative to HTML page (same directory)
  },
  //devtool: 'inline-source-map',
  resolve: {
    // options for resolving module requests
    // (does not apply to resolving to loaders)
    modules: [
      "node_modules",
      path.resolve(__dirname, "src")
    ],
    // directories where to look for modules
    extensions: [".js", ".json", ".jsx", ".css", ".scss", ".html"],
    mainFiles: ['index'],
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // Adds CSS to the DOM by injecting a `<style>` tag
            loader: 'style-loader', options: {
              sourceMap: false
            }
          },
          {
            // Interprets `@import` and `url()` like `import/require()` and will resolve them
            loader: 'css-loader', options: {
              sourceMap: false
            }
          },
          {
            // Loader for webpack to process CSS with PostCSS
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('autoprefixer')
                ];
              },
              sourceMap: false
            }
          },
          {
            // Loads a SASS/SCSS file and compiles it to CSS
            loader: 'sass-loader', options: {
              sourceMap: false
            }
          },
          
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              attrs: [':data-src'],
              minimize: true,
            },
          },
        ],
      },
    ]
  },
  // devServer: {
  //   contentBase: path.join(__dirname, 'dist'),
  //   port: 8080,
  //   hot: true,
  // },
  watch: true,
  watchOptions: {
    ignored: /node_modules/
  },
  //
  plugins: [
    new CleanWebpackPlugin(),
    new BrowserSyncPlugin({
      // browse to http://localhost:8080/ during development,
      // ./dist directory is being served
      host: 'localhost',
      port: 8080,
      server: { baseDir: ['./dist'], directory: false },
      files: ['./src/*.html', './src/*.js', './src/scss/*.scss', './dist/*.js'],
      watch: true,
    }),
    // jQuery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      tether: 'tether',
      Tether: 'tether',
      'window.Tether': 'tether',
      Popper: ['popper.js', 'default'],
      Alert: 'exports-loader?Alert!bootstrap/js/dist/alert',
      Button: 'exports-loader?Button!bootstrap/js/dist/button',
      Carousel: 'exports-loader?Carousel!bootstrap/js/dist/carousel',
      Collapse: 'exports-loader?Collapse!bootstrap/js/dist/collapse',
      Dropdown: 'exports-loader?Dropdown!bootstrap/js/dist/dropdown',
      Modal: 'exports-loader?Modal!bootstrap/js/dist/modal',
      Popover: 'exports-loader?Popover!bootstrap/js/dist/popover',
      Scrollspy: 'exports-loader?Scrollspy!bootstrap/js/dist/scrollspy',
      Tab: 'exports-loader?Tab!bootstrap/js/dist/tab',
      Tooltip: 'exports-loader?Tooltip!bootstrap/js/dist/tooltip',
      Util: 'exports-loader?Util!bootstrap/js/dist/util',
    }),
    new CopyWebpackPlugin([
      {
        from: './src/index.html',
        to: path.resolve(__dirname, 'dist'),
      },
    ]),
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
      favicon: path.resolve(__dirname, 'src/images/icon.ico'),
      filename: 'index.html',
      hash: true,
      inject: false,
      minify: !IS_DEV && {
        collapseWhitespace: true,
        preserveLineBreaks: true,
        removeComments: true,
      },
    }),
    //
  ],
  // End plugins
};
