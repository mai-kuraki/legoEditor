const path = require('path');
const Webpack = require('webpack');
const CleanWebpackPlugin=require('clean-webpack-plugin');
const HtmlWebpackPlugin=require('html-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/core/index.js'],
  output:{
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        use:{
            loader: 'babel-loader',
            options: {
              presets: [
                ['env',{
                    targets: {
                        browsers: ['> 1%', 'last 2 versions']
                    }
                }]
              ]
            }
        },
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loader: [ 'style-loader', 'css-loader?modules', 'sass-loader' ]
      },
      {
        test: /\.svg/, 
        loader: 'svg-url-loader'
      },
      {
        test: /\.js$/,
        use: {
          loader: 'eslint-loader',
          options: {
            
          }
        },
        enforce: 'pre',
        exclude: /node_modules/,
        include: [__dirname + '/src'],
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    host: 'localhost',
    port: 8090,
    open: false,
    hot: true
  },
  plugins: [
    new Webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './demo/index.html',
      filename: 'index.html',
      title: 'legoEditor',
      hash: true,
      minify: {
        collapseWhitespace: false,
        removeComments: false,
      }
    })
  ]  
}