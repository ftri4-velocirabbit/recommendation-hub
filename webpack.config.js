const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: {
    index: ["babel-polyfill", "./client/index.js"],
  },
  output: {
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(__dirname, 'build'),
  },
  mode: process.env.NODE_ENV || "production",
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './client/assets/index.html',
      //favicon: "./client/assets/icons/favicon.png"
    }),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
          }
        }
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              // Options to lower image quality for faster network exchanges
              //webp: { 
              //  quality: 30,
              //}
              name: 'images/[hash].[ext]',
            },
          },
        ],
      },
    ]
  },
  devServer: {
    publicPath: '/',
    proxy: {
      '/login': { target: 'http://localhost:3000' },
      '/logout': { target: 'http://localhost:3000' },
      '/api': { target: 'http://localhost:3000' },
    },
    hot: true,
  },
};
