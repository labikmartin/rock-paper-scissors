const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const scriptsPath = './src/app'
const stylesPath = './src/scss'

module.exports = [{
  entry: {
    'js/main.js': `${scriptsPath}/main.js`,
    //- ### CSS
    'css/main.css': `${stylesPath}/main.scss`,
  },
  devtool: "#inline-source-map",
  output: {
     path: __dirname + '/public',
     filename: '[name]',
     sourceMapFilename: '[name].map',
  },
  module: {
    rules: [
      //- ### HTML
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].html'
            }
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true
            }
          }
        ]
      },
      //- ### JAVASCRIPT
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env'],
            retainLines: true
          }
        }
      },
      //- ### SCSS
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: [{
            loader: 'style-loader',
            options: {
              url: false,
            }
          }],
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
                url: false
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  return [
                    require('precss'),
                    require('autoprefixer')
                  ];
                }
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        })
      }
    ]
  },
  watchOptions: {
    aggregateTimeout: 1000,
  },
  plugins: [
    //- ### EXTRACT COMPILED SCSS TEXT FROM JAVASCRIPT TO FILE
    new ExtractTextPlugin('[name]'),
    //- ### SPLIT COMMON JS
    new webpack.optimize.CommonsChunkPlugin({
       names: ['js/main.js'],
       minChunks: Infinity
     }),
    //- ### SERVER
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: ['./public/'] },
      injectChanges: true,
    })
  ]
}];
