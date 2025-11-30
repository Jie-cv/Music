const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', "postcss-loader"],
        generator: {
          filename: 'static/css/[name][ext]'
        }
      },
      {
        test: /\.mp3$/i,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 100 * 1024
          }
        },
        generator: {
          filename: 'static/mp3/[name][ext]'
        }
      },
      {
        test: /\.js$/,
        use: ['babel-loader']
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/main.css'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/index.html')
    }),
    new CssMinimizerPlugin()
  ],
  performance: {
    hints: false, // 关闭所有性能提示
    // 或者只提高阈值：
    // maxAssetSize: 5 * 1024 * 1024, // 5MB
    // maxEntrypointSize: 5 * 1024 * 1024,
  },
  devServer: {
    port: 3382,
    host: '127.0.0.1',
    open: true,
  },
  mode: 'production',
}