var path = require('path');
var fs = require("fs");

var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: [
  	path.resolve(__dirname, 'site', 'site.js'),
  ],

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.[hash].js"
  },

  module: {
  	rules: [{
  		test: /\.css$/,
  		use: ['style-loader', 'css-loader']
  	}, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', {
        loader: 'sass-loader',
        options: {
          includePaths: [path.resolve(__dirname, 'node_modules')]
        }
      }]
    }, {
      // Unlikely-to-change assets included from within HTML:
      // for simplicity preserve filename & don’t use hash
      include: /(facebook.svg|line.svg)/,
      use: [{
        loader: 'file-loader',
        options: {name: '[name].[ext]'}
      }, 'svgo-loader']
    }, {
  		test: /symbol-03.svg/,
  		use: ['url-loader?limit=10000', 'svgo-loader']
  	}, {
  		test: /\.(jpe?g|png|gif)$/i,
  		use: ['url-loader?limit=10000', 'img-loader']
  	}]
  },
  resolve: {
    modules: [path.resolve(__dirname, 'site'), 'node_modules']
  },
  plugins: [
    new HtmlWebpackPlugin({
    	template: path.resolve(__dirname, 'site', 'index.html')
    }),
  ]
};
