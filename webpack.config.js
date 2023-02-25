const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// This is the main configuration object.
// Here, you write different options and tell Webpack what to do
module.exports = {

  // Path to your entry point. From this file Webpack will begin its work
  entry: './src/index.js',

  // Path and filename of your result bundle.
  // Webpack will bundle all JavaScript into this file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    clean: true,
  },
  // output: {
  //   path: path.resolve(__dirname, 'dist'),
  //   filename: '[name][contenthash].js',

  //   assetModuleFilename: '[name][ext]',
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },

  plugins: [

    new MiniCssExtractPlugin({
      filename: 'bundle.css',
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),

      // inject  :  true ,
    }),

  ],

  // Default mode for Webpack is production.
  // Depending on mode Webpack will apply different things
  // on the final bundle. For now, we don't need production's JavaScript
  // minifying and other things, so let's set mode to development
  mode: 'development',
  // mode: 'production'
};
